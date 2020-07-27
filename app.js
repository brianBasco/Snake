let grid = document.getElementById("grid");

for (let index = 0; index < 100; index++) {
    grid.appendChild(document.createElement("div"));
}

document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
    //to start, and restart the game
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 1000
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake')) 

      // intervalle de temps pendant lequel on teste les collisions, crocage de pomme  etc...
      // pendant ce temps le joueur n'a pas la main sur les commandes
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    //function that deals with ALL the ove outcomes of the Snake
    // le joueur n'a pas la main sur les déplacements pendant cette fonction donc :
    // si snake est au niveau des cases du bord ou de son corps, ça veut dire qu'au prochain mouvement
    // il va percuter les bords ou lui-même
    function moveOutcomes() {
  
      //deals with snake hitting border and snake hitting self
      // Les cases vont de 0 à 99
      // Le plateau est une ligne de 100 cases, 10 cases par côté
      // Pour aller à droite : +1
      // pour aller à gauche : -1
      // pour aller au-dessus : -10 (10cases avant représente la case de la ligne au-dessus)
      // pour aller en-dessous : +10 (10cases après représente la case de la ligne en-dessous)
      // échec si touche les bords :
        
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
      ) {
        return clearInterval(interval) //this will clear the interval if any of the above happen
      }
  
      // snake avance, donc on "enlève" la queue (la case ne doit plus être dessinée).
      const tail = currentSnake.pop() //removes last ite of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      // unshift : insère des valeurs en début de tableau et retourne la nouvelle longueur du tab
      // ici, le snake avance en dessinant la case suivante où est la tête du snake
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
  
      //deals with snake getting apple
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        // snake croque la pomme, on peut lui remettre la queue ( sa longueur passe à +1 )
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        // intervalle de temps réduit de 10% ( x0.9 )
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
  
    //generate new apple once apple is eaten
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
      squares[appleIndex].classList.add('apple')
    }
  
  
    //assign functions to keycodes
    // up : remonte à la ligne d'au-dessus, soit 10 cases avant
    // down : descend à la ligne d'en dessous, soit 10 cases après
    // left : case d'avant, soit -1
    // right : case d'après, soit +1
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 37) {
        direction = -1 // if we press left, the snake will go left one div
      } else if (e.keyCode === 40) {
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })