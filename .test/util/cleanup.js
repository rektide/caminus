import Rimraf from "rimraf"
import { promisify} from "util"
import { output} from "./config"

const rimraf= promisify( Rimraf)

export default async function(){
	return rimraf( output)
}
