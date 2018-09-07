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

	// get top contents
	const files= await opts.readdir( path)

	// create our value
	const
	  type= files.indexOf("@type"),
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

	path= path+ sep
	async function deserializer( file){
		const
		  entry= opts.resolveName( file),
		  childPath= path+ entry,
		  child= await opts.deserialize( childPath, undefined, opts)
		val[ entry]= child
	}
	const deserialized= files.map( deserializer)
	await Promise.all( deserialized)

	return val
}
export default deserialize
