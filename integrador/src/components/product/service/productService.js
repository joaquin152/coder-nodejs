import productModel from '../../../models/mongo/product.js';

class Product {
    async getProduct (id){
        try{
            let response = id 
            ? await productModel.findById(id)
            : await productModel.find();
        } catch (error) {
            console.log(error);
            return[];
        }
    }

    async create (payload){
        try{
            return await productModel.create(payload);
        } catch (error) {
            console.log(error)
        }
    }

    async update (id, payload){
        try{
            return await productModel.findByIdAndUpdate(id, payload, )
        } catch (error) {
            console.log(error)
        }
    }

    async delete (id){  
        try{
            return await productModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error)
        }  
    }
}

const product = new Product();

export default product;