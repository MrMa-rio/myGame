export default function renderScreen(screen, game, requestAnimationFrame){

    
    const context = screen.getContext('2d')
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
    
    requestAnimationFrame(() =>{

        renderScreen(screen, game, requestAnimationFrame)
    })
    
}