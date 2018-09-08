import { sep } from "path"
import Deferrant from "deferrant/deferrant.js"

let defaults

function drop( key){
	this[ key]= undefined
}

export async function deserialize( path, val, opts){
	if( val&& opts=== undefined){
		opts= val
		val= undefined
	}
	if( !opts){
		if( !defaults){
			// bit of a race if multiple callers get here but they
			// ought all resolve the same module
			defaults= (await import( "./deserialize/defaults")).default
		}
		opts= defaults()
	}

	// flyweight context passed through to all helpers
	const stat= await opts.stat( path)
	// handle primitives
	if( opts.isPrimitive( stat)){
		return opts.readPrimitive( path)
	}

	// find contents of directory
	const files= await opts.readdir( path)

	// resolve each piece of content
	path= path+ sep
	function deserializer( filename, i){
		if( filename=== "@type"){
			typeIndex= i
		}
		if( dirtyKeys){
			dirtyKeys.delete( keys[ i])
		}
		const current= hadVal? val[ keys[ i]]: undefined
		return opts.deserialize( path+ filename, current, opts)
	}
	let typeIndex
	const
	  // map each filename to the key it'll have
	  keys= files.map( opts.resolveName),

	  hadVal= val!== undefined,
	  hadKeys= hadVal&& opts.cleanup&& Object.keys( val),
	  // as we iterate we're going to remote keys we see, leaving only dangling keys we need to clean-up
	  dirtyKeys= hadKeys&& hadKeys.length&& new Set(...hadKeys),

	  // deserialize each entry
	  _values= files.map( deserializer),
	  // wait for each entry's deserialization
	  values= await Promise.all( _values),

	  // marshal val into the right state start, now that we know @type
	  type= typeIndex!== undefined&& values[ typeIndex],
	  isArray= type&& type.trim()=== "@collection"
	if( !hadVal){
		if( isArray){
			val= []
		}else{
			val= {}
		}
	}else{
		const haveArray= opts.arrayCheck( val)
		if( isArray){
			if( !haveArray){
				throw new Error("Expected `val` array")
			}
		}else{
			if( haveArray){
				throw new Error("Expected `val` object")
			}
		}
	}

	// remove
	if( dirtyKeys){
		// these keys remain from the original `val`, but weren't seen during deser & thus need to be cleaned off
		dirtyKeys.forEach( drop, val)
	}

	// read values
	for( let i= 0; i< keys.length; ++i){
		const key= keys[ i]
		val[ key]= values[ i]
	}

	// good good
	return val
}
export default deserialize
