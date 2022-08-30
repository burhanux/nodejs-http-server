const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const server = http.createServer((req, res)=>{
	console.log(req.url, req.method);
	// Set Header Content Type
	res.setHeader("Content-Type", "text/html");
	// Choose Correct File
	let page = "index.html";
	switch(req.url){
		case "/": 
			page = "index.html";
			res.statusCode = 200;
			break;
		case "/about": 
			page = "about.html";
			res.statusCode = 200;
			break;
		case "/about-me": 
			res.statusCode = 301; // Redirect Status Code
			res.setHeader("Location", "/about"); // Redirect
			res.end();
			break;
		default: 
			page = "404.html";
			res.statusCode = 404;
			break;
	}
	// Send The Correct HTML File 
	fs.readFile(path.join(__dirname,"views", page), (err, data)=>{
		if(err)console.log(err);
		else res.write(data);
		res.end();
	})
})

server.listen(PORT, "localhost", ()=> console.log(`Listening to port ${PORT} on a Node JS server.`))