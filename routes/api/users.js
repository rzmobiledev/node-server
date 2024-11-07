const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.route('/')
    .get(userController.getAllUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), userController.createUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), userController.updateUser)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), userController.deleteUser);

router.route('/:id')
    .get(userController.getUser); 


module.exports = router;