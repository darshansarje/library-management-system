import request from "supertest";
import type { Express } from "express";

process.env.NODE_ENV = "test";
process.env.DATABASE_FILE = ":memory:";

let app: Express;
let initialized = false;

beforeAll(async () => {
  const database = await import("../config/database");
  const module = await import("../app");

  await database.initializeDatabase();
  app = module.default;
  initialized = true;
});

afterAll(async () => {
  if (!initialized) {
    return;
  }

  const database = await import("../config/database");
  const db = await database.getDatabase();
  await db.close();
});

describe("Library API routes", () => {
  it("returns a list of available books", async () => {
    const response = await request(app)
      .get("/api/books")
      .set("x-api-key", "library-secret-key");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty("title");
  });

  it("checks out a book and removes it from available books", async () => {
    const checkoutResponse = await request(app)
      .post("/api/checkout")
      .set("x-api-key", "library-secret-key")
      .send({ bookId: 1, borrowerName: "Alice" });

    expect(checkoutResponse.status).toBe(200);
    expect(checkoutResponse.body.data).toHaveProperty("checkedOutBy", "Alice");
    expect(checkoutResponse.body.message).toMatch(/checked out successfully/i);

    const availableResponse = await request(app)
      .get("/api/books")
      .set("x-api-key", "library-secret-key");

    expect(availableResponse.body.data.some((book: unknown) => (book as any).id === 1)).toBe(false);
  });

  it("returns a checked-out book and restores it to available books", async () => {
    const returnResponse = await request(app)
      .post("/api/return")
      .set("x-api-key", "library-secret-key")
      .send({ bookId: 1 });

    expect(returnResponse.status).toBe(200);
    expect(returnResponse.body.message).toMatch(/returned successfully/i);
    expect(returnResponse.body.data).toHaveProperty("isAvailable", true);

    const availableResponse = await request(app)
      .get("/api/books")
      .set("x-api-key", "library-secret-key");

    expect(availableResponse.body.data.some((book: unknown) => (book as any).id === 1)).toBe(true);
  });
});
