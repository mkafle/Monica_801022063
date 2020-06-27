const connection = require('../database/connection');
module.exports = class post{
    _insert = (title,description)=>{
        return connection.execute('INSERT INTO posts(post_title,post_description) VALUES(?,?)',[title,description]);
    }
    fetchAllPost_ = (admin)=>{
        if (admin) {
            return connection.execute('SELECT * FROM posts');   
        }else{
            return connection.execute('SELECT * FROM posts WHERE status = ?',['enabled']); 
        }
    }
    deletePost_ = (id)=>{
        return connection.execute('DELETE FROM posts WHERE post_id = ?',[id]);
    }
    fetchpostById_ = (id)=>{
        return connection.execute('SELECT * FROM posts WHERE post_id = ?',[id]);
    }
    updatePost_ = (id,title,description)=>{
        return connection.execute('UPDATE posts SET post_title = ? , post_description = ? WHERE post_id = ?',[title,description,id]);
    }
    statusChange_ = (id,status)=>{
        return connection.execute('UPDATE posts SET status = ? WHERE post_id = ?',[status,id]);
    }
}