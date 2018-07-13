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
  dir= __dirname+ "/output"

tape.only("serialize a simple object", async function(t){
	await rimraf( dir)
	await mkdir( dir)
	const data= {
		person: "reg nullify",
		band: "Cataclysmic Combo"
	}
	await serialize( data, dir)
	const read= {
	  person: await readFile( dir+ sep+ "person", "utf8"),
	  band: await readFile( dir+ sep+ "band", "utf8")
	}
	t.deepEquals( read, data, "object read back ok")
	//await rimraf(dir)
	t.end()
})

tape("serialize a simple array", function(t){
	t.end()
})

tape("serialize something deep", function(t){
	t.end()
})
