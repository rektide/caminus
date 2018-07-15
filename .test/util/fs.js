import { sep} from "path"
import { readFile as ReadFile} from "fs"
import { readdir} from "../../util/fs"
import { promisify} from "util"

export const readFile= promisify( ReadFile)

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
