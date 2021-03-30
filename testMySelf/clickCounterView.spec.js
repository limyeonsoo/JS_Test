describe('App.ClickCountView', () => {
    let clickCounter, updateEl, view;
    beforeEach(() => {
        clickCounter = App.ClickCounter();
        updateEl = document.createElement('span');
        view = App.ClickCounterView(clickCounter, updateEl);
    })

    it('clickCounter가 주입 되었는지 확인한다', () => {
        const clickCounter = null;
        const updateEl = document.createElement('span');
        const actual = () => App.ClickCounterView(clickCounter, updateEl)
        expect(actual).toThrowError();
    })

    it('updateEl이 주입 되었는지 확인한다', () => {

    })

    describe('update View', () => {
        it('ClickCounter의 getValue() 값을 출력', () => {
            const counterValue = clickCounter.getValue();
            view.updateView();
            expect(updateEl.innerHTML).toBe(counterValue.toString());
        })
    })
})