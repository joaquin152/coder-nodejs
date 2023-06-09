const fs = require('fs');
const Product = require('./product');
  
class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
        this.filePath = './products.json';
        this.loadProductsFromFile();
    }

    addProduct(title, description, price, thumbnail, code, stock, category) {
        if (!title || !description || !price || !code || !stock || !category) {
            console.log("All fields are required");
            return;
        }
    
        const isCodeUnique = this.products.every(product => product.code !== code);
        if (!isCodeUnique) {
            console.log(`Product with code "${code}" already exists.`);
            return;
        }
    
        const product = new Product(this.nextId, title, description, price, thumbnail, code, stock, category);
        this.products.push(product);
        console.log(`Added product "${title}" with ID ${this.nextId}.`);
        this.nextId++;
        this.saveProductsToFile();
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id);
        if (product) {
            console.log(`Found product with ID ${id}:`);
        } else {
            console.log(`No product found with ID ${id}.`);
        }
        return product;
    }

    getProducts() {
        return this.products;
    }

    loadProductsFromFile() {
        try {
          const fileData = fs.readFileSync(this.filePath, 'utf8');
          this.products = JSON.parse(fileData);
          if (Array.isArray(this.products)) {
            const lastProduct = this.products[this.products.length - 1];
            if (lastProduct) {
              this.nextId = lastProduct.id + 1;
            }
          }
          console.log(`Loaded products from file: ${this.filePath}`);
        } catch (err) {
          console.log("Error loading products from file");
        }
      }
    
    saveProductsToFile() {
      try {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
        console.log('Saved products to file.');
      } catch (err) {
        console.log('Error saving products to file:', err);
      }
    }

    updateProduct(id, updatedFields) {
      const product = this.getProductById(id);
      if (!product) {
        console.log(`Error: No product found with ID ${id}.`);
        return null;
      }
      Object.assign(product, updatedFields);
      console.log(`Updated product with ID ${id}.`);
      this.saveProductsToFile();
      return product;
    }
    
    deleteProduct(id) {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        console.log(`Error: No product found with ID ${id}.`);
        return;
      }
         const deletedProduct = this.products.splice(index, 1)[0];
      console.log(`Deleted product with ID ${id}.`);
      this.saveProductsToFile();
      return deletedProduct;
    }

    getFirstNProducts(n) {
      if (n <= 0 || n > this.products.length) {
        console.log(`Limit ${n} is inside limits of the array`);
        return [];
      }
      const firstXProducts = this.products.slice(0, n);
      return firstXProducts;
    }
}

module.exports = ProductManager;