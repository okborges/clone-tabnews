test("Get to /api/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const respondeBody = await response.json();

  const parcedUpdateAt = new Date(respondeBody.update_at).toISOString();

  expect(respondeBody.update_at).toBe(parcedUpdateAt);
  expect(respondeBody.dependencies.database.version).toEqual("16.0");
  expect(respondeBody.dependencies.database.max_connections).toEqual(100);
  expect(respondeBody.dependencies.database.open_connections).toEqual(1);
});
