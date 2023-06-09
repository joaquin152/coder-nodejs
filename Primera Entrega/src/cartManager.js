const fs = require('fs');
const Cart = require('./cart');

const products = require('./routes/products.router.js');

class CartManager {
    constructor() {
        this.nextId = 1;
        this.carts = [];
        this.filePath = './carts.json';
        this.loadcartsFromFile();
    }

    loadcartsFromFile() {
        try {
          const fileData = fs.readFileSync(this.filePath, 'utf8');
          this.carts = JSON.parse(fileData);
          if (Array.isArray(this.carts)) {
            const lastCart = this.carts[this.carts.length - 1];
            if (lastCart) {
              this.nextId = lastCart.id + 1;
            }
          }
          console.log(`Loaded carts from file: ${this.filePath}`);
        } catch (err) {
          console.log("Error loading carts from file");
        }
    }

    addNewCart(cartStuff) {
      if (!cartStuff) {
          console.log("Cart stuff are required");
          return;
      }

      const cart = new Cart(this.nextId, cartStuff);
      this.carts.push(cart);
      console.log(`Added cart "${cartStuff}" to cart with ID ${this.nextId}.`);
      this.nextId++;
      this.saveCartsToFile();
    }

    updateCart(id, updatedFields) {
      const cart = this.getCartById(id);
      if (!cart) {
        console.log(`Error: No cart found with ID ${id}.`);
        return null;
      }
      Object.assign(cart, updatedFields);
      console.log(`Updated cart with ID ${id}.`);
      this.saveCartsToFile();
      return cart;
    }

    saveCartsToFile() {
      try {
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2), 'utf8');
        console.log('Saved carts to file.');
      } catch (err) {
        console.log('Error saving carts to file:', err);
      }
    }

    getCartById(id) {
      let cart = this.carts.find(cart => cart.id === id);
      if (cart) {
          console.log(`Found cart with ID ${id}:`);
      } else {
          console.log(`No cart found with ID ${id}.`);
      }
      return cart;
  }
}

module.exports = CartManager;