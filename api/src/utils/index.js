
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

const verifyPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}

module.exports = {
    hashPassword,
    verifyPassword,
}
