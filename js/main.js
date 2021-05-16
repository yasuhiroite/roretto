'use strict';

{
  const form = document.querySelector('form');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reload = document.getElementById('reload');
  const result = document.getElementById('result');
  const three = document.getElementById('three');
  const input = document.querySelector('input[type="text"]');

  class Post {
    constructor(text) {

      const li = document.createElement('li');

      const p = document.createElement('p');
      p.textContent = text;

      const span = document.createElement('span');
      span.classList.add('material-icons');
      span.textContent = 'close';
      span.addEventListener('click',() => {
        document.querySelector('.container > ul').removeChild(li);
      });

      li.appendChild(p);
      li.appendChild(span);
      document.querySelector('.container > ul').appendChild(li);

    }
  }

  form.addEventListener('submit',(e) => {
    e.preventDefault();
    let text = input.value;
    if(text === '' || !text.match(/\S/g)) {
      return;
    }
    new Post(text);
    input.value = '';
  });

  let timeoutId;

  start.addEventListener('click',() => {
    let candidates = document.querySelectorAll('.container > ul > li > p');
    let box = [];
    candidates.forEach(candidate => {
      box.push(candidate.textContent);
    });

    function roretto() {
      result.textContent = box[Math.floor(Math.random() * box.length)];

      timeoutId = setTimeout(() => {
        roretto();
      },50);
    };

    roretto();
  });

/* ストップボタンを押したときの処理 */
  stop.addEventListener('click',() => { /* ストップボタン処理 */ 
    clearTimeout(timeoutId);
  });

/* リロードボタンを押したときの処理 */
  reload.addEventListener('click',() => {
    location.reload();
  });

  three.addEventListener('click',() => {
    let lis = document.querySelectorAll('.container > ul > li');
    document.querySelector('.container > ul').innerHTML = '';
    let Lies = [];
    let threeLies = [];
    lis.forEach(li => {
      Lies.push(li);
    });
    for(let i = 0 ; i < 3 ; i++) {
      threeLies.push(Lies.splice(Math.floor(Math.random() * Lies.length),1)[0]);
    };

    threeLies.forEach(li => {
      document.querySelector('.container > ul').appendChild(li);
    });
  });
}