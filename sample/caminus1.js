var caminus = require("../src/caminus.js"),
  util = require("util")

caminus.caminus(
  {foo:7,bar:18,place:{state:"em",zip:"07354",street:"813 theba dr"},tags:["spam","yoyodyne","test-data"]},
  './output_dir',
  function(err,ok){console.log(util.inspect(arguments))})
