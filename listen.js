const app = require('./app.js');
const { port } = process.env;

app.listen(port, () => console.log(`Listening on ${port}...`));