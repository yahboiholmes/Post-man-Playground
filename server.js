/* const express = require('express')
let list = require('./data/list_data')
const app = express()

const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))   



app.get('/api',(req,res, next)=>{
    res.status(200).json({ list:list });
    next()

})

app.post('/api/post', (req,res, next)=>{
    const newData = req.body;
    list.push(newData)
    res.status(200).json({list : newData})
    next()
})

app.get('/api',(req,res)=>{
  res.status(200).json({ newData:list });
    return
}) 

app.delete('/api/home/:id', (req,res)=> {
    const { id } = req.params
    const deleted = list.find(list => list.id === id)
    if (deleted) {
        console.log(deleted);
        list = list.filter(list => list.id  != id)
        res.status(200).json(list)
    }else{
        console.log(deleted);
        res.status(200).json({message: "chanel you are looking is out of order"})
    }
})


app.listen(port)
 */


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 6969;

// Middleware
app.use(bodyParser.json());
app.use(express.json())

// Dummy data
let data = [
  {
    id: '1',
    task: 'Do something',
    taskdate: 'Tuesday'
  },
  {
    id: '2',
    task: 'Do something else',
    taskdate: 'Wednesday'
  },
  {
    id: '3',
    task: 'Do something else fishy',
    taskdate: 'Thursday'
  }
];

app.get('/', (req,res)=>{
    res.send({message: 'burat'})
})
// GET request to retrieve all data
app.get('/data', (req, res) => {
 /* let formattedData = JSON.stringify(data,null, 3) */
  res.status(200)
    res.setHeader('Content-Type', 'text/plain')
    res.send(JSON.stringify(data, null, 3))
  return;
});

// POST request to add new data
app.post('/data', (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).json({ message: 'Data added successfully', newData });
});

// DELETE request to remove data by id
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  const originalLength = data.length;
  data = data.filter(item => item.id !== id);
  if (data.length < originalLength) {
    res.status(200).json({ message: `Data with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Data with id ${id} not found` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
