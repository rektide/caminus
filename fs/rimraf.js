import Rimraf from "rimraf"
import { promisify} from "util"

export const rimraf= promisify( Rimraf)
export default rimraf
