import {} from "./util/on-error"
import {} from "./serialize"
import cleanup from "./util/cleanup"

if( !process.env.TEST_NO_CLEANUP){
	cleanup()
}
