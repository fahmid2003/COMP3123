const express = require('express');

const SERVER_PORT = process.env.PORT || 3000;
// create an express app
const app = express();  

// serve static files from the "public" directory
// app.use(express.static('public'));
app.use('/static', express.static('public'));

// Middleware to parse JSON body
app.use(express.json());
// Middleware to parse URL-encoded body
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000/
app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.status(200).send('Hello World!');
})

// http://localhost:3000/index
// app.get("/index", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html");
// });

// http://localhost:3000/about
app.get('/about', (req, res) => {
    res.set('Content-Type', 'text/html');
    // res.type('text/html');
    res.status(200);
    res.send('<h1>About Page</h1><p>This is the about page</p>');
})

// http://localhost:3000/student
app.get('/student', (req, res) => {
    const stud = {
        method: "GET",
        name: 'John Doe',
        age: 25,
        major: 'Computer Science'
    }
    // res.set('Content-Type', 'application/json');
    res.type('application/json');
    // res.contentType('application/json');
    // res.send(stud)
    res.json(stud)
})

// http://localhost:3000/student
app.post('/student', (req, res) => {
    const stud = {
        method: "POST",
        name: 'John Doe',
        age: 25,
        major: 'Computer Science'
    }
    // res.set('Content-Type', 'application/json');
    res.type('application/json');
    // res.contentType('application/json');
    // res.send(stud)
    res.json(stud)
})

// http://localhost:3000/student
app.put('/student', (req, res) => {
    const stud = {
        method: "PUT",
        name: 'John Doe',
        age: 25,
        major: 'Computer Science'
    }
    // res.set('Content-Type', 'application/json');
    res.type('application/json');
    // res.contentType('application/json');
    // res.send(stud)
    res.json(stud)
})

// http://localhost:3000/student
app.delete('/student', (req, res) => {
    const stud = {
        method: "DELETE",
        name: 'John Doe',
        age: 25,
        major: 'Computer Science'
    }
    // res.set('Content-Type', 'application/json');
    res.type('application/json');
    // res.contentType('application/json');
    // res.send(stud)
    res.json(stud)
})

// Query Parameters
// http://localhost:3000/employee?name=John&age=25
app.get('/employee', (req, res) => {
    console.log(req.query);

    // Validate query parameters
    if(req.query.name === undefined || req.query.age === undefined) {
        res.status(400);
        return res.send({status: false, message: 'Bad Request: name and age are required'});
    }

    // const { name, age } = req.query;
    const name = req.query.name;
    const age = req.query.age;
    
    res.type('application/json');
    res.json({ status: true, data: { name: name, age: age }});
});

// Path or Route Parameters
// http://localhost:3000/employee/Pritesh/30/TOR
app.post('/employee/:name/:age/:city', (req, res) => {
    console.log(req.params);
    
    // Validate path parameters
    if(req.params.name === undefined || req.params.age === undefined || req.params.city === undefined) {
        res.status(400);
        return res.send({status: false, message: 'Bad Request: name, age and city are required'});
    }

    const { name, age, city } = req.params;
    res.type('application/json');
    res.json({ status: true, data: { name: name, age: age, city: city }});
});

// Body Parameters
// {
//     "name": "Pritesh",
//     "age": 30,
//     "city": "TOR"
// }
// Use Postman or Insomnia to test POST request with JSON body
// Content-Type: application/json

// http://localhost:3000/employee
app.post('/employee', (req, res) => {
    console.log(req.body);
    res.type('application/json');
    res.json({ status: true, data: req.body });

})

// app.listen(SERVER_PORT, () => {
//     console.log(`Server is running on port http://localhost:${SERVER_PORT}/`);
// })

// http://localhost:3000/introduction
app.post('/introduction', (req, res) => {
    console.log(req.body);
    res.type('application/json');
    res.json({ status: true, data: req.body });

})

// GET /hello
app.get("/hello", (req, res) => {
  res.type("text/plain").send("Hello Express JS");
});

// GET /user?firstname=&lastname=
app.get("/user", (req, res) => {
  const firstname = req.query.firstname || "Al Shahriar";
  const lastname = req.query.lastname || "Fahmid";
  res.json({ firstname, lastname });
});

// POST /user/:firstname/:lastname
app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// POST /users  (expects an array of { firstname, lastname })
app.post("/users", (req, res) => {
  const users = Array.isArray(req.body) ? req.body : [];
  res.json(users);
});

const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port http://localhost:${SERVER_PORT}/`);
    console.log(server.address());
})