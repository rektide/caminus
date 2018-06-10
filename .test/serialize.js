import {
	mkdir as Mkdir,
	readFile as ReadFile,
	rmdir as Rmdir} from "fs"
import { sep} from "path"
import tape from "tape"
import { promisify} from "util"
import { serialize} from ".."
import cleanup from "./util/cleanup"

const
  mkdir= promisify( Mkdir),
  readFile= promisify( ReadFile),
  rmdir= promisify( Rmdir),
  dir= __dirname+ "/output"

tape("serialize a simple object", async function(t){
	await rmdir( dir)
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
	await rmdir(dir)
	t.end()
})

tape("serialize a simple array", function(t){
	t.end()
})

tape("serialize something deep", function(t){
	t.end()
})
