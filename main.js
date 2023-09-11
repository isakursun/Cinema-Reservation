const container = document.querySelector(".container");

const infoText = document.querySelector(".infoText");

const movie = document.getElementById("movie");

const seats = document.querySelectorAll(".seat:not(.reserved)");

/* Tarayıcı veri tabanında verileri okuma fonksiyonu */

const getSeatsDataFromDatabase = () => {
  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));

  if (dbSelectedMovie) {
    movie.selectedIndex = dbSelectedMovie;
  }

  const dbSelectSeats = JSON.parse(localStorage.getItem("selectedIndex"));

  if (dbSelectSeats !== null && dbSelectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

/* Tarayıcı veritabanı kayıt fonksiyonu */
const saveToDatabase = (seatIndexData) => {
  localStorage.setItem("selectedIndex", JSON.stringify(seatIndexData));
  localStorage.setItem("movieIndex", JSON.stringify(movie.selectedIndex));
};

getSeatsDataFromDatabase();

/* Toplam tutar hesaplama ve koltukların index numaralarını bulma fonksiyonu */
const calculateTotal = () => {
  /* VARİTABANI İŞLEMLERİ  */

  const selectedSeats = container.querySelectorAll(".seat.selected");

  const allSeatsArray = [];
  const allSelectedSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  let selectedIndex = allSelectedSeatsArray.map((allSelectedSeat) => {
    return allSeatsArray.indexOf(allSelectedSeat);
  });

  /* Hesap işlemleri */

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;

  if (selectedSeatsCount > 0) {
    infoText.style.display = "block";
  } else {
    infoText.style.display = "none";
  }

  let price = movie.value;

  let total = price * selectedSeatsCount;

  infoText.innerHTML = `
    <span>${selectedSeatsCount}</span> Koltuk için hesaplanan ücret <span>${total}</span> TL
    `;

  saveToDatabase(selectedIndex);
};

calculateTotal();

container.addEventListener("click", (mouseEvent) => {
  if (
    mouseEvent.target.offsetParent.classList.contains("seat") &&
    !mouseEvent.target.offsetParent.classList.contains("reserved")
  ) {
    mouseEvent.target.offsetParent.classList.toggle("selected");

    calculateTotal();
  }
});

movie.addEventListener("change", () => {
  calculateTotal();
});
