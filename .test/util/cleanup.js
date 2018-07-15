import rimraf from "../../fs/rimraf"
import { output} from "./config"

export default async function(){
	return rimraf( output)
}
