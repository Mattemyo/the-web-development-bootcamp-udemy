const div = document.querySelector("div");
const button = document.querySelector("button");

div.style.background = "blue";
div.style.height = "200px";
div.style.width = "200px";
button.style.margin = "35%";

button.addEventListener(
  "click",
  () =>
    div.style.background === "orange"
      ? (div.style.background = "blue")
      : (div.style.background = "orange")
);

//alternative

button.addEventListener(
  "click",
  () =>
    this.classList('class').toggle();
);
