var App = App || {}

App.ClickCounterView = (clickCounter, option) => {
    // option : {updateEl, triggerEl};
    if(!clickCounter) throw Error('clickCounter');
    if(!option.updateEl) throw Error('updateEl');
    //if(!option.triggerEl) throw Error('triggerEl');
    
    const res = {
        updateView(){
            option.updateEl.innerHTML = clickCounter.getValue();
        },
        countAndUpdateView(){
            clickCounter.count();
            this.updateView();
        }
    }

    option.triggerEl.addEventListener('click', () => {
        res.countAndUpdateView();
    })
    
    return res
}