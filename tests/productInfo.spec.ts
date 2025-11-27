import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { test, expect } from '../fixtures/baseFixtures';

let search = [
    { searchkey: 'macbook', productname: 'MacBook Pro', imagecount: 4 },
    { searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4 },
    { searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', imagecount: 7 }
];

let productMetdata = [
    { searchkey: 'macbook', productname: 'MacBook Pro', header: 'MacBook Pro', brand: 'Apple', productcode: 'Product 18', rewardpoints: '800', availability: 'Out Of Stock', price: '$2,000.00', extaxprice: '$2,000.00'},
    { searchkey: 'macbook', productname: 'MacBook Air', header: 'MacBook Air', brand: 'Apple', productcode: 'Product 17', rewardpoints: '700', availability: 'Out Of Stock', price: '$1,202.00', extaxprice: '$1,000.00'},
    //{ searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', header: 'Samsung Galaxy Tab 10.1', brand: null, productcode: 'SAM1', rewardpoints: '1000', availability: 'Pre-Order',  price: '$241.99', extaxprice: '$199.99'}
];

for (let product of search) {

    test(`Verify product Header ${product.productname}`, {tag: ['@product', '@sanity', '@regression']}, async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);

        expect(await productInfoPage.getProductHeader()).toBe(product.productname);
    });

};

for (let product of search) {

    test(`Verify product Images ${product.productname} : ${product.imagecount}`, {tag: ['@product', '@sanity']}, async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);

        expect(await productInfoPage.getProductImagesCount()).toBe(product.imagecount);
    });

};

for (let product of productMetdata) {

test(`Verify product MetaData ${product.productname}`, async ({ homePage }) => {

    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);

    let actualProductFullDetails = await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header')).toBe(product.header);
    expect.soft(actualProductFullDetails.get('Brand')).toBe(product.brand);
    expect.soft(actualProductFullDetails.get('Product Code')).toBe(product.productcode);
    expect.soft(actualProductFullDetails.get('Reward Points')).toBe(product.rewardpoints);
    expect.soft(actualProductFullDetails.get('Availability')).toBe(product.availability);
   
});

};

for (let product of productMetdata) {
test(`Verify product Pricing ${product.productname}`, async ({ homePage }) => {

    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);

    let actualProductFullDetails = await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header')).toBe(product.header);
    expect.soft(actualProductFullDetails.get('price')).toBe(product.price);
    expect.soft(actualProductFullDetails.get('extaxprice')).toBe(product.extaxprice);
   
});

};

