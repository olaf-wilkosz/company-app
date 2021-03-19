const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

mongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');
    const db = client.db('companyDB');

    db.collection('employees').find({ department: 'IT' }, (err, data) => {
      console.log('Find all employees from the IT Department - return iteration on Cursor:');
      if (!err) {
        data.each((error, employee) => {
          console.log(employee);
        })
      }
    });

    db.collection('employees').find({ department: 'IT' }).toArray((err, data) => {
      console.log('Find all employees from the IT Department - return the Array:');
      if (!err) {
        console.log(data)
      }
    });

    db.collection('employees').findOne({ department: 'IT' }, (err, data) => {
      console.log('Find all employees from the IT Department - return first matching element:');
      if (!err) {
        console.log(data)
      }
    });

    db.collection('departments').insertOne({ name: 'Management' }, err => {
      console.log('Add new item to the Departments collection:');
      if (err) console.log('err');
    });

    db.collection('departments').find({}, (err, data) => {
      console.log('Show all items in Departments collection to check previous operation:');
      if (!err) {
        data.each((error, employee) => {
          console.log(employee);
        })
      }
    });

    db.collection('employees').updateOne({ department: 'IT' }, { $set: { salary: 6000 }}, err => {
      console.log('Update salary of the first matching employee from the IT Department:')
      if(err) console.log(err);
    });

    db.collection('departments').deleteOne({ name: 'Management' }, (err) => {
      console.log('Remove the Management from the Departmens collection:');
      if(err) console.log(err);
    });

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    });

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });
  }
});