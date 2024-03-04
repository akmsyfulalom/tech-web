const { allJob, addJob, findByCategory, updateStatus, deleteJob, status, statusAndCategory } = require('./controllers/careerController')
const { login, signUp, checkUser } = require('./controllers/authController')
const express = require('express');
const router = express.Router();
const Product = require('./Product')
const multer = require("multer");
const productSchema = require("./Product");
// const productRoutes = require("./routes/product");
const path = require('path');
const Order = require('./Order');
const newsController = require("./newsModule/news.controller");

router.get('/', allJob)
router.get('/status/:status', status)
router.get('/status/:status/:category', statusAndCategory)
router.post('/submit', addJob)
router.get('/categories/:category', findByCategory)
router.post('/login', login)
router.post('/signup', signUp)
router.patch('/update_status/:id', updateStatus)
router.delete('/delete/:id', deleteJob)
router.get('/checkUser', checkUser)
// router.get('/categories/:category',findByCategory)
router.post('/submit', addJob)


// news end point

router.post('/news', newsController.createNews);
router.get('/news', newsController.getAllNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);


//for store data nad image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  const { title, price, details, category } = req.body;
  const imageName = req.file.filename;

  try {
    await Product.create({ image: imageName, title, price, details, category });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get("/get-image", async (req, res) => {
  try {
    const data = await Product.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: error });
  }
});

// for user
router.get("/user/get-image", async (req, res) => {
  try {
    const data = await Product.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    res.json({ status: error });
  }
});

//for delete product 
router.delete("/delete-image/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update-product/:productId', upload.single('image'), async (req, res) => {
  const productId = req.params.productId;
  try {
    // Construct updated product object
    const updatedProduct = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      details: req.body.details,
      image: req.file ? req.file.filename : product.image, // Use updated image path if available
    };

    // Update the product in the database
    const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//for deflvalue
router.get('/get-product/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch image from 
router.get('/get-image/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const product = await Product.findOne({ image: filename });
    if (!product || !product.image) {
      return res.status(404).send('Image not found');
    }
    const imagePath = path.join(__dirname, './images', product.image);
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Internal Server Error');
  }
});

// productdeatils page
router.get('/get-product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//for cart 
router.post('/add-to-cart/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    // Fetch the product details based on the product ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // You can add the product to the cart logic here
    // For now, return the complete product details along with the response
    res.json({ message: 'Product added to cart successfully', product });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.post('/orders', async (req, res) => {
  try {
    const orderData = req.body; // Assuming the order data is sent in the request body
    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    // Fetch orders from the database
    const orders = await Order.find({});
    res.json(orders); // Send orders as JSON response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router