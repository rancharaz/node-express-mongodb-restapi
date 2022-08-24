//importing dependencies for db connection
 
let express = require('express');
const createError = require('http-errors');

path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyParser = require('body-parser');
dbConfig = require('./db/database')

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
}, 
    error => {
        console.log(`Database could not be connected ${error}`)
    }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//adding cors 
app.use(cors());

const userRoute = require('./routes/student.routes');

app.use('/api', userRoute);

//opening port 8080
const port = process.env.PORT || 8080;
//response
const server = app.listen(port, () => {
    console.log(`Port is connected to: ${port}`)
})
 //catching errors //testing
app.use((req, res, next) => {
    next(createError(404))
});

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.use(function(err, req, res, next){
    if(!err.statusCode) err.statusCode == 500;
    res.status(err.statusCode).send(err.message)
})
