export function existsOk( err){
	if( err.code=== "EEXIST"){
		return
	}
	throw err
}
export default existsOk
