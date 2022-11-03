import { compareSync, hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  const saltOrRounds = 10;
  const hashedPassword = hashSync(password, saltOrRounds);
  return hashedPassword;
};

export const compareDtoWithDbPassword = (
  dtoPassword: string,
  dbPassword: string
) => {
  return compareSync(dtoPassword, dbPassword);
};
