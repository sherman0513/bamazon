var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"password",
	database:"bamazon"
});

function stockedItems() {

    let items = [];
    // let stock = [];

    connection.query('select * from products', function(err, results) {
        if (err) {
            console.log(err);
            return;
        }

        items = results.map(result => ({ id: result.item_id, product: result.product_name, price: "$" + result.price, inStock: result.stock_quantity })),
            console.log(items);

        // stock = results.map(result => result.stock_quantity),
        // console.log(stock);

        inquirer.prompt([
            {
                type: 'input',
                message: 'Select product ID that you would like to purchase',
                name: 'select'
            },
            {
                type: 'input',
                message: 'How many would you like to purchase',
                name: 'howMany'
            }
        ]).then(purchased => {
            // console.log(purchased.select, purchased.howMany);
            let amount = purchased.howMany;
            console.log('amount: ', amount);
            let chosenItem;
            items.forEach(result => {
                // console.log(result);
                if (result.id === parseInt(purchased.select)) {
                    console.log('result.select: ', purchased.select);
                    console.log('result.id: ', result.id);
                    chosenItem = result.id;
                    console.log(chosenItem);
                };
            });
        });
    });
};

stockedItems();