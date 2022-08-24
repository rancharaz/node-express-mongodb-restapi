const express = require('express');
const app = express();

//initiate router for the model schema
const studentExpressRoute = express.Router();
let StudentSchema = require('../model/student.model')

//initiate route for testing errors
studentExpressRoute.route('/').get((req, res) => {
    StudentSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

/* http://localhost:8080/api/ getting all students */

//endpoint for searching into id
studentExpressRoute.route('/student/:id').get((req,res)=> {
    StudentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//adding student 
studentExpressRoute.route('/add-student').post((req, res, next) => {
    StudentSchema.create(req.body, (error, data) => { //create function - req.body for data
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})


module.exports = studentExpressRoute;