const faker = require("faker");

function faking() {
  for (var i = 0; i < 10; i++) {
    console.log(
      faker.commerce.productName() + " costs $" + faker.commerce.price()
    );
  }
}

faking();
