import { mkdir as Mkdir, writeFile as WriteFile} from "fs"
import { promisify} from "util"

const _mkdir= promisify( Mkdir)

export function existsOk( err){
	if( err.code=== "EEXIST"){
		return
	}
	throw err
}

export async function mkdir( dir){
	return _mkdir( dir)
	  .catch( existsOk)
}

export const writeFile= promisify( WriteFile)
