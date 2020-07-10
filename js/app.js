// setting an empty array in the localStorage if it does not exist
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// defining buttons for adding products to the cart
let add = document.querySelectorAll(".add");

for (let button of add) {
    button.addEventListener("click", function(e) {
        e.preventDefault();

        // checking if the cart array is existed in the localStorage or not
        if (JSON.parse(localStorage.getItem("cart")) === null) {
            localStorage.setItem("cart", JSON.stringify([]));
        }

        // creating the values for the object to be added to cart
        let cart = JSON.parse(localStorage.getItem("cart"));
        let id = this.parentNode.parentNode.getAttribute("id");
        let img = this.parentNode.previousElementSibling.getAttribute("src");
        let name = this.parentElement.firstElementChild.innerText;
        let price = Number(this.previousElementSibling.lastElementChild.innerText);

        // creating and checking if the clicked product is exist in the cart or not
        let product = cart.find(pro => pro.id == id);
        if (product === undefined) {
            cart.push({
                id: id,
                img: img,
                name: name,
                price: price,
                quantity: 1
            });
        } else {
            product.quantity++;
        }
        
        // adding clicked product to the cart
        localStorage.setItem("cart", JSON.stringify(cart));

        // calling the function for updating the quantity of the products in the cart
        productQuantity();
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