const secretNumber = 4;

let guess = Number(prompt('Guess a number between 0 and 10'));

if (guess === secretNumber){
    alert('yayyy');
} else if(guess > secretNumber){
    alert('too high');
}else{
    alert('too low');
}