'use strict';

{
  const form = document.querySelector('form');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reload = document.getElementById('reload');
  const result = document.getElementById('result');
  const three = document.getElementById('three');
  const input = document.querySelector('input[type="text"]');
  let timeoutId;
  const defaultContainer = document.querySelector('.default');

  class Post {
    constructor(text) { 

      function check() {
        if(document.querySelectorAll('.container > ul > li').length >= 4) {
          three.classList.add('show');
        } else {
          three.classList.remove('show');
        }
      }

      const li = document.createElement('li');
      const p = document.createElement('p');
      const span = document.createElement('span');
      
      p.textContent = text; 

      span.classList.add('material-icons');
      span.textContent = 'close';

      span.addEventListener('click',() => {
        document.querySelector('.container > ul').removeChild(li);
        check();
      });

      li.appendChild(p);
      li.appendChild(span);

      document.querySelector('.container > ul').appendChild(li);
      check();
    }
  }




  form.addEventListener('submit',(e) => {
    e.preventDefault(); 
    let text = input.value; 

    if(text === '' || !text.match(/\S/g)) {
      return;
    }
    new Post(text); 
    input.value = ''; // 次の入力がしやすいように空文字
  });

// スタート時は、ヘッダー・フッター・ストップのみあればよい
  start.addEventListener('click',() => {

    let candidates = document.querySelectorAll('.container > ul > li > p');

    // 候補が1つ以下の場合、スタートできないようにする処理
    // 「候補を2個以上追加して下さい」的な文言を入れるかどうか
    if(candidates.length <= 1) {
      return;
    }
    let box = [];

    candidates.forEach(candidate => {
      box.push(candidate.textContent);
    });

    defaultContainer.classList.add('hide');
    start.classList.add('hide');
    stop.classList.add('show');
    three.classList.remove('show');
    result.classList.add('show');

    let p = document.querySelector('#result > p');

    function roretto() {
      p.textContent = box[Math.floor(Math.random() * box.length)];

      timeoutId = setTimeout(() => {
        roretto();
      },50);
    };

    roretto();
  });

  stop.addEventListener('click',() => {
    clearTimeout(timeoutId);

    start.classList.remove('show');
    stop.classList.remove('show');
    reload.classList.add('show');
    result.classList.add('show');

  });

// ページが更新されるので、特に表示を入れ替える必要はない
  reload.addEventListener('click',() => {
    location.reload();
  });

// 3択ボタンを押したら、デフォルトの状態から候補を３つ追加した状態と同じにすればよい
  three.addEventListener('click',() => {
    three.classList.remove('show');
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