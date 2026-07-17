/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4011920063")

  // update collection data
  unmarshal({
    "name": "design_projects"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4011920063")

  // update collection data
  unmarshal({
    "name": "graphics_projects"
  }, collection)

  return app.save(collection)
})
