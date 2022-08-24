//intiate express into app const variable
const express = require('express');
const app = express();

//initiate router for the model schema
const studentExpressRoute = express.Router();
let StudentSchema = require('../model/student.model')

//initiate route for testing errors
studentExpressRoute.route('/').get((req, res) => {
    StudentSchema.find((error, data) => {
        //catching errors in case it is not working
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
    StudentSchema.findById(req.params.id, (error, data) => { //function find by id
        //catching errors in case cannot get by id
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
        //catching errors in case cannot add student
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//endpoint for delete into id
studentExpressRoute.route('/delete-student/:id').delete((req,res)=> {
    StudentSchema.findByIdAndDelete(req.params.id, (error, data) => { //function find by id and delete
        //catching errors in case cannot delete student by id
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg:data
            })
        }
    })
})

//

//update endpoint via id
studentExpressRoute.route('/update-student/:id').put((req,res)=> {
    StudentSchema.findByIdAndUpdate(req.params.id,{$set: req.body}, (error, data) => { //function find by id and update
        //catching errors in case cannot update by id
        if (error) {
            return next(error)
        } else {
            //previous data showed
            res.json(data);
            console.log('Updated successfully')
        }
    })
})
module.exports = studentExpressRoute;