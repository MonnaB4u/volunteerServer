const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors= require('cors')
require('dotenv').config()



const uri =`mongodb+srv://${process.env.DB_User}:${process.env.DB_pass}@cluster0.dyvn0.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app=express()

app.use(bodyParser.json());
app.use(cors());

const port=5000;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  console.log(err)
  
  const userCollection= client.db("vulenteerStore").collection("user");
  const userRegister=client.db("vulenteerStore").collection("user");

  console.log("Connected");

  app.post('/addCollection',(req, res) => {
      const users=req.body;
      console.log(users) 
      userCollection.insertOne(users)
      .then(result => {
          res.send(result)    
 })

  })

  app.get('/events',(req, res) => {
      userCollection.find({})
      .toArray((err, document)=>{
          res.send(document)
      })
  })
////////new register 
  app.post('/userRegister',(req, res) => {
    const user=req.body;
    console.log(users) 
    userRegister.insertOne(user)
    .then(result => {
        res.send(result.insertedCount > 0)    
})

})


  
});



app.listen(process.env.PORT || port)