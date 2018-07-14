import { sep} from "path"
import tape from "tape"
import { promisify} from "util"
import { rimraf, readFile} from "./util/fs"
import { output} from "./util/config"
import { mkdir} from "../util/fs"
import { serialize} from ".."

tape("serialize-object", async function(t){
	// setup
	const testDir= output+ "serialize-object"
	await rimraf( testDir)

	// serialize sample data
	const data= {
		person: "reg nullify",
		band: "Cataclysmic Combo"
	}
	await serialize( testDir, data)

	// read contents back
	const
	  fileReads= [
		readFile( testDir+ sep+ "person", "utf8"),
		readFile( testDir+ sep+ "band", "utf8"),
	  ],
	  [ person, band]= await Promise.all(fileReads),
	  read= { person, band}
	t.deepEquals( read, data, "object read back ok")
	t.end()
})

tape("serialize-array", async function(t){
	// setup
	const testDir= output+ "serialize-array"
	await rimraf( testDir)

	// serialize
	const data= [ "old",, "thrashbag"]
	await serialize( testDir, data)

	// read contents back
	const
	  fileReads= [
		readFile( testDir+ sep+ "0", "utf8"),
		readFile( testDir+ sep+ "2", "utf8"),
		readFile( testDir+ sep+ ".array", "utf8")
	  ],
	  [ zero, two, dotArray]= await Promise.all(fileReads),
	  read= [ zero,, two]
	t.equal( dotArray, "1", "object is array")
	t.deepEquals( read, data, "object read back ok")
	t.end()
})

tape("serialize something deep", function(t){
	t.end()
})
