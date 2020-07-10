// setting an empty array in the localStorage if it does not exist
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// getting the localStorage's cart array
let cart = JSON.parse(localStorage.getItem("cart"));

// getting the main container in the cart page and the table element
let products = document.querySelector("#products-list");
let table = document.querySelector("table");

// the number for order of the products in the table and total price
let order = 1;
let total = 0;

// creating the view of the cart page according to the cart length
if (cart.length === 0) {
    emptyCart();
} else {
    cart.forEach(product => {
        //showing table element
        table.classList.remove("d-none");

        // creating table rows that holds the product added to cart
        let row = document.createElement("tr");
        let orderCell = document.createElement("th");
        let imgCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let quantityCell = document.createElement("td");
        let proQuantity = document.createElement("span");
        let removeCell = document.createElement("td");
        let img = document.createElement("img");
        let removeButton = document.createElement("a");

        // filling the elements with the products' datas
        orderCell.setAttribute("scope", "row");
        orderCell.className = "align-middle";
        orderCell.innerText = order;
        order++;
        img.setAttribute("src", "../" + product.img);
        nameCell.innerText = product.name;
        nameCell.className = "align-middle";
        priceCell.innerText = `$${product.price} * ${product.quantity} = $${(product.price * product.quantity).toFixed(2)}`;
        priceCell.className = "align-middle";
        proQuantity.innerText = product.quantity;
        let quantityStyle = "padding: 0 10px; font-size: 18px; font-weight: bold";
        proQuantity.setAttribute("style", quantityStyle);
        quantityCell.className = "align-middle";
        removeButton.setAttribute("href", "#");
        removeButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
        removeCell.className = "align-middle";
        let removeStyle = "font-size: 20px; text-decoration: none; color: #000";
        removeButton.setAttribute("style", removeStyle);

        // buttons for incrementing and decrementing the quantity of the product purchased
        let decrement = document.createElement("i");
        let increment = document.createElement("i");
        decrement.className = "fas fa-minus";
        increment.className = "fas fa-plus";
        decrement.onclick = function() {
            if (this.nextElementSibling.innerText == 1) {
                cart.splice(cart.indexOf(cart.find(p => p.id === product.id)), 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                this.parentElement.parentElement.remove();
                if (cart.length === 0) {
                    table.style.display = "none";
                    emptyCart();
                }
                total = 0;
                cart.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = total.toFixed(2);
            } else {
                let index = cart.indexOf(cart.find(p => p.id === product.id));
                cart[index].quantity--;
                proQuantity.innerText = product.quantity;
                priceCell.innerText = `$${product.price} * ${product.quantity} = $${(product.price * product.quantity).toFixed(2)}`;
                total = 0;
                cart.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = total.toFixed(2);
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }

        increment.onclick = () => {
            let index = cart.indexOf(cart.find(p => p.id === product.id));
            cart[index].quantity++;
            proQuantity.innerText = product.quantity;
            priceCell.innerText = `$${product.price} * ${product.quantity} = $${product.price * product.quantity}`;
            total = 0;
            cart.forEach(p => total += p.quantity * p.price);
            totalPrice.innerText = total.toFixed(2);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        // adding click event to remove buttons
        removeButton.onclick = function(e) {
            e.preventDefault();
            cart.splice(cart.indexOf(cart.find(p => p.id === product.id)), 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            this.parentElement.parentElement.remove();
            if (cart.length === 0) {
                table.style.display = "none";
                emptyCart();
            }
            productQuantity();
            total = 0;
            cart.forEach(p => total += p.quantity * p.price);
            totalPrice.innerText = total.toFixed(2);
        }

        // appending elements to the parent elements
        imgCell.appendChild(img);
        quantityCell.append(decrement, proQuantity, increment);
        removeCell.appendChild(removeButton);
        row.append(orderCell, imgCell, nameCell, priceCell, quantityCell, removeCell);
        table.lastElementChild.appendChild(row);
    });

    // adding last table cell for showing the total price of purchased items
    let totalPriceRow = document.createElement("tr");
    let totalPriceCell = document.createElement("td");
    totalPriceCell.setAttribute("colspan", "6");
    totalPriceCell.classList.add("text-right");
    cart.forEach(p => total += p.quantity * p.price);
    totalPriceCell.innerHTML = `<span style="font-size: 20px; margin-right: 20px;">Total Price:</span>`;
    let totalPrice = document.createElement("span");
    totalPrice.style.fontWeight = "bold";
    totalPrice.style.fontSize = "20px";
    totalPrice.innerText = total.toFixed(2);
    totalPriceCell.appendChild(totalPrice);
    totalPriceRow.appendChild(totalPriceCell);
    table.appendChild(totalPriceRow);
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

// function for empty cart message
function emptyCart() {
    table.style.display = "none";
    let message = document.createElement("h1");
    message.style.padding = "200px 0";
    message.style.border = "2px dashed rgb(167, 161, 161)";
    message.style.borderRadius = "10px";
    message.innerHTML = `<p style="text-align: center;">There is no item in your cart. <br /><br /> Go <a href="../index.html">ahead</a> and add something...</p>`;
    products.appendChild(message);
}