import bcrypt from "bcrypt";
const saltRounds = 10;

const securePassword = async (
  password: string
): Promise<string | undefined> => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean | undefined> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};

export { securePassword, comparePassword };
