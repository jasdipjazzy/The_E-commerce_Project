let allProducts=[];

function fetchData(){
    fetch("https://dummyjson.com/products").then((res)=>{
        return res.json();
    }).then((val)=>{
        // console.log(val.products);
        allProducts = val.products;
        localStorage.setItem("products", JSON.stringify(allProducts))
        fetchProduct(allProducts)
    })
}


function fetchProduct(product){
    let output = "";
    product.map((v)=>{
        let price = v.price * 86.78;
        // let rate = Math.floor(v.rating);
        // console.log(price);
        // console.log(v);
        output+=`
            <div class="cards">
                <img class='thumbnail' src="${v.thumbnail}"/>
                <div class="description">  
                    <div class='title-rating'>
                        <div class='product-title' title='${v.title}'>${v.title}</div> 
                        <div class='rating'>
                            <div>${v.rating}</div>
                            <div><i class="bi bi-star-fill"></i></div>
                        </div>
                    </div>
                    
                    <div class='price-discount'>
                        <div id='price'><span>&#8377</span>${Math.floor(price)}</div>
                        <div class='discount'>${v.discountPercentage}% off</div>
                    </div>
                    <button class='view-more' onclick="viewMore(${v.id})">View More</button>
                </div>
            </div>       
        `
    })
    document.querySelector('.container-product').innerHTML=output;
}

fetchData()


//!Search Product
document.querySelector(".search-input-box").addEventListener('input', function searchItem(event){
    let searchTerm  = event.target.value.toLowerCase();
    let filterProdcut = allProducts.filter((val)=>{
        return (
            val.title.toLowerCase().includes(searchTerm) ||
            val.category.toLowerCase().includes(searchTerm)
            );
    })
    // console.log(searchTerm);
    fetchProduct(filterProdcut)
}) 


//!view more
function viewMore(productId){
    localStorage.setItem("productId", productId);
    window.location.href="./viewMore.html"
}