import { sep } from "path"
import Deferrant from "deferrant/deferrant.js"

let defaults

export async function deserialize( path, val, opts){
	//console.log("running", {path,val})
	if( val&& !opts){
		opts= val
		val= null
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
		return opts.deserialize( path+ filename, undefined, opts)
	}
	let typeIndex
	const
	  keys= files.map( opts.resolveName),
	  _values= files.map( deserializer),
	  values= await Promise.all( _values)

	// marshal val into the right state start, now that we know @type
	const
	  type= typeIndex!== undefined&& _values[ typeIndex],
	  isArray= type=== "@collection"
	if( val=== undefined){
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

	// read values
	for( let i= 0; i< keys.length; ++i){
		const key= keys[ i]
		val[ key]= values[ i]
	}

	// good good
	return val
}
export default deserialize
