import { isAbsolute, resolve, sep} from "path"

export const
  output= (process.env.TEST_OUTPUT? resolve(process.env.TEST_OUTPUT): resolve( __dirname, "..", "output")) + sep,
  cleanup= process.env.TEST_CLEANUP!== "0"? true: false

export default {
	output,
	cleanup
}
