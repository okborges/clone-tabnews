const { exec } = require("node:child_process");

function checkPostgres() {
  exec("wsl docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(erroer, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\n\n 🟢 Postgres está pronto para aceitar conexões!");
  }
}

process.stdout.write("\n\n 🔴 Aguardando Postgres aceitar conexões...");
checkPostgres();
