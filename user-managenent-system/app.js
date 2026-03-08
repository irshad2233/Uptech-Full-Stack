const api = "https://dummyjson.com/users";
const table = document.getElementById("userTable");
const form = document.getElementById("userForm");

let users = [];

// ==========================
// LOAD USERS (READ)
// ==========================

async function loadUsers() {

try {

const res = await fetch(api);
const data = await res.json();

users = data.users;

displayUsers(users);

} catch (error) {
console.log("Error loading users", error);
}

}

loadUsers();


// ==========================
// DISPLAY USERS
// ==========================

function displayUsers(users) {

table.innerHTML = "";

users.forEach(user => {

table.innerHTML += `
<tr class="border-b">

<td class="p-2">${user.id}</td>
<td class="p-2">${user.firstName}</td>
<td class="p-2">${user.lastName}</td>
<td class="p-2">${user.email}</td>
<td class="p-2">${user.phone}</td>

<td class="p-2">

<button onclick="editUser(${user.id})"
class="bg-yellow-400 px-2 py-1 mr-2">
Edit
</button>

<button onclick="deleteUser(${user.id})"
class="bg-red-500 text-white px-2 py-1">
Delete
</button>

</td>

</tr>
`;

});

}

form.addEventListener("submit", async function(e){

e.preventDefault();

const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;

try{

const res = await fetch(api + "/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
firstName,
lastName,
email,
phone
})

});

const data = await res.json();

users.push(data);

displayUsers(users);

alert("User Added Successfully");

form.reset();

}catch(error){

console.log(error);

}

});

async function deleteUser(id){

try{

await fetch(`${api}/${id}`,{
method:"DELETE"
});

users = users.filter(user => user.id !== id);

displayUsers(users);

alert("User Deleted");

}catch(error){

console.log(error);

}

}

function editUser(id){

const user = users.find(u => u.id === id);

document.getElementById("firstName").value = user.firstName;
document.getElementById("lastName").value = user.lastName;
document.getElementById("email").value = user.email;
document.getElementById("phone").value = user.phone;

form.onsubmit = async function(e){

e.preventDefault();

try{

const res = await fetch(`${api}/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

firstName: document.getElementById("firstName").value,
lastName: document.getElementById("lastName").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value

})

});

const data = await res.json();

users = users.map(user =>
user.id === id ? data : user
);

displayUsers(users);

alert("User Updated");

form.reset();

}catch(error){

console.log(error);

}

}

}

const search = document.getElementById("searchInput");

search.addEventListener("keyup", function(){

const value = search.value.toLowerCase();

const filtered = users.filter(user =>
user.firstName.toLowerCase().includes(value)
);

displayUsers(filtered);

});