/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_458473246")

  // add field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "help": "",
    "hidden": false,
    "id": "url888727361",
    "name": "href",
    "onlyDomains": null,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_458473246")

  // remove field
  collection.fields.removeById("url888727361")

  return app.save(collection)
})
