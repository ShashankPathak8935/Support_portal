const bcrypt = require("bcrypt");
const salt_rounds = 12;

// for password hash
exports.hashPasswordFn = async function(plainPassword) {
  if (!plainPassword) throw new Error("Password is required to hash");
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, salt_rounds);
    return hashedPassword;
  } catch (error) {
      console.error("Error hashing password", error);
      throw new Error("Hashing failed")
  }
}

exports.comparePasswordFn = async function(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) return false;
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error("Error compare password", error)
        throw new Error("Compare failed")
    }
}
