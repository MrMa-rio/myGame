const state = {
    jogadores: {
    'Mario':{x: 10, y: 15, points: 10},
    'Roberto':{x: 1, y: 5, points: 0},

    },
    frutas: {},
    screen: {
        width: 20,
        height: 20
    }
}
for(const nome in state.jogadores){
    console.log(state.jogadores[nome].points)
}







function teste(nome){
    const jogador = document.createElement('p')
    jogador.innerHTML = nome
    const secondScreen = document.getElementById('players')
    secondScreen.appendChild(jogador)
}




























