import { sep } from "path"
import pullAll from "lodash.pullall"
import { mapInPlace} from "./util/collection.js"

/**
 * @name caminus
 * @description export json objects to the filesystem
 * @param o object to write to fs
 * @param dir root directory path for fs
 * @param opts options to execute with
 * @author <a href="http://voodoowarez.com/rektide">rektide</a> &lt;<a href="mailto:rektide@voodoowarez.com">rektide@voodoowarez.com</a>&gt;
 */
export async function serialize( dir, val, opts){
	if( !opts){
		const defaultsModule= await import( "./serialize/defaults.js")
		opts= await defaultsModule.default()
	}

	// if primitive,
	const valType= typeof( val)
	if( valType=== "number"|| valType== "string"){
		if( valType=== "number"){
			val= val.toString()
		}

		// we just write the value, done
		return opts.writePrimitive( dir, val, opts.writeOptions)
	}else if( valType=== "function"){
		if( opts.ignoreFunctions){
			return
		}
		throw new Error("Unexpected function")
	}
	// else this is a complex object

	// build dir
	const
	  // grab state -- we're about to go async, but we'll be using this snapshot
	  entries= Object.entries( val),
	  // wait for dir to be created or get contents
	  existingFiles= await opts.getDir( dir, opts.dirMode)
	if( !dir.endsWith( sep)){
		dir= dir+ sep
	}

	// iterate through entries & serialize them all
	const
	  recurse= ([ prop, val])=> opts.serialize( dir+ prop, val, opts),
	  allDone= entries.map( recurse)

	// record any special-ness of this object
     const recordType= opts.recordType( dir, val, opts)

	// delete any stray files we had about
	if( existingFiles){
		// warning: extreme in-place mutation of data structures throughout
		// downconvert entries to keys
		mapInPlace( entries, ([ key])=> key)
		// remove any entries on val that were in the dir
		pullAll( existingFiles, entries)
		// remove stray files
		mapInPlace( existingFiles, f=> opts.rmdir( dir+ sep+ f))
	}

	// wait for everything
	allDone.push( recordType, ...(existingFiles|| []))

	return Promise.all( allDone)
}
export default serialize
