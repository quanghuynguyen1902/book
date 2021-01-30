const mongoose = require("mongoose");
const slugify = require("slugify")

var CategorySchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

CategorySchema.pre('save', async function (next){
    try {
        var category = this;
        if (this.isNew) {
            this.createdAt = this.updateAt = Date.now();
        } else {
            this.updateAt = Date.now();
        }
        category.slug = await slugify(category.name + Math.random().toString(36).substring(10))
        next()
    }catch (e){
        console.log(e)
    }
})

module.exports = mongoose.model("category", CategorySchema);