import getDir from "../fs/getDir"
import rimraf from "../fs/rimraf"
import writeFile from "../fs/writeFile"
import serialize from "../serialize"

import recordType from "./recordType"

/**
 * Sealed copy of the default flyweight object
 */
export const defaults= Object.freeze({
  writeOptions: {
  	encoding: "utf8",
  	mode: 0o640
  },
  dirMode: 0o750,
  getDir,
  writePrimitive: writeFile,
  recordType,
  rmdir: rimraf,
  serialize // used recursively by serialize
})
export function defaultsFactory(){
	return { ...defaults}
}

let currentDefaults= defaultsFactory()
let changeDefaultsHandler
export function setChangeDefaultsHandler( handler){
	changeDefaultsHandler= handler
}
export function getChangeDefaultsHandler(){
	return changeDefaultsHandler
}
export function setCurrentDefaults( newDefaults){
	const oldDefaults= currentDefaults
	currentDefaults= newDefaults
	if( changeDefaultsHandler){
		changeDefaultsHandler( newDefaults, oldDefaults)
	}
}
export function currentFactory(){
	if( currentDefaults instanceof Function){
		return currentDefaults()
	}else{
		return { ...currentDefaults}
	}
}
export default currentFactory
