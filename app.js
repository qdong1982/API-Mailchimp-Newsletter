//jshint esversion:6

const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
let data = {
  members: [
    {email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};

let jsonData = JSON.stringify(data);

const options = {
  url: 'https://us20.api.mailchimp.com/3.0/lists/941c982119',
  method: "POST",

//This is basic authorization
  headers:{
    "Authorization": "quang 78849142b55f3ce955d8de75d0a5e60d-us20"
    //Any string plus your API key. This is for every API
  },

  body: jsonData
};

request(options, function(error, response, body){
  if (error){
    res.sendFile(__dirname+ "/failure.html");

  } else {
    if (response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  }
});

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT ||3000, function() {
  console.log("Server is running on port 3000");
});

//API key
 // 78849142b55f3ce955d8de75d0a5e60d-us20

// list id
// 941c982119
