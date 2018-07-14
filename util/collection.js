export function mapInPlace( collection, fn){
	collection.forEach((o, i)=> collection[ i]= fn(o, i, collection))
	return collection
}
