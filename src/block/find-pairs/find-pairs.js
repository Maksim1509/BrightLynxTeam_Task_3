const wrap = document.querySelector('.wrap');
const field = document.querySelectorAll('.field');

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const colors = ['red', 'blue', 'black', 'yellow', 'green', 'violet', 'aqua', 'orange'];

const shuffle = (numPool) => {
  for (let j, x, i = numPool.length; i; j = parseInt(Math.random() * i),
  x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
  return numPool;
};
const randomResult = shuffle(arr);

const startGame = () => {
  for (let i = 0; i < colors.length; i += 1) {
    field[randomResult[0]].classList.add(colors[i]);
    randomResult.splice(0, 1);
    field[randomResult[0]].classList.add(colors[i]);
    randomResult.splice(0, 1);
  }
};

const game = () => {
  let step = 0;
  let firstColor;
  let secondColor;
  let firstCell;
  let secondCell;

  wrap.addEventListener('click', (event) => {
    step += 1;
    if (step % 2 === 0) {
      secondCell = event.target;
      secondCell.classList.remove('transparent');
      secondColor = getComputedStyle(secondCell).backgroundColor;
      if (firstColor !== secondColor) {
        setTimeout(() => firstCell.classList.add('transparent'), 500);
        setTimeout(() => secondCell.classList.add('transparent'), 500);
      }
    } else {
      firstCell = event.target;
      firstCell.classList.remove('transparent');
      firstColor = getComputedStyle(firstCell).backgroundColor;
    }
  });
};
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
    alert(`GAME OVER \n Ваш результат: 0${min} : ${sec - 2}`)
    document.querySelector('.find-pairs__timer').innerHTML = '00 : 00';
    sec = 0;
    min = 0;
    return;
  }
  setTimeout(timer, 1000);
};

const startBtn = document.querySelector('.find-pairs__button');
startBtn.addEventListener('click', () => {
  Array.from(field).map(elem => elem.classList.add('transparent'));
  
  timer();
  startGame();
  game();
});
