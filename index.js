const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');


const getRandomPanel = () => {
  const panels = [
    topLeft,
    topRight, 
    bottomLeft,
    bottomRight
  ];
  return panels[parseInt(Math.random() * panels.length)];
};

const sequence = [ getRandomPanel()];

let sequencToGuess = [...sequence];

const flash = (panel) => {
  return new Promise(( resolve, reject) => {
    panel.className += ' active';
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' active',
        ''
      );
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000);
  });
}

let canClick = false;

const panelClicked = panelClicked => {
  if(!canClick) return;
  const expectedPanel = sequencToGuess.shift();
  if(expectedPanel === panelClicked){
    if(sequencToGuess.length === 0) {
     
      sequence.push(getRandomPanel());
      sequencToGuess = [...sequence];
    
      startFlashing();
    
    }
  } else {

    alert('Game Over. Please Try Again.')
  }
};

const startFlashing = async () => {
  canClick = false;
  for(const panel of sequence){
    await flash(panel);
  }
  canClick = true;
};

startFlashing();