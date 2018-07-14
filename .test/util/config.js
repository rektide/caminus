import { isAbsolute, resolve} from "path"

export const
  output= process.env.TEST_OUTPUT? resolve(process.env.TEST_OUTPUT): resolve( __dirname, "..", "output"),
  cleanup= process.env.TEST_CLEANUP!== 0? true: false

export default {
	output,
	cleanup
}
