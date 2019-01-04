const jwt = require('jsonwebtoken');
const secretWorld = 'superSecret';
const refreshSecret = 'megaSecret';

module.exports = (email, name) => {
    const accessToken = jwt.sign({email: email}, secretWorld, {expiresIn: 99999999});
    const refreshToken = jwt.sign({email: email, name: name}, refreshSecret, {expiresIn: 999999999999});
    const tokens = {
        accessToken,
        refreshToken
    };
    if (!accessToken || !refreshToken) throw new Error('TOKEN WAS NOT CREATED');
    return tokens;
};
