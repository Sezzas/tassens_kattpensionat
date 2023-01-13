var express = require('express');
var router = express.Router();
const app = express();
var cors = require('cors');

// CORS
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

const bodyParser = require('body-parser');
router.use(
    bodyParser.urlencoded({
        extended: true
    })
)
router.use(bodyParser.json());

// Mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cats', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log("Connected to db");

    // Cat schema
    var catSchema = mongoose.Schema({
        name: String,
        gender: String,
        age: Number,
        breed: String,
        startdate: String,
        enddate: String,
        phonenumber: Number

    });

    // Create model
    var Cat = mongoose.model('Cat', catSchema )

    /*******************************
    * GET - All cats
    ********************************/
    router.get('/', (req, res, next) => {

        // Find all cats
        Cat.find(function(err, cats){
            if(err) return console.error(err);
            var jsonObj = JSON.stringify(cats);
            res.contentType('application/json');
            res.send(jsonObj);
        }); 
    });


    /*******************************
    * GET - Specific cat
    ********************************/
    router.get('/:id', (req, res, next) => {

        // Variable for id
        var id = req.params.id;

        // Find specific cat
        Cat.findById(id, function(err, cat) {
            if(err) return handleError(err);
            var jsonObj = JSON.stringify(cat);
            res.contentType('application/json');
            res.send(jsonObj);
        });


    })

    


    /*******************************
    * POST - Add cat
    ********************************/
    router.post('/', (req, res, next) => {

        // New cat info
        var newCat = new Cat({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            breed: req.body.breed,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            phonenumber: req.body.phonenumber
        });

        // Save new cat
        newCat.save(function(err) {
            if(err) return console.error(err);
        });

        // Response data
        var jsonObj = JSON.stringify(newCat);
        res.contentType("application/json");
        res.send(jsonObj);
    })
    
    


    /*******************************
    * PUT - Update cat
    ********************************/
    router.put('/:id', (req, res, next) => {

        // Variable for id
        var id = req.params.id;

        // Updated info
        var updatedCat = {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            breed: req.body.breed,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            phonenumber: req.body.phonenumber
        }

        // Find specific cat and update
        Cat.findByIdAndUpdate(id, updatedCat,
            function (err, docs) {
                if(err) {
                    return console.error(err);
                } else {
                    res.json({ message: "Cat updated!" });
                }
            })

    })
   
    


    /*******************************
    * DELETE
    ********************************/
    router.delete('/:id', (req, res, next) => {
        
        // Variable for id
        var id = req.params.id;

        // Delete cat from db
        Cat.deleteOne({ "_id": id }, function (err) {
            if(err) return handleError(err);
        });

        // Response data
        Cat.find(function(err, cats) {
            if(err) return console.error(err);
        
            var jsonObj = JSON.stringify(cats);
            res.contentType('application/json');
            res.send(jsonObj);
        });

    })
}); // Db connection


module.exports = router;