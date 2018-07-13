import {
	mkdir as Mkdir,
	readFile as ReadFile } from "fs"
import { sep} from "path"
import tape from "tape"
import { promisify} from "util"
import Rimraf from "rimraf"
import { serialize} from ".."

const
  mkdir= promisify( Mkdir),
  readFile= promisify( ReadFile),
  rimraf= promisify( Rimraf),
  dir= __dirname+ sep+ "output"+ sep

tape("serialize-object", async function(t){
	const testDir= dir+ "serialize-object"
	await rimraf( testDir)
	await mkdir( testDir)
	const data= {
		person: "reg nullify",
		band: "Cataclysmic Combo"
	}
	await serialize( data, testDir)
	const read= {
	  person: await readFile( testDir+ sep+ "person", "utf8"),
	  band: await readFile( testDir+ sep+ "band", "utf8")
	}
	t.deepEquals( read, data, "object read back ok")
	t.end()
})

tape("serialize-array", async function(t){
	const testDir= dir+ "serialize-array"
	await rimraf( testDir)
	await mkdir( testDir)
	const data= [ "old",, "thrashbag"
	]
	await serialize( data, testDir)
	const read= {
	  0: await readFile( testDir+ sep+ "0", "utf8"),
	  2: await readFile( testDir+ sep+ "2", "utf8")
	}
	t.deepEquals( read, data, "object read back ok")
	t.end()
})

tape("serialize something deep", function(t){
	t.end()
})
