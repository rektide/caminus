import { mkdirSync} from "fs"
import { existsOk} from "../../util/fs"
import { output} from "./config"

try{
	mkdirSync( output)
}catch( err){
	existsOk( err)
}
