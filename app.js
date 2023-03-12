// Task1: initiate app and run server at 3000
const express = require('express')
const BodyParser = require('body-parser')
const Mongoose = require('mongoose')
const Cors = require('cors')

const app = express()

app.use(Cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended : true}))

const path=require('path');
const { response } = require('express')
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


// Task2: create mongoDB connection 

const employeeSchema = new Mongoose.Schema(
    {
        name: String,
        location: String,
        position: String,
        salary: Number
    }
)

const employeeModel = Mongoose.model(
    "Employeelist", employeeSchema
)

Mongoose.connect("mongodb+srv://tintukjohn:abcd1234@cluster0.wtjng1f.mongodb.net/employee?retryWrites=true&w=majority", {useNewUrlParser: true})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        let data = await employeeModel.find()
        res.status(200).json(data) 
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
        let data = await employeeModel.findOne({_id: req.params.id})
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', (req, res) => {
    try {
        var data = new employeeModel(req.body)
        data.save()
        res.json({status:"Success"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        let data = await employeeModel.deleteOne({_id: req.params.id})
        res.json(data)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
        let data = await employeeModel.findOneAndUpdate({ "name": req.body.name }, req.body, { new: true })
        res.json(data) 
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () =>{
    console.log('Server Started!!!')
})



