let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

// maybe create let(var) for current inventory levels


function stockedItems() {

    let items = [];
    // let stock = [];

    connection.query('select * from products', function (err, results) {
        if (err) {
            console.log(err);
            return;
        }

        items = results.map(result => (["id: " + result.item_id, result.product_name, "$" + result.price])),
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
            console.log(purchased.select, purchased.howMany);

            let chosenItem;
            items.forEach(result => {
                result = purchased.select;
                chosenItem = result;
                console.log(chosenItem);
            });

            if (chosenItem.stock_quantity >= purchased.howMany) {
                connection.query(
                    "update products set ? where ?",
                    [
                        { stock_quantity: purchased.howMany },
                        { item_id: chosedItem.item_id }
                    ],
                    function(err) {
                        if (err) throw (err);
                        console.log("Purchase was successful!");
                    }
                );
            } else {
                console.log("Insufficient quantity!");
            }

            purchased.howMany
        });

    })

    connection.end();

}

stockedItems();



