class CartStuff {
    
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    update(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        return this;
    }
}

module.exports = CartStuff;