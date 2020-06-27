const postModel = require('../models/postModel');
const postOBJ = new postModel()

exports.loadAddPostPage = (req, res, next) => {
    return res.render('add_posts', {
        session: req.session.status == 'active' ? true : false
    });
}
exports.addpost = (req, res, next) => {
    postOBJ._insert(req.body.title, req.body.post_content).then(([data, chunk]) => {
        if (data.insertId > 0) {
            return res.json({
                status: true,
                session: req.session.status == 'active' ? true : false
            })
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.loadPostListPage = (req, res, next) => {
    postOBJ.fetchAllPost_(true).then(([data, chunk]) => {
        return res.render('list_post', {
            data: data,
            session: req.session.status == 'active' ? true : false
        });
    }).catch((err) => {
        console.log(err);
    });
}
exports.deletePost = (req, res, next) => {
    postOBJ.deletePost_(req.query.id).then(([data, chunk]) => {
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
exports.editPost = (req, res, next) => {
    postOBJ.fetchpostById_(req.query.id).then(([data, chunk]) => {
        res.render('update_post', {
            data: data[0],
            session: req.session.status == 'active' ? true : false
        });
    }).catch((err) => {
        console.log(err);
    });
}
exports.updatePost = (req, res, next) => {
    postOBJ.updatePost_(req.body.id, req.body.title, req.body.post_content).then(([data, chunk]) => {
        if (data.serverStatus == 2) {
            return res.redirect('/list_post');
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.statusChange = (req, res, next) => {
    postOBJ.statusChange_(req.query.id, req.query.status).then(([data, chunk]) => {
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