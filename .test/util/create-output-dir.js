import { mkdirSync} from "fs"
import existsOk from "../../fs/existsOk.js"
import { output} from "./config.js"

try{
	mkdirSync( output)
}catch( err){
	existsOk( err)
}
