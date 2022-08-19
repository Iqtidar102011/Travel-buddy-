var carObject = {
    vehicle: "car",
    imageUrl: "https://images.unsplash.com/photo-1608506436795-af65d01305bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    FarePerKilo: 4,
    capacity: 4,
    desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt perspiciatis, cumque repellat nemo neque dolores. Neque iste ratione obcaecati ipsam."
}
var bikeObject = {
    vehicle: "bike",
    imageUrl: "https://images.unsplash.com/photo-1575253998615-b85f0d57418a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW90b3JiaWtlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    FarePerKilo: 2,
    capacity: 1,
    desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt perspiciatis, cumque repellat nemo neque dolores. Neque iste ratione obcaecati ipsam."
}
var busObject = {
    vehicle: "bus",
    imageUrl: "https://images.unsplash.com/photo-1478359900967-91ec0c6edc60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    FarePerKilo: 3,
    capacity: 30,
    desciption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt perspiciatis, cumque repellat nemo neque dolores. Neque iste ratione obcaecati ipsam."
}
// keep this objects in an array
const servicesArray = [carObject, bikeObject, busObject];


// creating a function for the services cards
// inject object properties by ${objectname(here parameter:services).property/keys}
function displayServices(services) {
    // accessing the main section
    const mainSection = document.getElementById('main_section');
    const stringifiedObj = JSON.stringify(services);
    // creating a div
    const div = document.createElement('div');
    // create innerhtml of the creatied div dynamically with services object
    div.innerHTML = `
    <div class="card mt-5 mx-auto" style="max-width: 800px;">
            <div class="row g-0">
                <div class="col-md-4">
               
                    <img class="img-fluid h-100" src="${services.imageUrl}" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Transport mode : ${services.vehicle}</h5>
                        <p class="card-text">${services.desciption}</p>
                        <p class="card-text"><small class="text-muted">Fair Per Kilo:${services.FarePerKilo}</small>   <small class="text-muted">Capacity: ${services.capacity}</small></p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick='handleBooking(${stringifiedObj})' data-bs-target="#exampleModal">
    	                 Book Now
                        </button
                       
                    </div>
                </div>
            </div>
        </div>
    
    
    
    
    `
    mainSection.appendChild(div);



}
// displayServices(bikeObject);
// displayServices(carObject);
// displayServices(busObject);
// using a function and loop throgh the objects
function allServices(arr) {
    for (service of arr) {
        displayServices(service);
    }
}
allServices(servicesArray);




// handling booking info (modal)
// 1. create a function
// 2. take object as parameter

function handleBooking(obj) {
    const stringifiedObj = JSON.stringify(obj);
    const modalBody = document.getElementById('modal_body');

    modalBody.innerHTML = `
    <div class="card mx-auto" style="width: 18rem;">
  <img src="${obj.imageUrl}" class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">Vehicle mode : ${obj.vehicle}</h5>
    <p class="card-text">${obj.desciption}</p>
    <p class="card-text"><small class="text-muted">Fair Per Kilo:${obj.FarePerKilo}</small>   <small class="text-muted">Capacity: ${obj.capacity}</small></p>
    <div class="d-flex flex-column " role="search">
    <p>Fare: <small class="text-muted" id="fare"></small > </p>
     <p>tax: <small class="text-muted" id="tax"></small > </p>
     <p>Total-cost: <small class="text-muted" id="total-cost"></small > </p>
                    <input id="input_kilo" class="form-control m-2" type="number" placeholder="how many kilo" aria-label="">
                    <input id="input_how_many_vehicle" class="form-control m-2" type="number" placeholder="how many vehicle" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit" onclick='calculateCost(${stringifiedObj})' >Submit</button>
                </div>
   
  </div>
</div>
    
    
    `
}

function calculateCost(obj) {
    const quantity = document.getElementById("input_kilo").value;
    const distance = document.getElementById("input_how_many_vehicle").value;
    const fareValue = document.getElementById("fare");
    const taxValue = document.getElementById("tax");
    const totalCost = document.getElementById("total-cost");

    const fareCost = quantity * distance * obj.FarePerKilo;
    const taxCost = fareCost * 0.20;
    const total = fareCost + taxCost;


    fareValue.innerHTML = fareCost;
    taxValue.innerHTML = taxCost;
    totalCost.innerHTML = total;

    document.getElementById("input_kilo").value = '';
    document.getElementById("input_how_many_vehicle").value = '';

}



// search button
// document.getElementById("btn-search").addEventListener('click', function (elements) {
//     const searchInput = document.getElementById("input_search").value;
//     for (survice of elements) {
//         if (searchInput.toLowerCase() == survice.vehicle.toLowerCase()) {
//             document.getElementById("main_section").innerHTML = '';
//             displayServices(survice);
//             return;
//         }
//     }
// })
document.getElementById("btn_search").addEventListener('click', function () {
    const value = document.getElementById("search_input").value;
    document.getElementById("search_input").value = '';
    // console.log(value);

    for (let i = 0; i < servicesArray.length; i++) {
        const element = servicesArray[i];
        if (value.toLowerCase()
            == element.vehicle.toLowerCase()) {
            document.getElementById("main_section").innerHTML = '';
            displayServices(element);
            return;
        }

    }

    alert("nothing found with your input")

})

