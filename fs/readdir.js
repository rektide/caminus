import { readdir as Readdir} from "fs"
import { promisify} from "util"

export const readdir= promisify( Readdir)
export default readdir
