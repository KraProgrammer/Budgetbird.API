const docs = require('simple-rest-docs');
 
const options = {
  files: ['./app.js', './routes/journey.js', './routes/user.js', './routes/transaction.js', './routes/root.js',  './controllers/journey.js', './controllers/user.js', './controllers/transaction.js', './controllers/root.js'], // glob pattern 
  output: './README.md' //default './DOCUMENT.md' 
  // parsers: [] 
}
 
docs(options);