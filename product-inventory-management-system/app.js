const API = "https://fakestoreapi.com/products";

const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");

let products = [];

// LOAD PRODUCTS
async function getProducts() {

loading.classList.remove("hidden");

const res = await fetch(API);
products = await res.json();

loading.classList.add("hidden");

displayProducts(products);

}

getProducts();


// DISPLAY PRODUCTS

function displayProducts(data){

productsContainer.innerHTML = "";

if(data.length === 0){
productsContainer.innerHTML = "<p>No Products Found</p>";
return;
}

data.forEach(product => {

productsContainer.innerHTML += `

<div class="bg-white rounded shadow p-4 hover:shadow-lg transition">

<img src="${product.image}" class="h-40 mx-auto object-contain">

<h2 class="font-bold mt-3">${product.title}</h2>

<p class="text-gray-600 text-sm">
${product.description.substring(0,60)}...
</p>

<p class="mt-2 font-semibold ${
product.price < 20 ? "text-green-600" : "text-black"
}">
$${product.price}
</p>

<p class="text-sm text-gray-500">${product.category}</p>

<div class="flex gap-2 mt-3">

<button onclick="deleteProduct(${product.id})"
class="bg-red-500 text-white px-3 py-1 rounded">
Delete
</button>

<button onclick="editProduct(${product.id})"
class="bg-yellow-500 text-white px-3 py-1 rounded">
Edit
</button>

</div>

</div>

`;

});

}


// ADD PRODUCT

async function addProduct(){

const title = document.getElementById("title").value;
const price = document.getElementById("price").value;
const description = document.getElementById("description").value;
const category = document.getElementById("category").value;
const image = document.getElementById("image").value;

const newProduct = {
title,
price,
description,
category,
image
};

const res = await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(newProduct)
});

const data = await res.json();

alert("Product Added");

products.push(data);

displayProducts(products);

document.getElementById("title").value="";
document.getElementById("price").value="";
document.getElementById("description").value="";
document.getElementById("category").value="";
document.getElementById("image").value="";

}


// DELETE PRODUCT

async function deleteProduct(id){

await fetch(`${API}/${id}`,{
method:"DELETE"
});

products = products.filter(p => p.id !== id);

displayProducts(products);

alert("Product Deleted");

}


// EDIT PRODUCT

async function editProduct(id){

const title = prompt("Enter new title");

if(!title) return;

await fetch(`${API}/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title:title
})

});

products = products.map(p => {

if(p.id === id){
p.title = title;
}

return p;

});

displayProducts(products);

alert("Product Updated");

}


// FILTER CATEGORY

document.getElementById("categoryFilter").addEventListener("change",(e)=>{

const value = e.target.value;

if(value === "all"){
displayProducts(products);
}else{

const filtered = products.filter(p => p.category === value);

displayProducts(filtered);

}

});