import {} from "./util/on-error"
import {} from "./util/create-output-dir"
import {} from "./serialize"
import cleanup from "./util/cleanup"
import config from "./util/config"

if( config.cleanup){
	process.once( "beforeExit", cleanup)
}
