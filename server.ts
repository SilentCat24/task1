const express = require('express');
// const mysql = require('mysql');

const app = express();
const port = 8000;

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Vishu@018',
//   database: 'test',
// });

// con.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to mySQL');
// });

/**
 * @typedef {Object} SupportDetails
 * @property {number} supportId
 * @property {string} supportLink
 * @property {string} supportName
 * @property {Object} supportMetadata
 * @property {number} supportMetadata.supportId
 * @property {string} supportMetadata.supportName
 * @property {string} supportMetadata.supportLink
 */

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/getSupportdetails', (req, res) => {
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

  // con.query(query, (err, results) => {
  //   if (err) {
  //     throw err;
  //   } else {
  //     /**
  //      * @type {SupportDetails[]}
  //      */
  //     const formattedResults = results;

  //     res.status(200).json({
  //       results: formattedResults,
  //     });
  //   }
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
