import { join} from "desm"
import { isAbsolute, resolve, sep} from "path"

export const
  output= (process.env.TEST_OUTPUT? resolve(process.env.TEST_OUTPUT): join( import.meta.url, "..", "output")) + sep,
  input= (process.env.TEST_INPUT? resolve(process.env.TEST_INPUT): join( import.meta.url, "..", "input")) + sep,
  cleanup= process.env.TEST_CLEANUP!== "0"? true: false

export default {
	output,
	cleanup
}
