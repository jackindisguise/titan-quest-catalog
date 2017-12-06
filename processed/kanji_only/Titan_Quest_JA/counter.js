var file = null;

// parse arguments
if(process.argv.length > 2){
	file = process.argv[2];
}

if(!file){
	console.log("Syntax: counter <file>");
	return;
}

// file name with no extension
var _extPos = file.lastIndexOf(".");
var fName = _extPos == -1 ? file : file.slice(0,_extPos);

var characters = [];
function getCharacter(c){
	for(var obj of characters){
		if(obj.character == c) return obj;
	}
}

// count unique characters
var fs = require("fs");
var data = fs.readFileSync(file, "utf8");
for(var i=0;i<data.length;i++){
	var c = data[i];
	var character = getCharacter(c);
	if(!character){
		character = {character:c, count:0};
		characters.push(character);
	}

	character.count++;
}

// get plain text string for order of appearance
var ooa = "";
characters.forEach(function(value,index){
	ooa += value.character;
});

// sort by count
characters.sort(function(a,b){
	if(b.count > a.count) return 1;
	if(a.count > b.count) return -1;
	return 0;
});

// get character, count table
var count = ""
characters.forEach(function(value,index){
	count += value.character + "\t" + value.count + "\r\n";
});

fs.writeFileSync(fName+".count.txt",count);
fs.writeFileSync(fName+".ooa.txt",ooa);