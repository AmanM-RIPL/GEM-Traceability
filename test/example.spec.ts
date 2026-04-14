import { test, expect } from "@playwright/test";

test.describe("POST /api/user", () => {
  test("should send login email when provided with a valid email", async ({ request }) => {
    const email = `playwright-${Date.now()}@example.com`;

    const response = await request.post("/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email }),
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      success: true,
    });
    expect(body.message).toContain("User created successfully");
    expect(body.data).toBeDefined();
  });

  test("should return 400 when email is missing", async ({ request }) => {
    const response = await request.post("/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({}),
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toMatchObject({
      success: false,
      message: "Email is required",
    });
  });
});
