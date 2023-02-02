 import createKeyboardListener from "../Assets/keyboardListener.js"
 import createGame from "../Assets/game.js"
 import renderScreen from "../Assets/renderScreen.js"
 const screen = document.getElementById('screen')
 
const game = createGame()
const KeyboardListener = createKeyboardListener(document)

game.addJogador({jogadorID: 'jogador1', positionX: 2, positionY: 4})
game.addFruta({frutaID: 'fruita1', positionX: 5, positionY: 4})
KeyboardListener.subscribe(game.movePlayer)

renderScreen(screen, game, requestAnimationFrame)




