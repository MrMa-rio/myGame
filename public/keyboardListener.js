export default function createKeyboardListener(document){
   
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('click', (result) => {
        handleKeydown(`Arrow${result.target.value}`)
    } )
    const state = {
        observers: [],
        jogadorID: null,
    }

    function registerJogadorID(jogadorID){

        state.jogadorID = jogadorID
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    function unsubscribe(observerFunction){
        observers = observers.filter(result => result !== observerFunction )
    }
    function notifyAll(command){

        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }
    function handleKeydown(event){
        
        const keyPress = event.key || event
        console.log(keyPress)
        const command = {
            type: 'move-jogador',
            jogadorID: state.jogadorID,
            keyPress,
        }
    
        notifyAll(command)
        
    }
    return{
        registerJogadorID,
        subscribe,
        unsubscribe,
    }

}