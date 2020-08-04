var walk = require('walk')
var path = require("path")

const getFileList=(p=".")=>new Promise((f1,f2)=>{
    let files = [],dirs = [];
	let walker  = walk.walk(p, { followLinks: false });
	walker.on('file', function(roots, stat, next) {
	    files.push(roots + '/' + stat.name);
	    next();
	});
	walker.on('directory', function(roots, stat, next) {
	    dirs.push(roots + '/' + stat.name);
	    next();
	});
	walker.on('end', function() {
        f1({files,dirs})
	});
})
const getFileLists=(ps=[])=>Promise.all(ps.map(getFileList))

module.exports={
    getFileList,
    getFileLists,
}




