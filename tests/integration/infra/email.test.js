import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

describe("infra/email", () => {
  test("sed()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "contato@curso.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });
    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "contato@curso.dev",
      subject: "Último email enviado",
      text: "Corpo último email",
    });

    const lastEmail = await orchestrator.getLestEmail();
  });
});
