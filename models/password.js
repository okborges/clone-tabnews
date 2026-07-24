import bcrypt from "bcryptjs";

async function hash(password) {
  const rounds = process.env.NODE_ENV === "production" ? 14 : 1;
  return await bcrypt.hash(password, rounds);
}

async function compare(providedPassword, storedPassword) {
  return await bcrypt.compare(providedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
