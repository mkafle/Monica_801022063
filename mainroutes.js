const express = require('express');
const { check } = require('express-validator/check');
const routes = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

const validationMiddleware = require('../middleware/validationMiddleware')
const sessionMiddleware = require('../middleware/auth')

// ---------------------------------------------------------------------
routes.get('/',userController.loadIndexPage);
// ---------------------------------------------------------------------
routes.get('/index',userController.loadIndexPage);
// ---------------------------------------------------------------------
routes.get('/post',userController.loadPostPage);
// ---------------------------------------------------------------------
routes.get('/addpost', sessionMiddleware.sessionFalse ,postController.loadAddPostPage);
// ---------------------------------------------------------------------
routes.post(
    '/addpost',
    [
        check('title').notEmpty(),
        check('post_content').notEmpty()
    ],
    sessionMiddleware.sessionFalse,
    validationMiddleware.errorCollector,
    postController.addpost);
// ---------------------------------------------------------------------
routes.get('/list_post', sessionMiddleware.sessionFalse ,postController.loadPostListPage);
// ---------------------------------------------------------------------
routes.get('/delPost' , sessionMiddleware.sessionFalse ,postController.deletePost);
// ---------------------------------------------------------------------
routes.get('/editpost' , sessionMiddleware.sessionFalse ,postController.editPost);
// ---------------------------------------------------------------------
routes.post('/updatePost', sessionMiddleware.sessionFalse ,postController.updatePost);
// ---------------------------------------------------------------------
routes.get('/statusChange' , sessionMiddleware.sessionFalse ,postController.statusChange);
// ---------------------------------------------------------------------
routes.get('/login', sessionMiddleware.sessionTrue ,userController.loadLoginPage);
// ---------------------------------------------------------------------
routes.post('/login', sessionMiddleware.sessionTrue ,userController.login);
// ---------------------------------------------------------------------
routes.get('/logout',userController.logout);
// ---------------------------------------------------------------------
routes.get('/signup', sessionMiddleware.sessionTrue ,userController.loadsignupPage);
// ---------------------------------------------------------------------
routes.post('/signup' , sessionMiddleware.sessionTrue ,userController.signup);
// ---------------------------------------------------------------------
routes.get('/list_user', sessionMiddleware.sessionFalse ,userController.loadAllUserPage);
// ---------------------------------------------------------------------
routes.get('/deluser', sessionMiddleware.sessionFalse ,userController.deleteUser);
// ---------------------------------------------------------------------
routes.get('/edituser', sessionMiddleware.sessionFalse ,userController.edituser);
// ---------------------------------------------------------------------
routes.post('/updateUser', sessionMiddleware.sessionFalse ,userController.updateUser);
// ---------------------------------------------------------------------
routes.get('/user_statusChange', sessionMiddleware.sessionFalse ,userController.user_statusChange);
// ---------------------------------------------------------------------
routes.use('/',userController.unknownPage);











exports.route = routes;