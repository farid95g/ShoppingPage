// setting an empty array in the localStorage if it does not exist
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// getting the localStorage's cart array
let cart = JSON.parse(localStorage.getItem("cart"));

// getting the main container in the cart page and the table element
let products = document.querySelector("#products-list");
let table = document.querySelector("table");

// the number for order of the products in the table
let order = 1;

// creating the view of the cart page according to the cart length
if (cart.length === 0) {
    table.style.display = "none";
    let message = document.createElement("h1");
    message.style.padding = "50px 0";
    message.innerHTML = `<p style="text-align: center;">There is no item in your cart. <br /><br /> Go <a href="../index.html">ahead</a> and add something...</p>`;
    products.appendChild(message);
} else {
    cart.forEach(product => {
        // creating table rows that holds the product added to cart
        let row = document.createElement("tr");
        let orderCell = document.createElement("th");
        let imgCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let quantityCell = document.createElement("td");
        let img = document.createElement("img");

        // filling the elements with the products' datas
        orderCell.setAttribute("scope", "row");
        orderCell.innerText = order;
        order++;
        img.setAttribute("src", "../" + product.img);
        nameCell.innerText = product.name;
        priceCell.innerText = "$" + product.price;
        quantityCell.innerText = product.quantity;

        // appending elements to the parent elements
        imgCell.appendChild(img);
        row.append(orderCell, imgCell, nameCell, priceCell, quantityCell);
        table.lastElementChild.appendChild(row);
    });
}

// function for changing the product quantity near the shopping cart icon
function productQuantity() {
    if (localStorage.getItem("cart") === null) {
        document.getElementById("productQuantity").innerText = 0;
    } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        document.getElementById("productQuantity").innerText = cart.length;
    }
}

// calling the function for updating the product quantity on each load
productQuantity();

// calling productQuantity function each 1 second for updating the product quantity if the user will clear all localStorage items
setInterval(productQuantity, 1000);