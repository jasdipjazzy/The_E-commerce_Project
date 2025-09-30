document.addEventListener("DOMContentLoaded", ()=>{
    let productId = localStorage.getItem("productId");
    let products = JSON.parse(localStorage.getItem("products"))

    let productDetails = document.getElementById("productDetails")

    if(products && productId){
        let selectedProduct = products.find((v)=>{
            return v.id == productId;
        });

        if(selectedProduct){
            let price = Math.floor(85.96*selectedProduct.price);
            console.log(price);
            productDetails.innerHTML = `
                <div class="container">
                    <div class="productImg-details">
                        <div class="productImg">
                            <img src="${selectedProduct.thumbnail}"/>
                        </div>
                        <div class="product-details">
                            <div class="product-title">${selectedProduct.title}</div>
                            <div class="product-brand"><b>Brand: </b>${selectedProduct.brand}</div>
                            <div class="product-category"><b>Category: </b>${selectedProduct.category}</div>
                            <div class="prodcuct-description"><b>Description: </b>${selectedProduct.description}</div>
                            <div class="product-warrenty">${selectedProduct.warrantyInformation}.</div>
                            
                            <div class="shipping-availabilityStatus">
                                <div class="product-shippingStatus">${selectedProduct.shippingInformation}</div>
                                <div class="product-availabilityStatus">${selectedProduct.availabilityStatus}.</div>
                            </div>
                            <div class="returnPolicy">${selectedProduct.returnPolicy}</div>
                            
                            <div class="price-dicount">
                                <div class="product-price"><span>&#8377</span>${price}</div>
                                <div class="product-discount">${selectedProduct.discountPercentage}% off</div>
                            </div>  

                            <div class="cart-back-btn">
                                <button class="cart-btn"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
                                <button class="backHome-btn" onclick="backToHome()">Back to Home</button>
                            </div>
                        </div>
                    </div>



                    <div class="product-reviews">
                    <h2 class="rating-heading">Customer Reviews</h2>
                    <hr>
                        ${selectedProduct.reviews.map((v)=>{
                            
                            return`
                                <div class="product-reviews">
                                    <div class="reviewerName">
                                        <i class="fa-solid fa-circle-user"></i> 
                                        <b>${v.reviewerName}</b>
                                    </div>
                                    <div class="comment-review">
                                        <div class="rating">${'❤︎'.repeat(Math.floor(v.rating))}${'♡'.repeat(5-v.rating)}</div>
                                        <div>${v.comment}</div>
                                    </div>
                                    <div>${v.date} (India Standard Time)</div>
                                </div>
                            `
                        }).join('')}
                    </div>


                </div>
            `

            document.querySelector(".cart-btn").addEventListener('click', ()=>{
                addToCart(selectedProduct)
            })
            
        }
        else{
            productDetails.innerHTML = `<p>No Product found</p>`
        }
    }
    else{
        productDetails.innerHTML = `<p>Product not found</p>`
    }

})


function backToHome(){
    window.location.href="./home.html";
}

function addToCart(products){
    let cart = JSON.parse(localStorage.getItem("cart")) ||[]
    cart.push(products)
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added successfully...")
    console.log(products);
}