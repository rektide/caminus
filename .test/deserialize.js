import tape from "tape"

import deserialize from "../deserialize.js"
import { input} from "./util/config.js"

tape( "deserialize car", async function(t){
	const carDir= input+ "deserialize/car"

	// deserialize sample data
	const car= await deserialize( carDir)
	t.equal( car.wheel.length, 4, "has four wheels")
	t.equal( car.wheel["@type"], "@collection", "is an array")
	t.equal( car.engine, "600V 2000A special", "engine is special")
	t.end()
})

tape( "deserialize car, cleaning", async function(t){
	const carDir= input+ "deserialize/car"

	// deserialize sample data
	const state= {
		headlights: "led",
		wheel: [
			,,,,{ position: "bed"} // fifth wheel
		]
	}
	const car= await deserialize( carDir, state)
	// test that we deleted these pieces not in state
	t.notOk( car.wheel[5], "cleaned off fifth wheel")
	t.notOk( car.headlights, "cleaned off headlights")

	// repeat base case assertions, that we deserialized contents
	t.deepEqual( car.wheel[3], {wear: "15"}, "has four wheels")
	t.equal( car.wheel["@type"], "@collection", "is an array")
	t.equal( car.engine, "600V 2000A special", "engine is special")

	t.end()
})
