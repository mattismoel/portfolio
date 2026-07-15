/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3013615662")

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1234943671",
    "name": "usePreview",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3013615662")

  // remove field
  collection.fields.removeById("bool1234943671")

  return app.save(collection)
})
