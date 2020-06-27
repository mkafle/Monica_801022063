const connection = require('../database/connection');
module.exports = class user{
    checkDuplicate = (username)=>{
        return connection.execute('SELECT * FROM users WHERE username = ?',[username]);
    }
    signup = (username,password)=>{
        return connection.execute('INSERT INTO users(username,password) VALUES(?,?)',[username,password]);
    }
    fetchAllUsers = ()=>{
        return connection.execute('SELECT * FROM users');
    }
    deleteUser = (id)=>{
        return connection.execute('DELETE FROM users WHERE user_id = ?',[id]);
    }
    fetchUserById_ = (id)=>{
        return connection.execute('SELECT * FROM users WHERE user_id = ?',[id]);
    }
    updateUser_ = (id,username,password)=>{
        return connection.execute('UPDATE users SET username = ? , password = ? WHERE user_id = ?',[username,password,id]);
    }
    statusChange_ = (id,status)=>{
        return connection.execute('UPDATE users SET status = ? WHERE user_id = ?',[status,id]);
    }
    login_ = (username,password)=>{
        return connection.execute('SELECT * FROM users WHERE username = ? ',[username]);
    }
}