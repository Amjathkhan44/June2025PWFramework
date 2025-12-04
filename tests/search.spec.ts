import { test, expect } from '../fixtures/baseFixtures';
import { ResultsPage } from '../pages/ResultsPage';

//data provider for product search key and results count
const searchData = [
    { searchkey: 'macbook', resultscount: 3 },
    { searchkey: 'samsung', resultscount: 2 },
    { searchkey: 'iMac', resultscount: 1 },
    { searchkey: 'canon', resultscount: 1 },
    { searchkey: 'Dummy', resultscount: 0 }
];

for (const product of searchData) {
    test(`@search @sanity Verify product search ${product.searchkey}`, async ({ homePage }) => {
        
        const resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        expect(await resultsPage.getSearchResultsCount()).toBe(product.resultscount);
    });
}

