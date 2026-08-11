import user from "models/user.js";
import password from "models/password.js";
import { NotFoundError, UnauthorizedError } from "infra/erros.js";

async function getAuthenticatedUser(providerEmail, providerPassword) {
  try {
    const storedUser = await findOneByEmail(providerEmail);
    await validatePassword(providerPassword, storedUser.password);

    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }
    throw error;
  }

  async function findOneByEmail(providerEmail) {
    let storedUser;
    try {
      storedUser = await user.findOneByEmail(providerEmail);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Senha não conferem.",
          action: "Verifique se os dados enviados estão corretos.",
        });
      }

      throw error;
    }
    return storedUser;
  }

  async function validatePassword(providerPassword, storePassword) {
    const correctPasswordMatch = await password.compare(
      providerPassword,
      storePassword,
    );

    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Senha não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }
  }
}

const autentication = {
  getAuthenticatedUser,
};

export default autentication;
