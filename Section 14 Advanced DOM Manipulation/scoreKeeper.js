const p1Btn = document.querySelectorAll("button")[0];
const p2Btn = document.querySelectorAll("button")[1];
const rst = document.querySelectorAll("button")[2];
const input = document.querySelector("input");
const p = document.querySelector("p");
let p1spn = document.querySelectorAll("span")[0];
let p2spn = document.querySelectorAll("span")[1];
let p1Scr = 0;
let p2Scr = 0;
let wnscr = input.value;


//add point when clicked on
p1Btn.addEventListener("click", () => {
  p1Scr++, (p1spn.textContent = p1Scr), check(p1Scr, p1spn);
});

p2Btn.addEventListener("click", () => {
  p2Scr++, (p2spn.textContent = p2Scr), check(p2Scr, p2spn);
});


//if score is equal to winningscore, finish game
function check(scr, spn) {
  if (scr == wnscr) {
    p1Btn.disabled = true;
    p2Btn.disabled = true;
    spn.style.background = "green";
  }
}

//start over, reset all the values, etc.
function reset() {
  p1Scr = 0;
  p2Scr = 0;
  p1spn.textContent = 0;
  p2spn.textContent = 0;
  console.log("reset");
  p1spn.style = "none";
  p2spn.style = "none";
  p1Btn.disabled = false;
  p2Btn.disabled = false;
}

//change winning score
function newScr() {
  p.textContent = p.textContent.substring(0, 12) + input.value;
  wnscr = input.value;
}

rst.addEventListener("click", reset);
input.addEventListener("change", () => {
  newScr();
  reset();
});

