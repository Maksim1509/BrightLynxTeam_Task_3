import { timeout } from "q";

const wrap = document.querySelector('.wrap');
const field = document.querySelectorAll('.field');

const numPool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const colors = ['red', 'blue', 'black', 'yellow', 'green', 'violet', 'aqua', 'orange'];

const shuffle = (numPool) => {
  for (let j, x, i = numPool.length; i; j = parseInt(Math.random() * i),
  x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
  return numPool;
};
const randomResult = shuffle(numPool);
const startGame = () => {
  for (let i = 0; i < colors.length; i += 1) {
    field[randomResult[0]].classList.add(colors[i]);
    randomResult.splice(0, 1);
    field[randomResult[0]].classList.add(colors[i]);
    randomResult.splice(0, 1);
  }
};
startGame();

const game = () => {
  let color;
  let step = 0;
  let firstColor;
  let secondColor;

  wrap.addEventListener('click', (event) => {
    step += 1;
    if (step % 2 === 0) {
      secondColor = event.target;
      secondColor.classList.remove('transparent');
      if (color !== getComputedStyle(secondColor).backgroundColor) {
        setTimeout(() => firstColor.classList.add('transparent'), 200);
        setTimeout(() => secondColor.classList.add('transparent'), 200);
      }
    } else {
      firstColor = event.target;
      firstColor.classList.remove('transparent');
      color = getComputedStyle(firstColor).backgroundColor;
    }
    return timeout;
  });
};
game();

// timer
let sec = 0;
let min = 0;
const timer = () => {
  if (sec < 10) {
    document.querySelector('.find-pairs__timer').innerHTML = `0${min} : 0${sec}`;
  } else {
    document.querySelector('.find-pairs__timer').innerHTML = `0${min} : ${sec}`;
  }
  sec += 1;
  if (sec === 59) {
    sec = 0;
    min += 1;
  }
  const transp = document.querySelectorAll('.transparent');
  if (transp.length === 0) {
    alert(`GAME OVER \n Ваш результат: 0${min} : ${sec}`)
    return;
  }
  setTimeout(timer, 1000);
};

const startBtn = document.querySelector('.find-pairs__button');
startBtn.addEventListener('click', timer);
