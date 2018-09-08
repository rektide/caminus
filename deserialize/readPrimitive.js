import readFile from "../fs/readFile"

export async function readPrimitive( path){
	const
	  content= await readFile( path, "utf8"),
	  floatContent= Number.parseFloat( content)
	return content
}
export default readPrimitive
