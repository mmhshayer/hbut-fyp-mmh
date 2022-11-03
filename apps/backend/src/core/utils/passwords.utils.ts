import { compareSync, hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  const saltOrRounds = 10;
  const hashedPassword = hashSync(password, saltOrRounds);
  return hashedPassword;
};

export const comparePassword = (loginPassword: string, dbPassword: string) => {
  return compareSync(dbPassword, loginPassword);
};
