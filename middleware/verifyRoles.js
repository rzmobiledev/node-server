const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try{
            if (!req?.roles) return res.sendStatus(401);
            const rolesArray = [...allowedRoles];
            const result = req.roles.map(role => rolesArray.includes(role))
            .find(val => val === true);
            if(!result) return res.sendStatus(401);
            next();
        }catch(err){
            return res.status(400).json(err);
        }
    }
}

module.exports = verifyRoles;