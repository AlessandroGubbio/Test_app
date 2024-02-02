const express = require('express')
const app = express()
const client = require('./database')
const jwt = require('jsonwebtoken')

app.use(express.json());


app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
  
        const validateUser = client.query("SELECT username, password FROM users WHERE username = $1 AND password = $2", [username, password]);
        if ((await validateUser).rows.length > 0) {
            const token = jwt.sign(

            )
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.get('/', (req, res)=>{
    res.send("Welcome to the User API")
  })
  




const port = 5000;
app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});