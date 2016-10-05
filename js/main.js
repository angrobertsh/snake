const View = require('./snake-view');
let highscores = JSON.parse(localStorage.getItem('snake'));

$( () => {
  let view = new View($('.snake'));
  renderScores();
  $(document).keypress((e) => handleKeyEvent(e, view));
  $('.reset').on('click', function() {
    gameOver(view);
    view = new View($('.snake'));
    renderScores();
  });
});

function renderScores() {
  $('.scoreboard').html("");
  var sortable = [];
  for (var name in highscores) {
    sortable.push([name, highscores[name]]);
  }
  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  sortable.forEach(score => {
    $('.scoreboard').append(`<div class="personal-score">${score[0]}:  ${score[1]}</div>`);
  });
}


function gameOver(view) {
  view.quit();
  $('.snake').html("");
  let name = prompt("Enter Your Name", "");
  if (highscores) {
    let score = highscores[name];
    if (typeof score !== 'undefined') {
      if (view.score > score) {
        highscores[name] = view.score;
      }
    } else {
      highscores[name] = view.score;
    }
  } else {
    highscores = {};
    highscores[name] = view.score;
  }
  localStorage.setItem('snake', JSON.stringify(highscores));
  renderScores();
}

function pauseGame(view) {
  if (view.isPaused) {
    view.resume();
  } else {
    view.quit();
  }
}

function handleKeyEvent(event, view) {
  if (event.keyCode === 32) {
    pauseGame(view);
  }
}
