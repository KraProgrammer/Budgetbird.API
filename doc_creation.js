const docs = require('simple-rest-docs');
 
const options = {
  files: ['./app.js', 'routes/journey.js', 'routes/user.js', 'routes/transaction.js'], // glob pattern 
  output: './README.md', //default './DOCUMENT.md' 
  // parsers: [] 
}
 
docs(options);