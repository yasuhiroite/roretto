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
  
  // !! クラスの処理 !!  完成済
  
  class Post {
    constructor(text) { // 共通の処理、引数textはユーザーの入力値

      function check() {
        if(document.querySelectorAll('.container > ul > li').length >= 4) {
          three.classList.add('show');
        } else {
          three.classList.remove('show');
        }
      }

      // 定義たち
      const li = document.createElement('li');
      const p = document.createElement('p');
      const span = document.createElement('span');
      // 定義たち終了
      
      p.textContent = text; // p要素を作成し、テキストをtextに

      // マテリアルアイコンを使うため、クラスを設定する
      span.classList.add('material-icons');

      // マテリアルアイコンを使うため、テキストをcloseとする
      span.textContent = 'close';

      // closeが押されたときの処理
      span.addEventListener('click',() => {

        // そのli要素を削除する
        document.querySelector('.container > ul').removeChild(li);
        check();
      });

      // li要素を作成し、pタグ(候補)とspanタグ(削除用)を子要素にする
      li.appendChild(p);
      li.appendChild(span);

      // li要素を.container内のulの子要素とする
      document.querySelector('.container > ul').appendChild(li);
      check();
    }
  }

// !! クラスの処理終了 !!


// !! フォームの処理 !!  完成済

  form.addEventListener('submit',(e) => {
    e.preventDefault(); // ページ遷移を無くす
    let text = input.value; // 入力値を変数に入れる

    // 入力値が空文字や空白のみのとき追加できないようにする
    if(text === '' || !text.match(/\S/g)) {
      return;
    }
    new Post(text); // 入力値を引数にし、クラスを作成する
    input.value = ''; // 次の入力がしやすいように入力値をリセット
  });

// !! フォームの処理終了 !!


// !! スタートが押されたときの処理 !!

// スタートを押したらヘッダー、ストップボタン、フッター以外の要素は不要になるので消す。

  start.addEventListener('click',() => {

    // 候補(ul内のli内のp要素)を全て取り出して、配列に入れる
    let candidates = document.querySelectorAll('.container > ul > li > p');

    // 候補が1つ以下の場合、スタートできないようにする処理
    // 「候補を2個以上追加して下さい」的な文言を入れるかどうか
    if(candidates.length <= 1) {
      return;
    }
    // 取り出した全てのテキストを入れる配列の定義(変数)
    let box = [];

    // 配列(candidates)に入っているp要素のテキストをそれぞれ配列(box)に入れる処理
    candidates.forEach(candidate => {
      box.push(candidate.textContent);
    });

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

// !! スタートが押されたときの処理終了 !!


// !! ストップが押されたときの処理 !!

  stop.addEventListener('click',() => {
    clearTimeout(timeoutId);

    start.classList.remove('show');
    stop.classList.remove('show');
    reload.classList.add('show');
    result.classList.add('show');

  });

// !! ストップが押されたときの処理終了 !!

three.addEventListener('click',() => {
  three.classList.remove('show');
});


// !! リロードが押されたときの処理 !! 完成済

/* リロードボタンを押したときの処理 */
  reload.addEventListener('click',() => {
    location.reload();
  });

// !! リロードが押されたときの処理終了 !!


// 3択ボタンを押したら、デフォルトの状態から候補を３つ追加した状態と同じにすればよい
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