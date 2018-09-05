import { sep} from "path"

export async function recordType( path, val, opts){
	if( Array.isArray(val)){
		const dotArrayPath= path+ sep+ "@type"
		return opts.writePrimitive( dotArrayPath, "@collection", opts.writeOptions)
	}
}
export default recordType
