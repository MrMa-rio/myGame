export default function createKeyboardListener(document){
    document.addEventListener('keydown', handleKeydown)

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
    function notifyAll(command){

        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }
    function handleKeydown(event){

        const keyPress = event.key
    
        const command = {
            jogadorID: state.jogadorID,
            keyPress,
        }
    
        notifyAll(command)
        
    }
    return{
        registerJogadorID,
        subscribe
    }

}