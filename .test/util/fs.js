import { sep} from "path"
import readdir from "../../fs/readdir.js"
import readFile from "../../fs/readFile.js"

export async function readFiles( dir){
	return readdir( dir).then( function(files){
		async function readInto( file){
			o[ file]= await readFile( dir+ sep+ file, "utf8")
		}
		const
		  o= {},
		  reads= files.map( readInto)
		return Promise.all( reads).then(()=> o)
	})
}
