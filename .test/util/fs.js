import { readFile as ReadFile} from "fs"
import Rimraf from "rimraf"
import { promisify} from "util"

export const
  rimraf= promisify( Rimraf),
  readFile= promisify( ReadFile)
