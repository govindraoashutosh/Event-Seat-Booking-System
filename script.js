const seats = [];

for( let i = 1; i<= 60; i++){
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
  const selectedseatsElement = document.getElementById("selected-seats");
   const totalSeats = document.getElementById("total-seats");
    const totalAmountElement = document.getElementById("total-amount");
     const confirmBooking = document.getElementById("confirm-booking");
      const bookingList = document.getElementById("booking-list");
       const bookingSeats = document.getElementById("booking-seats");
        const totalseats = document.getElementById("booking-total-seats");
         const totalAmount = document.getElementById("booking-total-amount");
          const bookingStatus = document.getElementById("booking-status");
           const cancelBooking = document.getElementById("cancel-booking");

        const saveData = JSON.parse(localStorage.getItem("bookedSeats"));
         const savedBookedseats = Array.isArray(saveData) ? saveData : [];

         savedBookedseats.forEach(function(savedSeatid) {
             const seat = seats.find(function(seat) {
                 return seat.id === savedSeatid;
            })
            if(seat){
                seat.status = "booked";
            }
         })


   function updateBookingSummary(){
     const selectedSeats = seats.filter(function(seat) {
         return seat.status === "selected";
    })

    let totalAmount = 0;
    selectedSeats.forEach(function(seat) {
        totalAmount = totalAmount + seat.price;
    })
    if(selectedSeats.length === 0){
        selectedseatsElement.textContent = "No seats Selected";
    }
    else {
        selectedseatsElement.textContent = selectedSeats.map(function(seat) {
            return seat.id
        }).join(",");
    }
    totalSeats.textContent = selectedSeats.length;
    totalAmountElement.textContent = "₹" + totalAmount;
   }

   function showBookings() {
     const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
     if(savedBookings.length === 0){
        return ;
     }
      const bookings = savedBookings[savedBookings.length - 1];
      bookingSeats.textContent = bookings.seats.join(",");
      totalseats.textContent = bookings.totalSeats;
      totalAmount.textContent = "₹" + bookings.totalAmount;
      bookingStatus.textContent = bookings.status;
   }


 seats.forEach(function(seat){
     const seatElement = document.createElement("div");
     seatElement.classList.add("seat");
     seatElement.classList.add(seat.status);
     seatElement.textContent = seat.id;

     seatContainer.appendChild(seatElement);
      seat.element = seatElement;


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

        updateBookingSummary();

        
     })

 });

confirmBooking.addEventListener("click", function(){
     const selectedSeats = seats.filter(function(seat) {
         return seat.status === "selected";
    })
    if(selectedSeats.length === 0){
        alert("please select at least one seat.");
        return;
    }
    
        selectedSeats.forEach(function(seat) {
            seat.status = "booked";
            seat.element.classList.remove("selected");
            seat.element.classList.add("booked");
        })
        const booking = {
            seats : selectedSeats.map(function(seat){
                return seat.id ;
            }),
            totalSeats : selectedSeats.length,
            totalAmount : selectedSeats.reduce(function(total,seat){
                return total + seat.price;
            },0),
            status : "confirmed" 

        };

         const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
         savedBookings.push(booking);
         localStorage.setItem("bookings", JSON.stringify(savedBookings));


        bookingSeats.textContent = booking.seats.join(",");
        totalseats.textContent = booking.totalSeats;
        totalAmount.textContent =  "₹" +  booking.totalAmount;
        bookingStatus.textContent = booking.status;
       
         const bookedSeats = seats.filter(function(seat) {
             return seat.status === "booked";
             

        })
        .map(function(seat){
            return seat.id;
        })

        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
    
    updateBookingSummary();

    alert("Booking confirm successfully:");
})

showBookings();

