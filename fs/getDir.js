import mkdir from "./mkdir"
import readdir from "./readdir"

/**
* Return the list of files in a directory, creating the directory if needed
*/
export async function getDir( dir){
	return mkdir( dir).catch(function( err){
		if( err.code=== "EEXIST"){
			return readdir( dir)
		}
		throw err
	})
}
export default getDir
