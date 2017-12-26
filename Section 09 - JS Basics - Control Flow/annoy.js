let ans = prompt("are we there yet?");

while (!ans.includes("yes") && !ans.includes("yeah")) {
  ans = prompt("are we there yet?");
}

alert('yay, finally');
