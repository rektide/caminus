import { rimraf} from "../../util/fs"
import { output} from "./config"

export default async function(){
	return rimraf( output)
}
