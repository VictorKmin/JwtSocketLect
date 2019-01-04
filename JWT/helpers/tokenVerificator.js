const jwt = require('jsonwebtoken');
module.exports = async (token, secretWorld) => {
    let unixNow = Math.floor(Date.now() / 1000);
    let user = null;

    if (!token || !secretWorld) throw new Error('Have not token or secret word');

    jwt.verify(token, secretWorld, (err, decoded) => {
        console.log(err);
        if (err) throw new Error('You have bad auth.');
        if (decoded.exp <= unixNow) throw new Error('TOKEN EXPIRED');
        user = {
            email: decoded.email,
            name: decoded.name
        }
    });
    console.log(user);

    return user
};