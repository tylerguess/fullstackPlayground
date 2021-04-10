const fs = require('fs');
const path = require('path');

const getProductsFromFile = callback => {
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            getProductsFromFile(products => {
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log('we wrote');
                    console.log(err);
                });
            });
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

}