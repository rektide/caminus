import readFile from "../fs/readFile"

export async function readPrimitive({ path}){
	const
	  content= async readFile( path, "utf8"),
	  floatContent= Number.parseFloat( content)
	if( floatContent) {
		const intContent= Number.parseInt( content)
		return intContent=== floatContent? intContent: floatContent
	}
	return content
}
export default readPrimitive
