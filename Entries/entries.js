import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import { Class, Enum } from "meteor/jagi:astronomy";

const Entries = new Mongo.Collection("entries");

const Entry = Class.create({
  name: "Entry",
  collection: Entries,
  fields: {
    field: Object,
    "field.subField": Number,
  }
});

export { Entry };
