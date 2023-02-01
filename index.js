 const screen = document.getElementById('screen')
 const context = screen.getContext('2d')
 const currentJogador1 = 'jogador1' //temp

 
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
    
        const jogador = game.state.jogadores[command.jogadorID]
        
        const keyPress = command.keyPress

        if(keyPress === 'w' && jogador.y - 1 >= 0 || keyPress === 'ArrowUp' && jogador.y - 1 >= 0 ){
            jogador.y = jogador.y - 1
            return

        }
        if(keyPress === 'a' && jogador.x - 1 >= 0 || keyPress === 'ArrowLeft' && jogador.x - 1 >= 0 ){
            jogador.x = jogador.x - 1
            return
        }
        if(keyPress === "s" && jogador.y + 1 < screen.height || keyPress === "ArrowDown" && jogador.y + 1 < screen.height){
            jogador.y = jogador.y + 1
            return
        }
        if(keyPress === 'd' && jogador.x + 1 < screen.width || keyPress === "ArrowRight" && jogador.x + 1 < screen.width){
            jogador.x = jogador.x + 1
            return
        } 
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







 

