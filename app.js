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

		res.redirect("/login?e=Incorrect search" ) }	


		console.log(findpers[0])
		res.render("found", {findpers:findpers[0]})

	})
})

app.post("/login", (req, res)=> {
	let suggest = req.body.query
	console.log(suggest)
		fs.readFile('users.json', function(err,data){
		if (err) {
			console.log(error)
		}  

		var users = JSON.parse(data)
		var seeker = []
		for (i = 0; i < users.length; ++i) {
	    	if (users[i].firstname.slice(0, suggest.length) == suggest || users[i].lastname.slice(0, suggest.length) == suggest || users[i].email.slice(0, suggest.length) == suggest) {
	        	seeker.push(users[i].firstname + " " + users[i].lastname)
	        	console.log(seeker)
	       	 }
		}
		res.json({status:200, finder: seeker})
	})

})

//slice
//alexandre.slice(0,3)
// "alexandra".slice(0,suggestion.length)

/*
		var findpers= []
		
		for (var i = 0; i < users.length; i++){
   			if (suggest == users[i].firstnamex || suggest == users[i].lastname){
			findpers.push(users[i].firstname)
			console.log(findpers)*/
	/*		} 	
		}
	}*/


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
	console.log("listening to port 3k")
});

//koppel button aan app, koppel  button aan jquiry, 