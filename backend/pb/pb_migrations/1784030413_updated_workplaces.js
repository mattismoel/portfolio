/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2732378998")

  // update collection data
  unmarshal({
    "name": "experiences"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2732378998")

  // update collection data
  unmarshal({
    "name": "workplaces"
  }, collection)

  return app.save(collection)
})
