export async function isPrimitive({ stat}){
	if( stat.then){
		stat= await stat
	}
	return !stat.isDirectory()
}
export default isPrimitive
