const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryname: { type: String, required: true },
    categoryimage: { type: String },
    subcategories: [
        {
            subcategoryname: { type: String, required: true },
            subcategoryimage: { type: String, required: true },
            content:{ type: String },
            createdAt: { type: Date, default: Date.now },
            smallsubcategories:[
                {
                    smallsubcategoryname: { type: String, required: true },
            smallsubcategoryimage: { type: String, required: true },
            smallsubcategorycontent:{ type: String },
            Price:{ type: String },
            createdAt: { type: Date, default: Date.now },
                }

            ]
        }
    ]
    
}, { timestamps: true });

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
