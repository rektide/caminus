import tape from "tape"

import deserialize from "../deserialize"
import { input} from "./util/config"

tape("deserialize car", async function(t){
	const carDir= input+ "deserialize/car"

	// deserialize sample data
	const car= await deserialize( carDir)
	t.equal( car.wheel.length, 4, "has four wheels")
	t.equal( car.wheel["@type"].trim(), "@collection", "is an array")
	t.equal( car.engine.trim(), "600V 2000A special", "engine is special")
	t.end()
})
