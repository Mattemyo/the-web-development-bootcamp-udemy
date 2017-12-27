let newArr = [];
function printReverse(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}

function isUniform(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[0] !== arr[i]) {
      return false;
    }
  }
  return true;
}

function sumArray(arr) {
  return arr.reduce((a, b) => {
    return a + b;
  });
}

function max(arr) {
  return arr.sort().reverse()[0];
}

//own forEach

function myForEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    func(element);
  }
}
const colors = ['yellow', 'blue', 'green'];
myForEach(colors, function(color){
    console.log(color);
});

Array.prototype.myForEach = function(func){
    for(let i = 0; i < this.length; i++){
        func(this[i]);
    }
}


