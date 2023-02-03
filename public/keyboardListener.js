export default function createKeyboardListener(document){
    document.addEventListener('keydown', handleKeydown)

    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    function notifyAll(command){

        //console.log(`Notificando ${state.observers.length} observers`)

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