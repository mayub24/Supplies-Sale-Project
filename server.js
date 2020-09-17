const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService(`mongodb+srv://moAyub:12345@cluster0.q3jmj.mongodb.net/sample_supplies?retryWrites=true&w=majority`);

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)
app.post('/api/sales', async (req, res) => {
    postSingleSale = await myData.addNewSale(req.body);

    res.json(postSingleSale);
})



// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
// 2 Sales per page
app.get('/api/sales', async (req, res) => {

    getAllSales = await myData.getAllSales(1, 10);

    res.json(getAllSales);

})



// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get('/api/sales/:id', async (req, res) => {
    const getSalesId = await myData.getSaleById(req.params.id);

    res.json(getSalesId);
})



// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put('/api/sales/:id', async (req, res) => {
    const updateSales = await myData.updateSaleById(req.body, req.params.id);

    res.json(updateSales);
})



// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete('/api/sales/:id', async (req, res) => {
    const deleteSales = await myData.deleteSaleById(req.params.id);

    res.json(deleteSales);
})


// ************* Initialize the Service & Start the Server

myData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

