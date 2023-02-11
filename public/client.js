        import createKeyboardListener from "./keyboardListener.js"
        import createGame from "./game.js"
        import renderScreen from "./renderScreen.js"

        alert('Certifique do jogo estar rodando sem a tradução automática do google!')

        
       
        const socket = io()
        const game = createGame()
        const KeyboardListener = createKeyboardListener(document)
        const playersOn = document.getElementById('playersOn')
        const listPLayers = document.getElementById('players')
        
        
        socket.on('connect', () => {
            const jogadorID = socket.id
            console.log(`Jogador conectado no Cliente com o ID:${jogadorID}`)
            const screen = document.getElementById('screen')
            

            socket.on('screen-point', (command) => {

                 console.log(command) //temp
                 
             })
            
            

            renderScreen(screen,playersOn,listPLayers, game, requestAnimationFrame, jogadorID)
            socket.on('disconnect', () => {

                KeyboardListener.unsubscribe(game.movePlayer);
                
                
            })
        })
        socket.on('estado', (state) => {

            const jogadorID = socket.id
            game.setState(state)
            socket.on('point', (result) => console.log(result))
            KeyboardListener.registerJogadorID(jogadorID)
            KeyboardListener.subscribe(game.movePlayer)
            KeyboardListener.subscribe((command) =>{
                socket.emit('move-jogador', command)

            })
            
        })
        
        socket.on('add-Jogador', (command) => {

            game.addJogador(command)
            
        })
        socket.on('remove-Jogador', (command) =>{
        
            game.removeJogador(command) //remove o jogador 
            
        })

        socket.on('move-jogador', (command) => {

            console.log(`Recebendo  ${command.type} -> ${command.jogadorID}`) //temp
            const jogadorID = socket.id
            if(jogadorID !== command.jogadorID){ // Verificação para que o jogador não receba a propria notificação
                game.movePlayer(command)
            }
        })

        socket.on('add-fruta', (command) => {

            game.addFruta(command)

        })
        socket.on('remove-fruta', (command) =>{

            game.removeFruta(command)
        })
        
        
        
        //TEMP todos que tiverem 'TEMP', poderao ou nao ser apagados!!