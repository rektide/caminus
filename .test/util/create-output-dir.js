import { mkdirSync} from "fs"
import existsOk from "../../fs/existsOk"
import { output} from "./config"

try{
	mkdirSync( output)
}catch( err){
	existsOk( err)
}
