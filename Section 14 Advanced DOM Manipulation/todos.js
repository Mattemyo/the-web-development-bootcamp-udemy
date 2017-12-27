const lis = [...document.querySelectorAll("li")];

lis.forEach(el => {
  el.addEventListener("mouseover", () => {
    el.classList.add("selected");
  });

  el.addEventListener("mouseout", () => {
    el.classList.remove("selected");
  });

  el.addEventListener("click", () => {
    el.classList.toggle("done");
  });
});


//count tables

document.querySelectorAll('tr').length - document.querySelectorAll('table').length;
