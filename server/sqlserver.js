//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();




const config = {
    user: 'INFO445',
    password: 'RedSquar3',
    server: 'is-hay04.ischool.uw.edu',
    database: 'sparkdog',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}


// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up Express server
let server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});




function sqlQuery(res, query) {
    var conn = new sql.ConnectionPool(config);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        request.query(query).then(function (result) {
            res.send(result.recordset);
            conn.close();
        }).catch(function (err) {
            res.send(err);
            conn.close();
        });
    }).catch(function (err) {
        res.send(err);
        // conn.close();
    });
}





//GET API
app.get("/customer/", function (req, res) {
    var query = "select top(5) * from tblCustomer";
    sqlQuery(res, query);
})

//GET API
app.get("/customer/:query", function (req, res) {
    var query = "select top(10) * from tblCustomer where Email like '%" + req.params.query + "%'";
    sqlQuery(res, query);
})

//PUT API
app.put("/customer/:id", function (req, res) {
    var query = "UPDATE tblCustomer SET" + 
        " CustomerFName = '" + req.body.FirstName + "'," + 
        " CustomerLName = '" + req.body.LastName + "'," + 
        " Email = '" + req.body.Email + "'," + 
        " PhoneNumber = '" + req.body.Phone + "'" +
        " WHERE CustomerID = " + req.params.id;

    sqlQuery(res, query);
})


//POST API
app.post("/customer/", function (req, res) {
    var query = "INSERT INTO tblCustomer (CustomerFName, CustomerLName, Email, PhoneNumber) " + 
        " VALUES ('" + 
        req.body.FirstName + "', '" + 
        req.body.LastName + "', '" + 
        req.body.Email + "', '" + 
        req.body.Phone + "')";
    
    sqlQuery(res, query);
})





//GET API
app.get("/api/employee", function (req, res) {
    var query = "SELECT top(10) * from tblEmployee";
    executeQuery(res, query);
});

//POST API
app.post("/api/employee", function (req, res) {
    var query = "INSERT INTO tblEmployee (EmployeeFName, EmployeeLName) VALUES ('" + req.body.FirstName + ", " + req.body.LastName + "')";
    executeQuery(res, query);
});

//PUT API
app.put("/api/user/:id", function (req, res) {
    var query = "UPDATE tblEmployee SET EmployeeFName= " + req.body.FirstName + " , EmployeeLName=  " + req.body.LastName + "  WHERE EmployeeID= " + req.params.id;
    executeQuery(res, query);
});

// DELETE API
app.delete("/api/user/:id", function (req, res) {
    var query = "DELETE FROM tblEmployee WHERE EmployeeID=" + req.params.id;
    executeQuery(res, query);
});