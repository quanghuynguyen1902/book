const Categories = require('../models/category')
const Book = require('../models/book')

exports.list = function (req, res) {
    let categoryPerPage = 10;
    let page = req.query.page || 1;
    Categories.find()
        .skip(categoryPerPage * page - categoryPerPage)
        .limit(categoryPerPage)
        .exec((err, category) => {
            if (err) {
                res.json({
                    success: false,
                    error: err,
                });
            }
            let success = true;
            const url = "api/category";
            let next = null;
            let previous = null;
            if (category.length === categoryPerPage) {
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
            if (category.length === 0 && next === null) {
                success = false;
                previous = null;
            }
            res.json({
                success: success,
                next: next,
                previous: previous,
                result: category,
            });
        });
};
exports.view = function (req, res) {
    Categories.findOne({ slug: req.params.slug }, function (err, category) {
        if (err) {
            res.status(400).json({
                success: false,
                error: err,
            });
        }
        Book.find({categories: {"$all": category.name }}, function (error, book) {
            if (err) {
                res.status(400).json({
                    success: false,
                    error: error,
                });
            }
            res.status(200).json({
                success: true,
                data: {
                    category: category,
                    books: book
                }
            })
        })
    });
};

exports.delete = function (req, res) {
    Categories.deleteOne({ slug: req.params.slug }, function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                error: err,
            });
        }
        res.status(200).json({
            success: true,
            message: `category with sl ug${req.params.slug} has deleted `,
        });
    });
};