const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const db = require('./models/connection');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./swagger-config');
const cors = require('cors');
const app = express()
const port = 4000

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use('/',router);

db.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
    return db.sync();
})
.then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
.catch(err => {
  console.error('Unable to connect to the database.');
});