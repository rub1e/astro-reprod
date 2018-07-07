# astro-reprod

Reproduction of issue with `jagi:astronomy` (https://github.com/jagi/meteor-astronomy/issues/676)

## Start

`git clone https://github.com/rub1e/astro-reprod`  
`meteor npm install`  
`npm run test`  

## Narrative

The error happens because of a bad `fields` definition:

```
const Entry = Class.create({
  name: "Entry",
  collection: Entries,
  fields: {
    field: Object,
    "field.subField": Number,
  }
});
```

The error is thrown when you try to save a document with an `Object` field which is defined both as an object and with `dot notation`:

```
I20180707-09:32:16.117(1)?      TypeError: Class.getFields is not a function
I20180707-09:32:16.117(1)?       at castNested (packages/jagi:astronomy/lib/modules/fields/utils/castNested.js:12:15)
I20180707-09:32:16.117(1)?       at documentValidate (packages/jagi:astronomy/lib/modules/validators/utils/document_validate.js:36:3)
I20180707-09:32:16.117(1)?       at catchValidationError (packages/jagi:astronomy/lib/modules/validators/utils/document_validate.js:89:11)
I20180707-09:32:16.118(1)?       at catchValidationError (packages/jagi:astronomy/lib/modules/validators/utils/document_validate.js:49:7)
I20180707-09:32:16.118(1)?       at traverse (packages/jagi:astronomy/lib/modules/validators/utils/document_validate.js:88:9)
I20180707-09:32:16.118(1)?       at next (packages/jagi:astronomy/lib/modules/fields/utils/traverse.js:44:14)
I20180707-09:32:16.119(1)?       at next (packages/jagi:astronomy/lib/modules/fields/utils/traverse.js:48:14)
I20180707-09:32:16.119(1)?       at traverse (packages/jagi:astronomy/lib/modules/fields/utils/traverse.js:53:10)
I20180707-09:32:16.119(1)?       at name (packages/jagi:astronomy/lib/modules/validators/utils/document_validate.js:87:7)
I20180707-09:32:16.120(1)?       at arrayEach (/home/rubie/.meteor/packages/jagi_astronomy/.2.5.8.1131iir.p5ejg++os+web.browser+web.cordova/npm/node_modules/lodash/_arrayEach.js:15:9)
I20180707-09:32:16.120(1)?       at forEach (/home/rubie/.meteor/packages/jagi_astronomy/.2.5.8.1131iir.p5ejg++os+web.browser+web.cordova/npm/node_modules/lodash/forEach.js:38:10)
I20180707-09:32:16.120(1)?       at documentValidate (packages/jagi:astronomy/lib/modules/validators/utils/document_validate.js:83:3)
I20180707-09:32:16.120(1)?       at documentInsert (packages/jagi:astronomy/lib/modules/storage/utils/document_insert.js:59:3)
I20180707-09:32:16.121(1)?       at Class.save (packages/jagi:astronomy/lib/modules/storage/class_prototype_methods/save.js:140:20)
I20180707-09:32:16.121(1)?       at Test.<anonymous> (Entries/server/entries.tests.js:10:11)
I20180707-09:32:16.121(1)?       at run (packages/practicalmeteor:mocha-core/server.js:34:29)
```

## Solution

If you comment out either line and define the object only once, the problem disappears.
