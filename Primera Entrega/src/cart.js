const CartStuff = require('./cartStuff');

class Cart {
    constructor(id, cartStuff) {
        this.id = id;
        this.cartStuff = cartStuff;
    }

    getCartStuffById(id) {
        let cartStuff = this.cartStuff.find(cartStuff => cartStuff.product === id);
        if (cartStuff) {
            console.log(`Found cartstuff with ID ${id}:`);
        } else {
            console.log(`No cart found with ID ${id}.`);
        }
        return cartStuff;
    }
}

module.exports = Cart;