var App = App || {}

App.ClickCounterView = (clickCounter, updateEl) => {
    if(!clickCounter) throw Error('clickCounter');
    
    return{
        updateView(){
            updateEl.innerHTML = clickCounter.getValue();
        }
    }
}