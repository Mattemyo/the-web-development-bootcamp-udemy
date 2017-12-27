//generate random color

const randomColor = () => {
  return `rgb(
    ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)})`;
};

//dom elements
const squares = [...document.querySelectorAll(".square")];
const colorDisplay = document.querySelector("#colorDisplay");
const h1 = document.querySelector("h1");
const messageDisplay = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
const modeButtons = [...document.querySelectorAll(".mode")];
let numberSquares = 6;
console.log(modeButtons);
let pickedColor;
let colors = [];

init();
function init() {
    //mode buttons
  modeButtons.forEach(el => {
    el.addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      el.classList.add("selected");
      if (el.textContent === "Easy") {
        numberSquares = 3;
        for (let i = 3; i < 6; i++) {
          const element = squares[i];
          element.style.display = "none";
        }
      } else {
        numberSquares = 6;
        squares.forEach(square => (square.style.display = "block"));
      }
      getColors(numberSquares);

      reset();
    });
  });

  
}

function reset() {
  //generate new colors  pick new colors change color of squares
  getColors(numberSquares);
  h1.style.background = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
}

//reset button
resetButton.addEventListener("click", function() {
  reset();
});

function getColors(num) {
  //pick random square
  let pickedSquare = squares[Math.floor(Math.random() * (num - 1))];

  squares.forEach(el => {
    //random color for each square
    el.style.background = randomColor();
    pickedColor = pickedSquare.style.background;

    el.addEventListener("click", () => {
      let clickedColor = el.style.background;
      //check if clicked color is correct
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        el.style.background = "#232323";
        messageDisplay.textContent = "Try Again!";
      }
    });
    //display all
  });

  //change value of display
  colorDisplay.textContent = pickedSquare.style.background.toUpperCase();
}

//run on window.load
window.load = getColors(6);
//chage color when correct
function changeColors(color) {
  squares.forEach(el => (el.style.background = color));
}
