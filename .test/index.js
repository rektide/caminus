import desm from "desm"
import { readdirSync} from "fs"
import isMain from "is-main"

import {} from "./util/on-error.js"
import {} from "./util/create-output-dir.js"
import cleanup from "./util/cleanup.js"
import config from "./util/config.js"

if( config.cleanup){
	process.once( "beforeExit", cleanup)
}

export const tests= readdirSync( desm( import.meta.url)).filter( name=> name.endsWith(".js")&& name!== "index.js")

const _tests= tests
export function main(tests = _tests){
	tests.forEach( test=> import( "./"+ test))
}
if( isMain( import.meta)) {
	main()
}
