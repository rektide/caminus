import deferrant from "deferrant"
import { mkdir as Mkdir, writeFile as WriteFile} from "fs"
import { sep } from "path"
import { promisify } from "util"

/**
 * Default flyweight object
 * Alternative options must satisfy this contract
 */
export let defaultOpts= {
	writeOptions: {
		encoding: "utf8",
		mode: 0640
	},
	dirMode: 0750,
	mkdir: promisify( Mkdir),
	writeFile: promisify( WriteFile),
	serialize // used recursively by serialize
} 

/**
 * @name caminus
 * @description export json objects to the filesystem
 * @param o object to write to fs
 * @param baseDir root directory path for fs
 * @param opts options to execute with
 * @author <a href="http://voodoowarez.com/rektide">rektide</a> &lt;<a href="mailto:rektide@voodoowarez.com">rektide@voodoowarez.com</a>&gt;
 */
export function serialize( o, baseDir, opts){
	opts= opts|| defaultOpts
	if( !baseDir.endsWith( sep)){
		baseDir= baseDir+ sep
	}
	const allDone= Object.entries( o).map(async function([ prop, val]){
		const
		  valType= typeof( val)
		  propPath= baseDir+ prop
		if( valType=== "object"){
			await opts.mkdir( propPath, opts.dirMode)
			return opts.serialize( val, propPath, opts)
		}else{
			return opts.writeFile( propPath, val, opts.writeOptions)
		}
	})
	return Promise.all( allDone)
}
