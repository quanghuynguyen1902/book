const Book = require(".././models/book");

exports.list = function (req, res) {
  let bookPerPage = 5;
  let page = req.query.page || 1;
  Book.find()
    .skip(bookPerPage * page - bookPerPage)
    .limit(bookPerPage)
    .exec((err, book) => {
      if (err) {
        res.json({
          success: false,
          error: err,
        });
      }
      let success = true;
      const url = "api/book";
      let next = null;
      let previous = null;
      if (book.length === bookPerPage) {
        next =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          url +
          "?page=" +
          String(parseInt(page) + 1);
      }
      if (page !== "1") {
        previous =
          req.protocol +
          "://" +
          req.get("host") +
          "/" +
          url +
          "?page=" +
          String(parseInt(page) - 1);
      }
      if (book.length === 0 && next === null) {
        success = false;
        previous = null;
      }
      res.json({
        success: success,
        next: next,
        previous: previous,
        result: book,
      });
    });
};

exports.add = function (req, res) {
  var book = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  //Save and check error
  book.save(function (err) {
    if (err) return res.status(400).json(err);
    res.status(200).json({
      message: "New book Added!",
      data: book,
    });
  });
};

exports.viewById = function (req, res) {
  Book.findById(req.params.book_id, function (err, book) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  });
};

exports.viewBySlug = function (req, res) {
  Book.findOne({slug: req.params.slug}, function (err, book) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  });
};

exports.update = function (req, res) {
  Book.findById(req.params.book_id, function (err, book) {
    if (err) res.send(err);
    book.name = req.body.title;
    book.author = req.body.author;
    //save and check errors
    book.save(function (err) {
      if (err) res.json(err);
      res.status(400).json({
        message: "Book Updated Successfully",
        data: book,
      });
    });
  });
};

exports.delete = function (req, res) {
  Book.deleteOne({ _id: req.params.book_id }, function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `Book id ${req.params.book_id} has deleted `,
    });
  });
};

exports.search = function (req, res) {
  const searchString = req.query.search;
  Book.search(
    {
      query_string: {
        query: searchString,
        analyzer: "keyword",
      },
    },
    {
      size: 3,
      highlight: {
        pre_tags: ["<b>"],
        post_tags: ["</b>"],
        fields: {
          "*": {},
        },
      },
    },
    function (err, results) {
      if (err) {
        res.status(400).json({
          err: err,
        });
      } else {
        res.status(200).json({ result: results.hits.hits });
      }
    }
  );
};
