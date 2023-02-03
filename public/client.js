        import createKeyboardListener from "./keyboardListener.js"
        import createGame from "./game.js"
        import renderScreen from "./renderScreen.js"


        const screen = document.getElementById('screen')
        
        const game = createGame()
        const KeyboardListener = createKeyboardListener(document)
        game.addJogador({jogadorID: 'jogador1', positionX: 2, positionY: 4})
        game.addJogador({jogadorID: 'jogador2', positionX: 6, positionY: 4})
        game.addFruta({frutaID: 'frutinha1', positionX: 7, positionY: 4})
        KeyboardListener.subscribe(game.movePlayer)

        renderScreen(screen, game, requestAnimationFrame)
