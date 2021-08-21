import { sep} from "path"
import tape from "tape"
import { promisify} from "util"

import mkdir from "../fs/mkdir.js"
import rimraf from "../fs/rimraf.js"
import { serialize} from "../serialize.js"
import writeFile from "../fs/writeFile.js"

import { output} from "./util/config.js"
import { readFiles} from "./util/fs.js"

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
	  isArray= reads[ "@type"]
	delete reads[ "@type"]
	t.equals( isArray, "@collection", "is '@collection' aka an array")
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
