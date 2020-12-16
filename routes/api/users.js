const router = require('express').Router();
const models = require('../../models');
const UserController = require('../../controllers/UserController.js');
const bcrypt = require('bcryptjs');

router.get('/', async(req,res)=>{
    const user = await models.user.findAll();
    res.status(200).json(user);
});


router.post('/register',async(req, res)=>{
     req.body.password = bcrypt.hashSync(req.body.password,8);
     const user = await models.user.create(req.body);
     res.status(200).json(user);
});

// router.get('/',UserController.listar);
router.post('/signin',UserController.signin);
router.post('/register', UserController.register);
// contraseña: [{"key":"password","value":"123asd456ñlk","description":"","type":"text","enabled":true}]

module.exports = router
