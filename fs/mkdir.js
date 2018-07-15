import { mkdir as Mkdir} from "fs"
import { promisify} from "util"

export const mkdir= promisify( Mkdir)
export default mkdir
