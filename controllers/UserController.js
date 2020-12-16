const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models =require('../models');

exports.signin = async(req,res,next) => {
    try {
        //verificando que el usuario exista en la base de datos
        const user = await models.user.findOne({where: {email: req.body.email}});
        if(user){
            const password = bcrypt.compareSync(req.body.password , user.password);
            if(password){
                const token = jwt.sign({
                    id: user.id,
                    name: user.username,
                    email: user.email,

                },'config.secret',{
                    expiresIn: 86400
                });
                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: user
                })
            }else{
                res.status(401).json({
                    error: 'Error en el usuario o contraseña'
                })
            }
        }else{
            res.status(404).json({
                error: 'Error en el usuario o contraseña'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

// Lógica de registro
exports.register = async(req,res,next) => {
    try {
        const prueba = await User.User.findOne({where: {email: req.body.email}});
        if (isNull(prueba)){
            console.log('no está');
            req.body.password = bcrypt.hashSync(req.body.password,8);
            const user = await User.User.create(req.body);
            res.status(200).json(user);
        }else {
            console.log(prueba);
            res.status(444).json({
                error: 'Error, el correo ya se encuentra registrado'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
}
