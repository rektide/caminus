const notD= /[^\d]/

export function resolveName( filename){
	const
	  num= Number.parseFloat( filename)
	if( num&& notD.test( filename)){
		return filename
	}
	const canonical= num|| filename
	return canonical
}
export default resolveName
