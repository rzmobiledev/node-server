const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the access token in memory

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // not content 
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
    
    // delete refresh token in db
    foundUser.refreshToken = "";
    const result = await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout };