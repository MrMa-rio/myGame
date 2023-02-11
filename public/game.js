export default function createGame(){

    const state = {
        jogadores: {},
        frutas: {},
        screen: {
            width: 20,
            height: 20
        }
    }
    let observers = []
    const point = {
            jogadorID: {},
        }
    
  
    function start(){
        setInterval(addFruta, 2500)
    }
    function soundPoint(audio){
        audio.play()
    }
    function points(pointPlayer,jogadorID){
        pointPlayer.point = pointPlayer.point + 1
        
        point.jogadorID[jogadorID] = {
            point: pointPlayer.point
        }
        notifyAll({
            type: 'screen-point',
            point:point.jogadorID,
        
        })
    }
    
    function subscribe(observerFunction){
        observers.push(observerFunction)
    }
    function unsubscribe(observerFunction){
        observers = observers.filter(result => result !== observerFunction )
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
        const points = 'points' in command ? command.point : 0
        state.jogadores[jogadorID] = {
            x: positionX,
            y: positionY,
            point: points,
        
        }
        
        notifyAll({
            type: 'add-Jogador',
            jogadorID: jogadorID,
            positionX: positionX,
            positionY: positionY,
            point: 0
        })
    }

    function addFruta(command){
        if(Object.keys(state.frutas).length < 2){
            const frutaID = command ? command.frutaID : Math.floor(Math.random() * 10000000)
            const positionX = command ? command.positionX : Math.floor(Math.random() * state.screen.width)
            const positionY = command ? command.positionY : Math.floor(Math.random() * state.screen.height)

            state.frutas[frutaID] = {
            x: positionX,
            y: positionY,
        }
        notifyAll({ 
            type: 'add-fruta',
            frutaID: frutaID,
            positionX: positionX,
            positionY: positionY
        })
        }
        

        

        

    }

    function removeJogador(command){

        const jogadorID = command.jogadorID
        delete state.jogadores[jogadorID]

        notifyAll({type: 'remove-Jogador', jogadorID: jogadorID})
        
    }

    function removeFruta(command){

        const frutaID = command.frutaID
        delete state.frutas[frutaID]

        notifyAll({ type:'remove-fruta', frutaID:frutaID})
    }

    function movePlayer(command){
        notifyAll(command)
        
        const acceptMoves = {
                ArrowUp(jogador){
                    
                  //  console.log(`${jogador} movendo para cima`)
                    if(jogador.y > 0){
                        jogador.y = jogador.y - 1
                    }
                },
                w(jogador){

                   // console.log(`${jogador} movendo para cima`)
                    if(jogador.y > 0){
                        jogador.y = jogador.y - 1
                    }
                },
                ArrowDown(jogador){

                   // console.log(`${jogador} movendo para baixo`)
                    if(jogador.y + 1 < state.screen.height){
                        jogador.y = jogador.y + 1
                    }
                },
                s(jogador){

                   // console.log(`${jogador} movendo para baixo`)
                    if(jogador.y + 1 < state.screen.height){
                        jogador.y = jogador.y + 1
                    }
                },
                ArrowLeft(jogador){

                    //console.log(`${jogador} movendo para esquerda`)
                    if(jogador.x > 0){
                        jogador.x = jogador.x - 1
                    }
                },
                a(jogador){

                    //console.log(`${jogador} movendo para esquerda`)
                    if(jogador.x > 0){
                        jogador.x = jogador.x - 1
                    }
                },
                ArrowRight(jogador){

                  //  console.log(`${jogador} movendo para direita`)
                    if(jogador.x + 1 < state.screen.width){
                        jogador.x = jogador.x + 1
                    }
                },
                d(jogador){

                 //  console.log(`${jogador} movendo para direita`)
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

        const jogador_ = state.jogadores[jogadorID]
        for(const frutaID in state.frutas){
            const fruta = state.frutas[frutaID]
            
            if(jogador_.x === fruta.x && jogador_.y === fruta.y){
                console.log(`Colisao entre ${jogadorID} e ${frutaID}`) //temp
                //soundPoint()
                removeFruta({frutaID: frutaID})
                points(state.jogadores[jogadorID],jogadorID)
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
        point,
        subscribe,
        start,
        unsubscribe,
        soundPoint,

    }
}