import './style.css';

const add = document.querySelector('.add');
const ref = document.querySelector('.ref');
const username = document.querySelector('#username');
const sc = document.querySelector('#score');
const list = document.querySelector('.scores');

const getData = async () => {
  const retData = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/iTrISlBXlaWu8ZH27F8E/scores/');
  const res = (await retData).json();
  return res;
};

const feedList = async () => {
  const fillBoard = await getData();
  list.innerHTML = '';
  fillBoard.result.forEach((item) => {
    if (typeof item.user !== 'object') {
      const li = list.appendChild(document.createElement('li'));
      li.classList.add('list-item');
      li.innerHTML = `${item.user} - ${item.score}`;
    }
  });
};

const putData = async (e) => {
  e.preventDefault();
  const uname = username.value.trim();
  const points = Number(sc.value.trim());
  if (uname && points) {
    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/iTrISlBXlaWu8ZH27F8E/scores', {
      method: 'POST',
      body: JSON.stringify({
        user: uname,
        score: points,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    feedList();
  } else {
    feedList();
  }
  username.value = '';
  sc.value = '';
};

ref.onclick = feedList;
add.onclick = putData;