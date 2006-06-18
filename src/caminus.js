import { mkdir,writeFile } from "fs"
import util from "util"

export defaultOpts= {
	encoding: "utf8",
	dirMode: 0750,
	fileMode: 0640
} 

/**
 * @name caminus
 * @description export json objects to the filesystem
 * @param o object to write to fs
 * @param dir root directory path for fs
 * @param callback callback(err,ok)
 * @author <a href="http://voodoowarez.com/rektide">rektide</a> &lt;<a href="mailto:rektide@voodoowarez.com">rektide@voodoowarez.com</a>&gt;
 */
export async function serialize( o, baseDir, opts){
	opts= opts|| defaultOpts
	
		}).call(this,o[i],dir+"/"+i)
	
	for(var i in o) {
		++this.ref;
		(function(obj,path){
			var self = this
			console.log("entering",util.inspect(arguments))
			if(typeof obj == "object") {
				// make directory
				fs.mkdir(path,this.dirMode,function(err) {
					console.log("path-o "+path,util.inspect(arguments))
					if(err && err['errno'] != 17) return self.throwError("error creating directory "+path,err)
					if(self.errs.length) return
					// write object
					self.dumpObject(obj,path)
					self.ref--
				})
			}
			else {
				// prepare value entry
				fs.open(path,'w',this.mode,function(err,fd){
					if(err) return self.open("error openning file "+path,err)
					if(self.errs.length) return
					// write value
					var buf = new Buffer(obj.toString(), encoding=self.encoding)
					console.log("path-d",path,buf.toString(),util.inspect(arguments))
					fs.write(fd,buf,0,buf.length,null,function(err,written) {
						console.log("path-w",path,util.inspect(arguments))
						if(err) self.throwException("error writing file "+path,err)
						if(isNaN(written) || written < buf.length) return self.throwException("write of unexpected size: "+written+" instead of "+buf.length)
						self.ref--
					})
				})
			}
		}).call(this,o[i],dir+"/"+i)
	}
}
caminus.prototype.throwError = function(msg,err) {
	--this.refDecl
	var l = this.errs.push(err)
	if(l == 1)
		this.callback(msg+": "+err)
}
caminus.prototype.refDecl = function() {
	if(!--this.ref)
		this.callback(null,true)
}
