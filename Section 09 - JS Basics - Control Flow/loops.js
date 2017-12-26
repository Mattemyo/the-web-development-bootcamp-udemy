//print numbers between -10 and 19
let num = -10;
while (num<=19) {
    console.log(num);
    num++;
}
//even numbers 10 - 40
num = 10;
while (num<=40) {
    console.log(num);
    num+=2;
}
//all odd 300 - 333
num = 301;
while (num<=333) {
    console.log(num);
    num+=2;
}
//divisible by 5 and 3, 5 -50
num = 3;
while (num<=50) {
    if(num%5 === 0 && num%3 === 0){
        console.log(num);
    }
    num+=1;
}