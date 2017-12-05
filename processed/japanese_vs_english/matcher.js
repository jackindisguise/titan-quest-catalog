var fs = require("fs");
var target = "skills_ja2en.txt";
var en = fs.readFileSync("skills_en.txt", "utf8");
var ja = fs.readFileSync("skills_ja.txt", "utf8");

var enSplit = en.split("\r\n");
var jaSplit = ja.split("\r\n");

var enStrings = [];
var jaStrings = [];

// get en strings
for(var string of enSplit){
	var rule = /(.*?)=(.+)/g
	var result = rule.exec(string);
	if(!result) continue;
	var name = result[1];
	var value = result[2];
	enStrings[name] = value;
}

// get ja strings
for(var string of jaSplit){
	var rule = /(.*?)=(.+)/
	var result = rule.exec(string);
	if(!result) continue;
	var name = result[1];
	var value = result[2];
	jaStrings[name] = value;
}

// get japanese>english comparisons
fs.writeFileSync(target, "");
for(var name in jaStrings){
	var english = enStrings[name];
	var japanese = jaStrings[name];
	fs.appendFileSync(target, japanese + "\t" + english + "\r\n");
}
