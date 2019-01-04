const DataBase = require('../dataBase/index').getInstance();
const tokenVerificator = require('../helpers/tokenVerificator');

module.exports = async (req, res) => {

    try {
        let User = DataBase.getModel('User');

        const token = req.get('Authorization');

        console.log(token);

        const {email} = await tokenVerificator(token, 'superSecret');

        let isRegistered = await User.findOne({
            where: {
                email
            }
        });

        if (!isRegistered) throw new Error('U are not registered')

        const users = await User.findAll({});

        res.render('users', {users: users})

    } catch (e) {
        console.log(e)
    }
}