import { assert } from "chai";

import { Entry } from "../entries.js";

describe("entries", function() {
  it("saves an entry", function() {
    const entry = new Entry({
      field: { subField: 1 }
    });
    entry.save();
    assert.equal(Entry.find().count(), 1, "There is one entry")
  })
})
