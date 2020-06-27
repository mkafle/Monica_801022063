const userModel = require('../models/userModel');
const userOBJ = new userModel();

const postModel = require('../models/postModel');
const postOBJ = new postModel()

exports.loadIndexPage = (req, res, next) => {
    postOBJ.fetchAllPost_(false).then(([data, chunk]) => {
        return res.render('index', {
            data: data,
            session: req.session.status == 'active' ? true : false
        });
    }).catch((err) => {
        console.log(err);
    });
}
exports.loadPostPage = (req, res, next) => {
   if (req.query.id) {
        postOBJ.fetchpostById_(req.query.id).then(([data, chunk]) => {
            res.render('post', {
                data: data[0],
                error:  '',
                session: req.session.status == 'active' ? true : false
            });
        }).catch((err) => {
            console.log(err);
        });
   }else{
    res.render('post', {
        data: '',
        error:  'post_id is missing',
        session: req.session.status == 'active' ? true : false
    });
   }
}
exports.loadLoginPage = (req, res, next) => {
    return res.render('login', {
        session: req.session.status == 'active' ? true : false
    });
}
exports.loadsignupPage = (req, res, next) => {
    return res.render('add_user', {
        old_val: '',
        error: '',
        session: req.session.status == 'active' ? true : false
    });
}



exports.signup = (req, res, next) => {
    userOBJ.checkDuplicate(req.body.username).then(([data, chunk]) => {
        if (data.length == 0) {
            userOBJ.signup(req.body.username, req.body.password).then(([data, chunk]) => {
                if (data.serverStatus == 2) {
                    return res.redirect('/index');
                }
            })
        } else {
            return res.render('add_user', {
                old_val: req.body.username,
                error: 'username already exist',
                session: req.session.status == 'active' ? true : false
            })
        }
    }).catch((err) => {
        console.log(err);
    });
}





exports.loadAllUserPage = (req, res, next) => {
    userOBJ.fetchAllUsers().then(([data, chunk]) => {
        return res.render('list_user', {
            data: data,
            session: req.session.status == 'active' ? true : false
        });
    }).catch((err) => {
        console.log(err);
    });
}

exports.deleteUser = (req, res, next) => {
    userOBJ.deleteUser(req.query.id).then(([data, chunk]) => {
        if (data.serverStatus == 2) {
            return res.json({
                status: true,
                session: req.session.status == 'active' ? true : false
            });
        }
    }).catch((err) => {
        console.log(err);
    });
}

exports.edituser = (req, res, next) => {
    userOBJ.fetchUserById_(req.query.id).then(([data, chunk]) => {
        res.render('update_user', {
            data: data[0],
            session: req.session.status == 'active' ? true : false
        });
    }).catch((err) => {
        console.log(err);
    });
}
exports.updateUser = (req, res, next) => {
    userOBJ.updateUser_(req.body.id, req.body.username, req.body.password).then(([data, chunk]) => {
        if (data.serverStatus == 2) {
            return res.redirect('/list_user');
        }
    }).catch((err) => {
        console.log(err);
    });
}

exports.user_statusChange = (req, res, next) => {
    userOBJ.statusChange_(req.query.id, req.query.status).then(([data, chunk]) => {
        if (data.serverStatus == 2) {
            return res.json({
                status: true,
                session: req.session.status == 'active' ? true : false
            });
        }
    }).catch((err) => {
        console.log(err);
    });
}

exports.loadLoginPage = (req, res, next) => {
    return res.render('login', {
        oldval: '',
        error: '',
        session: req.session.status == 'active' ? true : false
    });
}

exports.login = (req, res, next) => {
    userOBJ.login_(req.body.username, req.body.password).then(([data, chunk]) => {
        if (data.length > 0) {
            if (data[0].status == 'enabled') {
                req.session.status = 'active'
                req.session.id = data[0].user_id;
                req.session.username = data[0].username;
                return res.redirect('/list_post');
            } else {
                return res.render('login', {
                    oldval: req.body.username,
                    error: 'Your account is temporary Blocked',
                    session: req.session.status == 'active' ? true : false
                })
            }
        } else {
            return res.render('login', {
                oldval: req.body.username,
                error: 'Incorrect email and passsword',
                session: req.session.status == 'active' ? true : false
            })
        }
    }).catch((err) => {
        console.log(err);

    });
}
exports.logout = (req, res, next) => {
    req.session.destroy(function (err) {
        console.log(err);
        return res.redirect('/index');
    })
}


exports.unknownPage = (req, res, next) => {
    return res.status(404).render('404', {
        session: req.session.status == 'active' ? true : false
    });
}