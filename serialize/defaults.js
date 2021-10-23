import getDir from "../fs/getDir.js"
import rimraf from "../fs/rimraf.js"
import writeFile from "../fs/writeFile.js"
import serialize from "../serialize.js"

import recordType from "./recordType.js"

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
export function defaultsFactory( props){
	return { ...defaults, ...props}
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
