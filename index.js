

// Dieses script dient dazu, das hinzufügen der karten für produkte zu automatisieren. 
// das läuft später über eine API, so gehts aber zum testen
// Produktliste
const productList = [
  { name: "Hoodie", price: "24,99€", imageUrl: "https://via.placeholder.com/300x200" },
  { name: "Product 2", price: "Iwas", imageUrl: "https://via.placeholder.com/300x200" },
  { name: "Product 3", price: "Irgendwas", imageUrl: "https://via.placeholder.com/300x200" }
];

function createCard(product) {
  // Check if the target element with id "cards" exists
  const cardsContainer = document.getElementById("cards");
  if (!cardsContainer) {
    console.error('Element with id "cards" not found.');
    return null; 
  }

  // Create a card element
  const card = document.createElement("div");
  card.classList.add("col-md-4");

  // Set the inner HTML of the card
  card.innerHTML = `
    <div class="card">
      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.price}</p>
      </div>
    </div>
  `;

  // Append the card to the "cards" container
  cardsContainer.appendChild(card);

  return card;
}



// Funktion zum Hinzufügen von Karten zur Webseite
function addCardsToPage(products) {
  const container = document.querySelector(".row");

  products.forEach(product => {
    const card = createCard(product);
    container.appendChild(card);
  });
}

// Füge die Karten basierend auf der Produktliste hinzu
document.addEventListener("DOMContentLoaded", function () {
  addCardsToPage(productList);
});

// Function to check if the shop is open
function isShopOpen() {
    // Get the current date and time
    const currentDate = new Date();

    // Check if it's Monday to Friday
    const isWeekday = currentDate.getDay() >= 1 && currentDate.getDay() <= 5; // 1 represents Monday, 5 represents Friday

    // Check if it's within the specified opening hours
    const isMorningOpen = (currentDate.getHours() === 9 && currentDate.getMinutes() >= 30 && currentDate.getMinutes() <= 45) ||
                          (currentDate.getHours() === 10 && currentDate.getMinutes() >= 20 && currentDate.getMinutes() <= 35);

    return isWeekday && isMorningOpen;
}

function updateShopStatus() {
    const shopStatusElement = document.getElementById('shop-status');

    if (isShopOpen()) {
        shopStatusElement.classList.remove('alert-danger'); // Remove red color
        shopStatusElement.classList.add('alert-success'); // Add green color
        shopStatusElement.innerHTML = 'Geöffnet: Wir sind jetzt für dich da!';
    } else {
        shopStatusElement.classList.remove('alert-success'); // Remove green color
        shopStatusElement.classList.add('alert-danger'); // Add red color
        shopStatusElement.innerHTML = 'Geschlossen: Wir haben gerade leider geschlossen.<br>' +
            'Schau doch in den großen Pausen von Montags bis Freitags bei uns vorbei!';
    }
}
updateShopStatus();
