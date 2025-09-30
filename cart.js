document.addEventListener("DOMContentLoaded", ()=>{
    displayCart()
})

function displayCart(){
    let cart = JSON.parse(localStorage.getItem("cart"))
    let totalPrice = document.querySelector(".total-price")
    let cartContent = document.querySelector(".cartContent")

    cartContent.innerHTML= "";
    let totalBill = 0;
    if(cart.length === 0){
        cartContent.innerHTML = `<p>Your cart is empty start <a href="./home.html">Shopping </a></p>`
        totalPrice.innerHTML="";
        totalPrice.style.display = "none"
    }

    cart.map((product, i)=>{
        let price = Math.floor(85.96*product.price);
        totalBill+=Math.floor(85.96*product.price);
        let productElem = document.createElement("div")
        productElem.setAttribute("class", "product-info");
        productElem.innerHTML = `
            <div class="img-title">
                <img src="${product.thumbnail}"/>
                <div class="product-details">
                    <div class="title">${product.title}</div>
                    <div class="product-price"><span>&#8377</span>${price}</div>
                    <div class="shipping-availabilityStatus">
                        <div class="product-shippingStatus">${product.shippingInformation}</div>
                        <div class="product-availabilityStatus">${product.availabilityStatus}.</div>
                    </div>
                    <button class="remove-btn" onclick="removeProductFromCart(${i})">Remove</button>
                </div>
            </div>
            
        `
        cartContent.appendChild(productElem)

    })
    totalPrice.innerHTML = `<div><i>Total Bill: </i><span>&#8377 </span>${totalBill}</div>`;
}

function removeProductFromCart(index){
    let cart = JSON.parse(localStorage.getItem("cart"))||[]
    cart.pop(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    displayCart()
    console.log(cart);
}