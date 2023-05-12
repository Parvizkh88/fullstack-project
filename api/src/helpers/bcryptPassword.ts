const bcrypt = require("bcrypt");
const saltRounds = 10;

const securePassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};
// const comparePassword = async (plainPassword, hashedPassword) => {
//   try {
//     return await bcrypt.compare(plainPassword, hashedPassword);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { securePassword, comparePassword };
export { securePassword };
