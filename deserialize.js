import { sep } from "path"

export async function deserialize( path, val, options){
	if( !opts){
		const defaultModule= await import( "./deserialize/defaults")
	}

	// flyweight context passed through to all helpers
	const deserialization= { path, val, options}

	// handle primitives
	deserialization.stat= opts.stat({ path})
	if( opts.isPrimitive( deserialiation)){
		return opts.readPrimitive( deserialization)
	}

	// get top contents
	const readdir= opts.readdir( deserialization)

	// check for array-ness/other types
	const typeIndex= readdir.indexOf("@type")
	if( typeIndex!== -1){
		deserialiation.type= readdir( typeIndex)
		if( deserialization.type=== "xsd:array" && !opts.arrayCheck( val)){
			val= opts.makeArray()
		}
	}
	if( !val){
		val= {}
	}


	if( !path.endsWith( sep)){
		path= path+ sep
	}

	const
	  deserializer= async filename=> {
		const
		  entry= opts.resolveName( filename),
		  childPath= path+ entry,
		  child= await opts.deserialize( childPath, null, opts))
		val[ entry]= child
	  },
	  deserialized= readdir.map( deserializer)

	return val
}

export default deserialize
