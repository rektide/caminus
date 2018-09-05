import { readdirSync} from "fs"
import {} from "./util/on-error"
import {} from "./util/create-output-dir"
import cleanup from "./util/cleanup"
import config from "./util/config"

if( config.cleanup){
	process.once( "beforeExit", cleanup)
}

//export const tests= readdirSync(__dirname).filter( name=> name.endsWith(".js")&& name!== "index.js")
export const tests= [ "serialize.js"]

const _tests= tests
export function main(tests = _tests){
	tests.forEach( test=> import( "./"+ test))
}
if( typeof require!== "undefined"&& require.main=== module){
	main()
}
