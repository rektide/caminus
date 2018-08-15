import { sep } from "path"

export async function deserialize( path, val, options){
	if( !opts){
		const defaultModule= await import( "./deserialize/defaults")
	}


	// flyweight context passed through to all helpers
	const stat= opts.stat({ path})

	// handle primitives
	if( opts.isPrimitive({ stat})){
		return opts.readPrimitive( deserialization)
	}

	// get top contents
	const readdir= opts.readdir( deserialization)
	// i would write to opts here but it gets passed everywhere & would get stomped

	// check for array-ness/other types
	const typeIndex= readdir.indexOf("@type")
	if( typeIndex!== -1){
		deserialiation.type= readdir( typeIndex)
		if( deserialization.type=== "@collection" && !opts.arrayCheck( val)){ // todo jsonld
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
		  child= await opts.deserialize( childPath, null, opts)
		val[ entry]= child
	  },
	  deserialized= readdir.map( deserializer)

	return val
}

export default deserialize
