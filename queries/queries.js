

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://127.0.0.1:27017"; // Ensure using 127.0.0.1 instead of localhost
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('myDatabase'); // Replace with your database name
        const collection = database.collection('products');

        // Your queries go here...

        
        // 1. Find all the information about each product
        const allProducts = await collection.find().toArray();
        console.log("All Products:", allProducts);

        // 2. Find the product price which is between 400 to 800
        const priceBetween400And800 = await collection.find({ product_price: { $gte: 400, $lte: 800 } }).toArray();
        console.log("Products with price between 400 and 800:", priceBetween400And800);

        // 3. Find the product price which is not between 400 to 600
        const priceNotBetween400And600 = await collection.find({ product_price: { $not: { $gte: 400, $lte: 600 } } }).toArray();
        console.log("Products with price not between 400 and 600:", priceNotBetween400And600);

        // 4. List the four products which are greater than 500 in price
        const greaterThan500 = await collection.find({ product_price: { $gt: 500 } }).limit(4).toArray();
        console.log("Four products with price greater than 500:", greaterThan500);

        // 5. Find the product name and product material of each product
        const nameAndMaterial = await collection.find({}, { projection: { product_name: 1, product_material: 1, _id: 0 } }).toArray();
        console.log("Product name and material:", nameAndMaterial);

        // 6. Find the product with a row id of 10
        const rowId10 = await collection.findOne({ id: "10" }); // Assuming id is a string, otherwise use 10 without quotes
        console.log("Product with row id of 10:", rowId10);

        // 7. Find only the product name and product material
        const onlyNameAndMaterial = await collection.find({}, { projection: { product_name: 1, product_material: 1, _id: 0 } }).toArray();
        console.log("Only product name and material:", onlyNameAndMaterial);

        // 8. Find all products which contain the value of soft in product material
        const softMaterial = await collection.find({ product_material: /soft/i }).toArray(); // Using regex for case-insensitive match
        console.log("Products with soft material:", softMaterial);

        // 9. Find products which contain product color indigo and product price 492.00
        const indigoAndPrice492 = await collection.find({ product_color: "indigo", product_price: 492.00 }).toArray();
        console.log("Products with color indigo and price 492.00:", indigoAndPrice492);

        // 10. Delete the products which product price value are 28
        const deletePrice28 = await collection.deleteMany({ product_price: 28 });
        console.log("Products deleted with price 28:", deletePrice28.deletedCount);

        
    } finally {
        await client.close();
    }
}

main().catch(console.error);
