        import createKeyboardListener from "./keyboardListener.js"
        import createGame from "./game.js"
        import renderScreen from "./renderScreen.js"


        
        const socket = io()
        const game = createGame()
        const KeyboardListener = createKeyboardListener(document)
        


        socket.on('connect', () => {
            const jogadorID = socket.id

            console.log(`Jogaodr conectado no Cliente com o ID:${jogadorID}`)

            const screen = document.getElementById('screen')
            renderScreen(screen, game, requestAnimationFrame)
        })

        socket.on('estado', (state) => {
            console.log('Recebendo novas informações...')
            const jogadorID = socket.id
            game.setState(state)
            KeyboardListener.registerJogadorID(jogadorID)
            KeyboardListener.subscribe(game.movePlayer)
            KeyboardListener.subscribe((command) =>{
                socket.emit('move-jogador', command)

            })
            
        })
        socket.on('add-Jogador', (command) => {

            //console.log(`Recebendo ${command.type} -> ${jogadorID}`)
            game.addJogador(command)
        })
        socket.on('remove-Jogador', (command) =>{

            game.removeJogador(command)
        })

        socket.on('move-jogador', (command) => {

            console.log(`Recebendo  ${command.type} -> ${command.jogadorID}`)

            const jogadorID = socket.id

            if(jogadorID !== command.jogadorID){
                game.movePlayer(command)
            }
            
        })

        socket.on('add-fruta', (command) => {

            console.log('teste')
            game.addFruta(command)
        })
        socket.on('remove-fruta', (command) =>{

            console.log('removendooo')
            game.removeFruta(command)
        })