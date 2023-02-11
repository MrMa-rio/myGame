export default function renderScreen(screen,playersOn,listPLayers, game, requestAnimationFrame, jogadorID){

    const context = screen.getContext('2d')
    
    
    context.clearRect(0,0,20,20)

    playersOn.innerHTML = `Jogadores Online: ${Object.keys(game.state.jogadores).length}`
    
    
    for(const indexJogador in game.state.jogadores){
        
        if(indexJogador == jogadorID){
            const jogador = game.state.jogadores[indexJogador]
            context.fillStyle = `#abcde0`
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
        context.fillStyle = '#356343'
        context.fillRect(fruta.x,fruta.y,1,1)
    }
    listPLayers.replaceChildren()

    for(const jogador in game.state.jogadores){
                    
        
        const listPoint = document.createElement('p')
        if(game.point.jogadorID[jogador]){

             listPoint.innerHTML =`<strong>ID:</strong> ${jogador} <strong> POINTS: ${game.point.jogadorID[jogador].point} </strong><br>`
            
        }
        //else if()
        else{
            listPoint.innerHTML = `<strong>ID:</strong> ${jogador} <strong> POINTS: 0 </strong><br>`
        }
        listPLayers.appendChild(listPoint)
        
        
    }
    
    requestAnimationFrame(() =>{

        renderScreen(screen,playersOn,listPLayers, game, requestAnimationFrame,jogadorID)
        
    })
}