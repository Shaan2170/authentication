const express = require('express');

const app = express();
app.use(express.json());

const users = [];  

function generateToken(){
    return Math.random()
}

app.post("/signup", function (req,res){
      
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password

    })
    res.json({
        message: "Youe are signed n"
    })
})

app.post("/signin", function (req,res){

    const username = req.body.username;
    const password = req.body.password;
    
    const user = users.find(function(u){
        if (u.username === username) {
            return true;
        } else {
            return false;
        }
    })
})

function findCondition(user){

}

app.listen(3000);