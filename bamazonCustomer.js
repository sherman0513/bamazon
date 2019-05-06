var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

function stockedItems() {

    let items = [];
    // let stock = [];

    connection.query('select * from products', function (err, results) {
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
            // console.log('amount: ', amount);
            let chosenItem;
            items.forEach(result => {
                // console.log(result);
                if (result.id === parseInt(purchased.select)) {
                    // console.log('result.select: ', purchased.select);
                    // console.log('result.id: ', result.id);
                    chosenItem = result.id;
                    // console.log(chosenItem);
                };
            });
            let needed = amount;
            let IDreq = chosenItem;
            finalizeOrder(IDreq, needed);
        });
    });
    
};

function finalizeOrder(IDreq, needed) {
    connection.query('select * from products where item_id = ?', [IDreq], function (err, result) {
        if (err) {
            console.log(err);
        };
        if (needed <= result[0].stock_quantity) {
            let totalCost = result[0].price * needed;
            console.log('Good news your order is in stock!');
            console.log('Your total cost for ' + needed + ' ' + result[0].product_name + ' is ' + totalCost + ' Thank you!');
            let newStock = (result[0].stock_quantity - needed);
            // console.log('newStock: ', newStock);

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: IDreq
            }])
        } else {
            console.log('Insufficient quantity, sorry we do not have enough ' + result[0].product_name + ' to complete your order.');
        };
        connection.end();
    })   

}

stockedItems();