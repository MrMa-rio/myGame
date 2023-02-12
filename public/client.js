        import createKeyboardListener from "./keyboardListener.js"
        import createGame from "./game.js"
        import renderScreen from "./renderScreen.js"

        alert('Certifique do jogo estar rodando sem a tradução automática do Navegador!')
        

        function menu(){
            if(secondScreen.style.display == 'block'){
                 secondScreen.style.display = 'none'
            }
            else{

                secondScreen.style.display = 'block'
            }
               
        }
        
       
        const socket = io()
        const game = createGame()
        const input = document.querySelector('input.button_')
        const KeyboardListener = createKeyboardListener(document,input)
        const playersOn = document.getElementById('playersOn')
        const listPLayers = document.getElementById('players')
        
        const secondScreen = document.getElementById('secondScreen')
        const menuPlayer = document.getElementById('menuPlayer')
        const collect = document.getElementById('audio')
        const collect100 = document.getElementById('audio100')
        menuPlayer.addEventListener('click', menu)

        
        socket.on('connect', () => {
            const jogadorID = socket.id
            console.log(`Jogador conectado no Cliente com o ID:${jogadorID}`)
            const screen = document.getElementById('screen')
            
            

            socket.on('screen-point', (command) => {
                
                 console.log(command) //temp
                 for(const points in command){
                    for(const jogador in game.state.jogadores){
                        
                        if(command.point[jogador] && command.point[jogador].point % 10 == 0 ){
                            game.soundPoint(collect100)
                        }
                    
                        game.soundPoint(collect)
                        
                        
                    }
                 }
             })
            
            renderScreen(screen,playersOn,listPLayers, game, requestAnimationFrame, jogadorID)
            socket.on('disconnect', () => {

                KeyboardListener.unsubscribe(game.movePlayer);
                
                
            })
        })
        socket.on('estado', (state) => {

            const jogadorID = socket.id
            game.setState(state)
            console.log(state)
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