import { writeFile as WriteFile} from "fs"
import { promisify} from "util"

export const writeFile= promisify( WriteFile)
export default writeFile
