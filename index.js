
var http = require("http");
//TODO - Use Employee Module here
const employees = require("./Employee");

console.log("Lab 03 - NodeJs");

//Define Server Port
const port = process.env.PORT || 8081;

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
            return;
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employees));
            return;
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            let names = employees.map(e => `${e.firstName} ${e.lastName}`);
            names.sort();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(names));
            return;
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            let totalSalary = employees.reduce((sum, e) => sum + e.Salary, 0);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ total_salary: totalSalary }));
            return;
        }

        // Default: 404
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
