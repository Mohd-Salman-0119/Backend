const { ProductModel } = require('../imports/models.imports')
const { asyncHandler, uuidv4 } = require('../imports/modules.imports')

const getProductController = asyncHandler(async (req, res) => {
     try {
          const products = await ProductModel.find();
          res.status(200).send(products)
     } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Internal server error." })
     }
});
const getSingleProductController = asyncHandler(async (req, res) => {
     try {
          const id = req.params.id
          const product = await ProductModel.findOne({ id });
          res.status(200).send(product)
     } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Internal server error." })
     }
});

const addProductController = asyncHandler(async (req, res) => {
     try {
          const { name, description, category, price } = req.body;
          if (!name || !description || !category || !price) {
               return res.status(401).send({ message: "Required feild can't be empty." })
          }
          await ProductModel.create({ id: uuidv4(), ...req.body });
          res.status(201).send({ message: "Product added successfully." })
     } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Internal server error." })
     }
});

const editProductController = asyncHandler(async (req, res) => {
     try {
          const { id } = req.params;
          const { name, picture, description, gender, category, price } = req.body;
          let product = await ProductModel.findOne({ id });

          if (!product) {
               return res.status(404).send({ message: 'Product not found' })
          }
          product.name = name ? name : product.name;
          product.picture = picture ? picture : product.picture;
          product.description = description ? description : product.description;
          product.gender = gender ? gender : product.gender;
          product.category = category ? category : product.category;
          product.price = price ? price : product.price;

          await product.save();

          res.status(201).send({ message: "Product updated successfully" })

     } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Internal server error." })
     }
})
const deleteProductController = asyncHandler(async (req, res) => {
     try {
          const { id } = req.params;

          await ProductModel.findByIdAndDelete({ _id: id })

          res.status(201).send({ message: "Product updated successfully" })

     } catch (error) {
          console.log(error);
          res.status(400).send({ message: "Internal server error." })
     }
})



module.exports = {
     getProductController,
     addProductController,
     getSingleProductController,
     editProductController,
     deleteProductController
}