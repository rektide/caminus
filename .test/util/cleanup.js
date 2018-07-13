import Rimraf from "rimraf"
import { sep} from "path"
import { promisify} from "util"

const rimraf= promisify( Rimraf)

export default async function(){
	return rimraf( __dirname + sep + "output")
}
