import { sep} from "path"
import tape from "tape"
import { promisify} from "util"

import mkdir from "../fs/mkdir"
import rimraf from "../fs/rimraf"
import { serialize} from "../serialize"
import writeFile from "../fs/writeFile"

import { output} from "./util/config"
import { readFiles} from "./util/fs"

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
	const reads= await readFiles( testDir)
	t.deepEquals( reads, data, "object read back ok")
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
	  reads= await readFiles( testDir),
	  isArray= reads[".array"]
	delete reads[".array"]
	t.equals( isArray, "1", "is array")
	t.deepEquals( reads, data, "object read back ok")
	t.end()
})

tape("stray-files", async function(t){
	// setup
	const testDir= output+ "stray-files"
	await rimraf( testDir)
	// "stray" file
	await mkdir( testDir)
	await writeFile( testDir+ sep+ "stray", "rm yoself")

	// serialize + add stray file
	const data= {person: "randon dent", parent: "arthur dent"}
	await serialize( testDir, data)

	// read contents back
	const reads= await readFiles( testDir)
	t.deepEquals( reads, data, "object read back ok")
	t.end()
})



tape("serialize something deep", function(t){
	t.end()
})
