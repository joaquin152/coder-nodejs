import fs from 'fs';
let products = [];

const readProductsData = () => {
  try {
    const productsData = fs.readFileSync('../products.json', 'utf-8');
    products = JSON.parse(productsData);
  } catch (error) {
    console.error('Error reading products data:', error);
  }
};

const watchProductsFile = () => {
  fs.watchFile('../products.json', (curr, prev) => {
    console.log('Products file modified');
    readProductsData();
  });
};

export { products, readProductsData, watchProductsFile };
