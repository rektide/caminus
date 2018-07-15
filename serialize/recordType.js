import { sep} from "path"

export async function recordType( path, val, opts){
	if( Array.isArray(val)){
		const dotArrayPath= path+ sep+ ".array"
		return opts.writePrimitive( dotArrayPath, 1, opts.writeOptions)
	}
}
export default recordType
