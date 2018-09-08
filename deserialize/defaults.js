import deserialize from "../deserialize.js"
import stat from "../fs/stat.js"
import readdir from "../fs/readdir.js"

import isPrimitive from "./isPrimitive.js"
import readPrimitive from "./readPrimitive.js"
import resolveName from "./resolveName.js"
import clean from "./clean.js"

/**
 * Sealed copy of the default flyweight object
 */
export const defaults= Object.freeze({
  cleanup: true,
  stat,
  isPrimitive,
  readPrimitive,
  readdir,
  arrayCheck: o=> o&& o.length!== undefined,
  resolveName,
  clean,
  deserialize,
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
