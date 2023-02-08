export default function renderScreen(screen,playersOn, game, requestAnimationFrame, jogadorID){

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
    
    
    requestAnimationFrame(() =>{

        renderScreen(screen,playersOn, game, requestAnimationFrame,jogadorID)
    })
}