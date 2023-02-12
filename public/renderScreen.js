export default function renderScreen(screen,playersOn,listPLayers, game, requestAnimationFrame, jogadorID){

    const context = screen.getContext('2d')
    const color = document.getElementById('icolor')
    context.clearRect(0,0,60,60)

    playersOn.innerHTML = `Jogadores Online: ${Object.keys(game.state.jogadores).length}`
    
    for(const indexJogador in game.state.jogadores){
        
        if(indexJogador == jogadorID){
            const jogador = game.state.jogadores[indexJogador]
            context.fillStyle = `${color.value}`
            context.fillRect(jogador.x,jogador.y,1,1)
        }
        else{
            const jogador = game.state.jogadores[indexJogador]
            context.fillStyle = '#c1c0ff'
            context.fillRect(jogador.x,jogador.y,1,1)
        }
    }
    for(const indexFruta in game.state.frutas){
        
        const fruta = game.state.frutas[indexFruta]
        context.fillStyle = '#FDD000'
        context.fillRect(fruta.x,fruta.y,1,1)
    }
    listPLayers.replaceChildren()

    for(const jogador in game.state.jogadores){
                    
        
        const listPoint = document.createElement('p')
         if(jogador == jogadorID){
                listPoint.style.color = '#FDD000'
            }
        if(game.point.jogadorID[jogador]){

            listPoint.innerHTML =`<strong>ID:</strong> ${jogador} <strong> POINTS: ${game.point.jogadorID[jogador].point} </strong><br>`
           
            
        }
        //else if()
        else{
            listPoint.innerHTML = `<strong>ID:</strong> ${jogador} <strong> POINTS: ${game.state.jogadores[jogador].point} </strong><br>`
        }
        listPLayers.appendChild(listPoint)
        
        
    }
    
    requestAnimationFrame(() =>{

        renderScreen(screen,playersOn,listPLayers, game, requestAnimationFrame,jogadorID)
        
    })
}