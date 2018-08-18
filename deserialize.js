import { sep } from "path"
import Deferrant from "deferrant"

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

	const ctx= ContextRunner(null, {
		stat: opts.stat,
		files: opts.files,
		readdir: opts.readdir,
		val: {},
		"@type": ctx=> {
			// check for array-ness/other types
			const typeIndex= ctx.readdir.indexOf( ".@type")
			if( typeIndex!== -1){
				deserialiation.type= readdir( typeIndex)
				if( deserialization.type=== "@collection" && !opts.arrayCheck( val)){ // todo jsonld
					val= opts.makeArray()
				}
			}
		}
	})
	
	//ctx.stat= stat
	//ctx.files= opts.files( ctx)

	// get top contents
	//ctx.readdir= opts.readdir( ctx)
	// i would write to opts here but it gets passed everywhere & would get stomped
	// update on previous: everything is now a context

	//if( !val){
	//	val= {}
	//}


	//if( !path.endsWith( sep)){
	//	path= path+ sep
	//}


	await ctx // it is itself but resolved
	const
	  deserializer= async filename=> {
		const
		  entry= opts.resolveName( filename),
		  childPath= path+ entry,
		  child= await opts.deserialize( childPath, null, opts)
		val[ entry]= child
	  },
	  deserialized= readdir.map( deserializer)
	await Promise.all(deserialized)

	//return val
	return ctx
}

export default deserialize
