const fs = require('fs');
 
 async function rfile()
 {
 	const response = await fs.readFile('a.txt', {encoding: 'utf-8'}, (err,data) => err ? return err : return data);
 	return response;
 }


var result = rfile();
console.log(result);