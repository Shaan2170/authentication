const express = require('express');
const jwt = require('jsonwebtoken');
const { use } = require('react');
const JWT_SECRET = "random"
const app = express();
app.use(express.json());

const users = [];  


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
     
    let foundUser = null;

    for (let i = 0; i<users.length; i++){
        if (users[i].username === username && users[i].password == password) {

            foundUser = users[i]

        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username
        },  JWT_SECRET);


        foundUser.token = token;

        res.json({
            token: token
        }) 
    } else{
            res.status(403).send({
                message : "Invalid username or password"
            
        })
    }

})

app.get("/me", function(req,res){
    const token = req.headers.token //jwt
    const decodedInformation = jwt.verify(token, JWT_SECRET);
    const username = decodedInformation.username


    const foundUser = null;

    for (let i =0; i<users.length;i++){
        if(users[i].username == username) {
            foundUser = users[i]
        }
    }

    if (foundUser){
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    }else {
        res.json ({
            message: "token invalid"
        })
    }
})

app.listen(3000);