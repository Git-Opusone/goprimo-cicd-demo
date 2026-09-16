const request = require("supertest");
const app = require("../src/app");

describe("GoPrimo CI/CD Demo App", () => {
  test("GET / should return app status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.app).toBe("GoPrimo CI/CD Demo");
    expect(response.body.status).toBe("running");
  });

  test("GET /health should return healthy", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  test("GET /api/orders should return sample orders", async () => {
    const response = await request(app).get("/api/orders");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.orders)).toBe(true);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });

  test("GET /metrics should return prometheus metrics", async () => {
    const response = await request(app).get("/metrics");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("goprimo_cicd_demo");
  });
});
