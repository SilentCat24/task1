const express = require('express');
import { Request, Response } from 'express';
var mysql = require("mysql");
const Pool = require('pg').Pool
const app = express();
const port = 8000;

const responseData = [
  "supportId" = 1234,
  "supportLink" = "https://localhost:3000/",
  "supportName" = "testName",
  "supportMetadata"={
    "supportId": 1234,
    "supportName": "testMetadata",
    "supportLink": "https://example.com/support"
  }
]

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '12345',
  port: 5433,
})

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to postgreSQL");
});
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Vishu@018",
//   database: "test",
// });

// con.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to mySQL");
// });

app.get('/', (req, res) => {
  res.send('Hello, World!....');
});

  app.get('/getSupportdetails' , (req,res)=>{
    const query = `
    SELECT
    sd.supportId,
    sd.supportLink,
    sd.supportName,
    JSON_OBJECT(
      'supportId', sd.supportId,
      'supportName', sd.supportName,
      'supportLink', sd.supportLink
    ) AS supportMetadata
  FROM
    support_details sd
  WHERE
    sd.supportId = 1234;
  `;  
  pool.query(query,(err,results)=>{
      if (err)   
        throw err;
        else{
          res.status(200).json({
            results 
          })
        }                  
  })
  }); 
// app.post('/getSupportDetails',(req,res)=>{
//   let 
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});