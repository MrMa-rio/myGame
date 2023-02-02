 const screen = document.getElementById('screen')
 const context = screen.getContext('2d')
 

 
const game = createGame()
const KeyboardListener = createKeyboardListener()
KeyboardListener.subscribe(game.movePlayer)
renderScreen()

function createKeyboardListener(){
    document.addEventListener('keydown', handleKeydown)

    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    function notifyAll(command){

        console.log(`Notificando ${state.observers.length} observers`)

        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }
    function handleKeydown(event){

        const keyPress = event.key
    
        const command = {
            jogadorID: 'jogador1',
            keyPress,
        }
    
        notifyAll(command)
        
    }
    return{
        subscribe
    }

}
function createGame(){

    const state = {
    jogadores: {
        'jogador1':{x:1,y:1},
        'jogador2':{x:9,y:9}
    },
    frutas: {
        'fruta1':{x:3,y:1}
    }
 }

    function movePlayer(command){

        console.log(`movendo o ${command.jogadorID} com a tecla ${command.keyPress}`)
        const acceptMoves = {
                ArrowUp(jogador){
                    
                    console.log(`${jogador} movendo para cima`)
                    if(jogador.y > 0){
                        jogador.y = jogador.y - 1
                    }
                    
                    
                },
                w(jogador){

                    console.log(`${jogador} movendo para cima`)
                    if(jogador.y > 0){
                        jogador.y = jogador.y - 1
                    }
                },
                ArrowDown(jogador){

                    console.log(`${jogador} movendo para baixo`)
                    if(jogador.y + 1 < screen.height){
                        jogador.y = jogador.y + 1
                    }
                },
                s(jogador){

                    console.log(`${jogador} movendo para baixo`)
                    if(jogador.y + 1 < screen.height){
                        jogador.y = jogador.y + 1
                    }
                },
                ArrowLeft(jogador){

                    console.log(`${jogador} movendo para esquerda`)
                    if(jogador.x > 0){
                        jogador.x = jogador.x - 1
                    }
                },
                a(jogador){

                    console.log(`${jogador} movendo para esquerda`)
                    if(jogador.x > 0){
                        jogador.x = jogador.x - 1
                    }
                },
                ArrowRight(jogador){

                    console.log(`${jogador} movendo para direita`)
                    if(jogador.x + 1 < screen.width){
                        jogador.x = jogador.x + 1
                    }
                },
                d(jogador){

                    console.log(`${jogador} movendo para direita`)
                    if(jogador.x + 1 < screen.width){
                        jogador.x = jogador.x + 1
                    }
                },
            }
        const jogador = game.state.jogadores[command.jogadorID]
        const keyPress = command.keyPress
        const moveFunction = acceptMoves[keyPress]
        if(moveFunction){
            moveFunction(jogador)
        }
        
        return
    }

    return{
        movePlayer,
        state,
        
    }
}
function renderScreen(){
    context.fillStyle = '#fff'
    context.clearRect(0,0,20,20)
    
    for(const indexJogador in game.state.jogadores){

        const jogador = game.state.jogadores[indexJogador]
        context.fillStyle = '#000'
        context.fillRect(jogador.x,jogador.y,1,1)
    
    }
    for(const indexFruta in game.state.frutas){
        
        const fruta = game.state.frutas[indexFruta]
        context.fillStyle = 'green'
        context.fillRect(fruta.x,fruta.y,1,1)
    }
    
    requestAnimationFrame(renderScreen)
    
}
