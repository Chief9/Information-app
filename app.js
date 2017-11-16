var express = require("express")
var app = express()
var fs = require('fs')
const bodyParser = require ("body-parser")
app.use (bodyParser.urlencoded({extended:true}))

app.set ('view engine','pug')

app.get("/", function(req,res){
	fs.readFile('users.json', function(err,data){
		if (err) {
			throw err
		} else { 
		var users = JSON.parse(data)
	res.render("index", {users:users})
	}})	
})

app.post("/searchbar", function(req,res){
	fs.readFile('users.json', function(err,data){
		if (err) {
			console.log(error)
		}  

		var users = JSON.parse(data)
		var name = req.body.name
		var findpers= []
		
		for (var i = 0; i < users.length; i++){
   			if (req.body.name == users[i].firstname || req.body.name == users[i].lastname || req.body.name == users[i].email){
			findpers.push(users[i])
			} 			
		} 
		if (findpers.length == 0){
		res.redirect("/login?e=Incorrect username or password" ) }	

		console.log(findpers[0])
		res.render("found", {findpers:findpers[0]})

	})
})

app.post("/form", function(req,res){
fs.readFile('users.json', function(err, data){
    if (err){
        throw (err);
    } else {
    var users = JSON.parse(data);
    users.push({	"firstname": req.body.InsFirstName,
				"lastname": req.body.InsLastName,
				"email": req.body.InsEmail,
})

    

    json = JSON.stringify(users); 
    res.redirect("/") 
    fs.writeFile('users.json', json, 'utf8', function(err){
    if(err) throw err;
});
}});

})




// door json lezen, element vinden van first of lastname, posten op page (render)

app.get("/login", (req,res) => {
	res.render	("login")
})

app.get("/form", (req,res) => {
	res.render	("form")
})

  
app.get("/nav", (req,res) => {
	res.render ("nav")
})

app.listen(3000, () =>{
	console.log("listening")
});

//write file