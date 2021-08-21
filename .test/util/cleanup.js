import rimraf from "../../fs/rimraf.js"
import { output} from "./config.js"

export default async function(){
	return rimraf( output)
}
