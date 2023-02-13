const express  = require('express');
const initDB = require('./config/database');
const viewEngineSetup = require('./config/viewEngine');
const routes = require('./config/routes');
const { PORT } = require('./config/constants');
//TO DO: import authMiddleware

const app = express();
viewEngineSetup(app);

app.use(express.static('src/static'));
app.use(express.urlencoded({
    extended: false
}));
//TO DO: use authMiddleware
app.use(routes);

initDB()
    .then(() => app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}...`)))
    .catch((err) => console.log(err));