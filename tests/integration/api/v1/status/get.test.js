import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET to /api/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);
      const respondeBody = await response.json();

      const parcedUpdateAt = new Date(respondeBody.updated_at).toISOString();

      expect(respondeBody.updated_at).toBe(parcedUpdateAt);
      expect(respondeBody.dependencies.database.version).toEqual("16.0");
      expect(respondeBody.dependencies.database.max_connections).toEqual(100);
      expect(respondeBody.dependencies.database.open_connections).toEqual(1);
    });
  });
});
