const DataBase = require('../dataBase/index').getInstance();
const tokinazer = require('../helpers/tokinazer');

module.exports = async (req, res) => {

    try {

        const User = DataBase.getModel('User');

        const users = await User.findAll({});

        console.log(users);

        console.log(req.body);
        let {name, password, email} = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) throw new Error('User is registered');

        const {accessToken, refreshToken} = tokinazer(email, name);

        console.log(accessToken);
        console.log(refreshToken);

        await User.create({
            id: 3,
            name,
            password,
            email,
            access_token: accessToken,
            refresh_token: refreshToken
        });

        res.redirect('/')

    } catch (e) {
        console.log(e)
    }

};