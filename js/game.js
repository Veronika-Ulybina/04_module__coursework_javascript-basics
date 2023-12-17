'use strict';

(() => {
  const getRandomIntInclusive = (max, min = 1) => {
    min = Math.min(min, max);
    max = Math.max(min, max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const game = (language) => {
    let lang;
    try {
      lang = Intl.DisplayNames(['en'], {
        type: language}).of(language).slice(0, 2).toLowerCase();
    } catch (err) {
      lang = 'ru';
    }

    const result = {
      player: 5,
      bot: 5,
    };

    const languages = {
      ru: {
        figures: {
          'paper': 'камень',
          'rock': 'ножницы',
          'scissors': 'бумага',
        },
        isGoOut: 'Вы точно хотите покинуть игру?',
        isContinue: 'Сыграем еще разок?',
        result: 'Результат',
        bot: 'Бот',
        you: 'Вы',
        draw: 'Ничья',
        youWon: 'Вы выйграли',
        botWon: 'Бот выйграл',
        yourTurn: 'Ваш ход! Введите число от 1 до',
        botGuessedRight: 'Бот угадал',
        botDidnotGuessCorrectly: 'Бот не угадал',
        youGuessedWrong: 'Вы не угадали',
        right: 'Правильно',
        isEven: 'Число чётное?',
        isOdd: 'Число нечётное?',
        botMove: 'Ход бота!',
      },
      en: {
        figures: {
          'rock': 'scissors',
          'scissors': 'paper',
          'paper': 'rock',
        },
        isGoOut: 'Are you sure you want to leave the game?',
        isContinue: 'Shall we play again?',
        result: 'Result',
        bot: 'Bot',
        you: 'You',
        draw: 'Draw',
        youWon: 'You won',
        botWon: 'Bot won',
        yourTurn: 'Your turn! Enter a number from 1 to',
        botGuessedRight: 'Bot guessed right',
        botDidnotGuessCorrectly: 'Bot did not guess correctly',
        youGuessedWrong: 'You guessed wrong',
        right: 'Right',
        isEven: 'Is the number even?',
        isOdd: 'Is the number odd?',
        botMove: 'Bot move!',
      },
    };

    const figuresArray = Object.values(languages[lang].figures);

    const indexOfFirstElem = figuresArray.indexOf(
        figuresArray[0]);

    const indexOfLastElem = figuresArray.indexOf(
        figuresArray[figuresArray.length - 1]);

    return function start() {
      const bot = figuresArray[getRandomIntInclusive(
          indexOfLastElem, indexOfFirstElem)];

      let playerNum = prompt(figuresArray.join(', '));

      let resOfGame;

      if (playerNum === '') {
        return start();
      }

      if (playerNum === null) {
        const isGoOut = confirm(languages[lang].isGoOut);

        if (isGoOut) {
          return;
        } else {
          return start();
        }
      }

      playerNum = figuresArray.find(item =>
        item.startsWith(playerNum.toLowerCase()));

      if (!playerNum) {
        return start();
      }

      const isWinner = (x, y) => {
        if (x === y) {
          resOfGame = languages[lang].draw;
          alert(`
        ${languages[lang].bot}: ${bot}
        ${languages[lang].you}: ${playerNum}
        ${resOfGame}`);
          return start();
        }

        if (languages[lang].figures[x] === y) {
          resOfGame = languages[lang].youWon;
          alert(`
          ${languages[lang].bot}: ${bot}
          ${languages[lang].you}: ${playerNum}
            ${resOfGame}`);
          start2();
        } else {
          resOfGame = languages[lang].botWon;
          alert(`
          ${languages[lang].bot}: ${bot}
          ${languages[lang].you}: ${playerNum}
            ${resOfGame}`);
          start3();
        }
      };

      isWinner(playerNum, bot);

      /**
      * @return {void}
      */
      function start2() {
        let playerNum = prompt(`${languages[lang].yourTurn} ${result.player}`);

        if (playerNum === null) {
          const isGoOut = confirm(languages[lang].isGoOut);

          if (isGoOut) {
            return;
          } else {
            return start2();
          }
        }

        playerNum = Number.parseInt(playerNum);

        if (playerNum < 1 || playerNum > result.player ||
          Number.isNaN(playerNum)) {
          return start2();
        }

        const bot = Math.round(Math.random());
        bot ? alert(`${languages[lang].bot}: ${languages[lang].isOdd}`) :
          alert(`${languages[lang].bot}: ${languages[lang].isEven}`);

        if (playerNum % 2 === bot) {
          result.bot += playerNum;
          result.player -= playerNum;

          if (result.player <= 0) {
            alert(languages[lang].botWon);
            const isContinue = confirm(languages[lang].isContinue);
            if (isContinue) {
              result.player = 5;
              result.bot = 5;
              return start();
            } return;
          }

          alert(`
          ${languages[lang].botGuessedRight}
            ${languages[lang].you}: ${result.player}
            ${languages[lang].bot}: ${result.bot}`);
        } else {
          result.player += playerNum;
          result.bot -= playerNum;

          if (result.bot <= 0) {
            alert(languages[lang].youWon);
            const isContinue = confirm(languages[lang].isContinue);
            if (isContinue) {
              result.player = 5;
              result.bot = 5;
              return start();
            } return;
          }

          alert(`
          ${languages[lang].botDidnotGuessCorrectly}
            ${languages[lang].you}: ${result.player}
            ${languages[lang].bot}: ${result.bot}`);
        }

        start3();
      }

      /**
      * @return {void}
      */
      function start3() {
        const botNum = getRandomIntInclusive(result.bot);

        const isEven = confirm(
            `${languages[lang].botMove} ${languages[lang].isEven}`);

        if (botNum % 2 === +isEven) {
          result.bot += botNum;
          result.player -= botNum;

          if (result.player <= 0) {
            alert(languages[lang].botWon);
            const isContinue = confirm(languages[lang].isContinue);
            if (isContinue) {
              result.player = 5;
              result.bot = 5;
              return start();
            } return;
          }

          alert(`
          ${languages[lang].youGuessedWrong}
          ${languages[lang].you}: ${result.player}
          ${languages[lang].bot}: ${result.bot}`);
        } else {
          result.player += botNum;
          result.bot -= botNum;

          if (result.bot <= 0) {
            alert(languages[lang].youWon);
            const isContinue = confirm(languages[lang].isContinue);
            if (isContinue) {
              result.player = 5;
              result.bot = 5;
              return start();
            } return;
          }

          alert(`
          ${languages[lang].right}
          ${languages[lang].you}: ${result.player}
          ${languages[lang].bot}: ${result.bot}`);
        }

        start2();
      }
    };
  };

  window.marbles = game;
})();
