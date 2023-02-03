export default function createGame(){

    const state = {
    jogadores: {},
    frutas: {},
    screen: {
        width: 20,
        height: 20
    }
    }
    const observers = []

    function subscribe(observerFunction){
        observers.push(observerFunction)
    }

    function notifyAll(command){

        for(const observerFunction of observers){
            observerFunction(command)
        }
    }
    
    
    function setState(newState){
        Object.assign(state, newState)
    }
    function addJogador(command){

        const jogadorID = command.jogadorID
        const positionX = 'positionX' in command ? command.positionX : Math.floor(Math.random() * state.screen.width)
        const positionY = 'positionY' in command ? command.positionY : Math.floor(Math.random() * state.screen.height)

        state.jogadores[jogadorID] = {
            x: positionX,
            y: positionY,
        }
        
        notifyAll({
            type: 'add-Jogador',
            jogadorID: jogadorID,
            positionX: positionX,
            positionY: positionY
        })

    }

    function addFruta(command){

        const frutaID = command.frutaID
        const positionX = command.positionX
        const positionY = command.positionY

        state.frutas[frutaID] = {
            x: positionX,
            y: positionY,
        }
    }

    function removeJogador(command){

        const jogadorID = command.jogadorID
        delete state.jogadores[jogadorID]

        notifyAll({
            type: 'remove-Jogador',
            jogadorID: jogadorID
        })
    }

    function removeFruta(command){

        const frutaID = command.frutaID
        delete state.frutas[frutaID]
    }

    function movePlayer(command){

        //console.log(`movendo o ${command.jogadorID} com a tecla ${command.keyPress}`)
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
                    if(jogador.y + 1 < state.screen.height){
                        jogador.y = jogador.y + 1
                    }
                },
                s(jogador){

                    console.log(`${jogador} movendo para baixo`)
                    if(jogador.y + 1 < state.screen.height){
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
                    if(jogador.x + 1 < state.screen.width){
                        jogador.x = jogador.x + 1
                    }
                },
                d(jogador){

                    console.log(`${jogador} movendo para direita`)
                    if(jogador.x + 1 < state.screen.width){
                        jogador.x = jogador.x + 1
                    }
                },
            }
        const jogador = state.jogadores[command.jogadorID]
        const jogadorID = command.jogadorID
        const keyPress = command.keyPress
        const moveFunction = acceptMoves[keyPress]
        if(jogador && moveFunction){
            moveFunction(jogador)
            checkForFruitCollision(jogadorID)
        }
        
        
    }

    function checkForFruitCollision(jogadorID){

        
        const jogador = state.jogadores[jogadorID]

        for(const frutaID in state.frutas){
            const fruta = state.frutas[frutaID]
            
            console.log(`Checando ${jogadorID} e ${frutaID}`)

            if(jogador.x === fruta.x && jogador.y === fruta.y){
                console.log(`Colisao entre ${jogadorID} e ${frutaID}`)
                removeFruta({frutaID: frutaID})
            }
        }

        


    }
    
    return{
        addJogador,
        checkForFruitCollision,
        removeJogador,
        setState,
        addFruta,
        removeFruta,
        movePlayer,
        state,
        subscribe,
        
    }
}