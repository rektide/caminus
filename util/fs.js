import {
  mkdir as Mkdir,
  writeFile as WriteFile,
  readdir as Readdir} from "fs"
import Rimraf from "rimraf"
import { promisify} from "util"

export const
  mkdir= promisify( Mkdir),
  readdir= promisify( Readdir),
  rimraf= promisify( Rimraf)

export function existsOk( err){
	if( err.code=== "EEXIST"){
		return
	}
	throw err
}

/**
* Return the list of files in a directory, creating the directory if needed
*/
export async function getDir( dir){
	return mkdir(dir).catch(function( err){
		if( err.code=== "EEXIST"){
			return readdir( dir)
		}
		throw err
	})
}

export const writeFile= promisify( WriteFile)
