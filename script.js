const seats = [];

for(i = 1; i<= 60; i++){
    let category;
    let price;
    if(i <= 20){
        category = "VIP";
        price = 500;

    }
    else if(i <= 40){
        category = "premium";
        price = 300;
    }
    else {
        category = "Regular";
        price = 150;
    }

    seats.push({
    id : i,
    price : price,
    category : category,
    status : "available"

})
}

 const seatContainer = document.getElementById("seat-container");
 seats.forEach(function(seat){
     const seatElement = document.createElement("div");
     seatElement.classList.add("seat");
     seatElement.classList.add(seat.status);
     seatElement.textContent = seat.id;

     seatContainer.appendChild(seatElement);

     seatElement.addEventListener("click", function(){
        if(seat.status === "available"){
            seat.status = "selected";
            seatElement.classList.remove("available");
            seatElement.classList.add("selected");
        }

        else if(seat.status === "selected"){
            seat.status = "available";
            seatElement.classList.remove("selected");
            seatElement.classList.add("available");

        }

        
     })

 });
