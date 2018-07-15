import { readFile as ReadFile} from "fs"
import { promisify} from "util"

export const readFile= promisify( ReadFile)
export default readFile
