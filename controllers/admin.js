const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
  };

  exports.postAddProduct = (req, res, next) => {
      const product = new Product(null, req.body.title, req.body.imageURL, req.body.description, req.body.price)
      product.save();
    res.redirect('/');
  };

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true' ? true : false;
    const prodID = req.params.productID;
    Product.findByID(prodID, product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    });
  };

  exports.postEditProduct = (req, res, next) => {
    const prodID = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageURL = req.body.imageURL;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodID, updatedTitle, updatedImageURL, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
  }

  exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
        });
    }); 
  }

  exports.postDeleteProduct = (req, res, next) => {
    const prodID = req.body.productID;
    Product.deleteByID(prodID);
    res.redirect('/admin/products');
  }