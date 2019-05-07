Bamazon:

Description

This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package. The application presents two interfaces: customer and manager.

MySQL Database

This application uses MySQL DB to store data and populate for customers products that we have for sale to allow them to select an item that they would like to purchase.  The database stores all the inventory information.

Customer Interface

The customer interface allows the user to view the current inventory of store items: item IDs, descriptions and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:

git clone https://github.com/sherman0513/Bamazon.git

-cd bamazon
-npm install
-node bamazonCustomer.js

link to snippet of the application working: https://github.com/sherman0513/bamazon/blob/master/bamazonCustomer.png
