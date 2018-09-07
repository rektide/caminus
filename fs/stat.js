import { stat as Stat} from "fs"
import { promisify} from "util"

export const stat= promisify( Stat)
export default stat
