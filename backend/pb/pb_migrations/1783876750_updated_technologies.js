/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_458473246")

  // remove field
  collection.fields.removeById("text271403014")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_458473246")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text271403014",
    "max": 0,
    "min": 0,
    "name": "iconName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
