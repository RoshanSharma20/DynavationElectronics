const bcrypt = require('bcrypt');

module.exports.hashPassword = async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
    }
};


module.exports.comparePassword = async function comparePassword(password, hashedPassword) {
    try {
        return bcrypt.compare(password, hashedPassword);
    }
    catch (err) {
        console.log(err);
    }
}