const express = require('express')
const app = express()
const os = require('os')
const client = require('./database')
const {exec} = require("child_process");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')

// import routes
const AuthRoute = require('./auth/authentication');

app.use(express.json());

// CRUD operations

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        if (username==="admin"&& password ==="admin"){
          res.json({success: true, message: 'admin' })
        }else{
        const validateUser = client.query("SELECT username, password FROM users WHERE username = $1 AND password = $2", [username, password]);
        if ((await validateUser).rows.length > 0) {
            res.send({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }}
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });


app.post('/signup', async (req, res) => {
  try {
      const {username, mail, password} = req.body;
      client.query("INSERT INTO users (username, password, email) VALUES($1, $2, $3)", [username, password, mail]);
  } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Admin Account show
app.get('/admin', (req, res) =>{
  const query = client.query("SELECT * FROM users");
  query.then(result => {
    res.json(result.rows);
  }).catch(error => {
    console.error(error);
    res.status(500).json(['Error executing query']);
  });
});

// update account
app.post('/update', async (req,res)=>{
  try {
    const {username, mail, password, n_user, n_mail, n_pass} = req.body;
    const validateUser = await client.query("UPDATE users SET username=$1, password=$2, email=$3 WHERE username=$4 AND email=$5 AND password=$6" 
    , [n_user, n_mail, n_pass, username, mail, password]);
    if(validateUser.rowCount > 0){
      res.json({ success: true, message: 'Modification successful' });
    }else{
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error modifying info:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

// delete user
app.post('/delete', async (req, res)=>{
  try {
    const {username} = req.body;
    client.query("DELETE FROM users WHERE username = $1", [username])
  } catch (error) {
    console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})





// APIs
app.get('/', (req, res)=>{
    res.send("Welcome to the User API")
  })
  
app.get("/cpu", (req, res)=>{

    const numberCpus = os.availableParallelism()
  
    const cpuUsage = os.cpus();
  
    const totalNonIdleTime = cpuUsage.reduce((total, core) => {
        return total + core.times.user + core.times.nice + core.times.sys;
    }, 0);
  
    const totalCpuTime = cpuUsage.reduce((total, core) => {
        return total + core.times.user + core.times.nice + core.times.sys + core.times.idle;
    }, 0);
  
    const usedCpu = ((totalNonIdleTime / totalCpuTime) * 100).toFixed(2);
  
  
    
    const totalCpu = (totalCpuTime).toFixed(2) //GHz
  
    res.json({"numberCpu": numberCpus, "totCpus": totalCpu, "cpuUsage": usedCpu})
  });

app.get("/ram", (req, res)=>{
const totalRam = (os.totalmem()/1073741824).toFixed(2) //Gb
const useRam = ((os.totalmem() - os.freemem())/1073741824).toFixed(2) //Gb

res.json({"totalRam": totalRam, "useRam": useRam})
});

// HDD API
app.get('/disk', (req, res) => {
    exec('wmic logicaldisk get size,freespace', (error, stdout)=>{
      const disk = stdout
      const diskInfo = disk.trim().split('\n')[1].split('  ')
      const free = ((diskInfo[1]-diskInfo[0])/(1024*1024*1024)).toFixed(2);
      const tot = (diskInfo[1]/(1024*1024*1024)).toFixed(2);
      res.json({"use": free, "tot": tot})
    })
  })

// File API
app.post("/readFile", (req, res)=>{
  const file = req.body.fileName;
  const paths = "C:/Users/agubb/Desktop/IA/"
  const filepath = paths+file+'.txt';
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.json("file not found")
    } else {
      res.send(data)
  }})
});

// Directory API
app.post("/readDir", (req, res)=>{
  const dir = req.body.dirName;
  let text = []
  console.log(dir)
  fs.readdir(dir, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.json(["directory not found"])
    } else {
      console.log(data);
      for (let i in data) {
        if (path.extname(data[i])) {
            text.push(
                'file : ' + data[i] 
            );
        } else {
            text.push(
                'folder : '+ data[i] 
            )
        }
    }
    res.json(text);
  }})
});




const port = 5000;
app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});