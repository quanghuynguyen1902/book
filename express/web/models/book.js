var mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var elasticsearch = require("elasticsearch");

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    es_indexed: true,
  },
  isbn: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  thumbnailUrl: {
    type: String,
  },
  shortDescription: {
    type: String,
    es_indexed: true,
  },
  longDescription: {
    type: String,
    es_indexed: true,
  },
  slug: {
    type: String
  },
  status: {
    type: String,
  },
  authors: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
  },
});
bookSchema.plugin(mongoosastic, {
  index: "books",
  esClient: elasticsearch.Client({
    host: "localhost:9200",
  }),
});
var Book = mongoose.model("book", bookSchema),
  stream = Book.synchronize({}, { saveOnSynchronize: true }),
  count = 0;

stream.on("data", function (err, doc) {
  count++;
});
stream.on("close", function () {
  console.log("indexed " + count + " documents!");
});
stream.on("error", function (err) {
  console.log(err);
});
Book.createMapping(
  {
    settings: {
      analysis: {
        analyzer: {
          my_analyzer: {
            type: "custom",
            tokenizer: "classic",
            char_filter: ["my_pattern"],
            filter: ["lowercase"],
          },
        },
        char_filter: {
          my_pattern: {
            type: "pattern_replace",
            pattern: "\\.",
            replacement: " ",
          },
        },
      },
    },
    mappings: {
      book: {
        dynamic_templates: [
          {
            strings: {
              match_mapping_type: "string",
              mapping: {
                type: "text",
                fields: {
                  keyword: {
                    type: "keyword",
                  },
                },
              },
            },
          },
        ],
        properties: {
          title: {
            type: "text",
            analyzer: "my_analyzer",
          },
          shortDescription: {
            type: "text",
            analyzer: "my_analyzer",
          },
          longDescription: {
            type: "text",
            analyzer: "my_analyzer",
          },
        },
      },
    },
  },
  (err, mapping) => {
    if (err) {
      console.log(err);
    }
  }
);

module.exports = Book;
