describe('App.ClickCountView', () => {
    let clickCounter, updateEl, triggerEl, view;
    beforeEach(() => {
        clickCounter = App.ClickCounter();
        updateEl = document.createElement('span');
        triggerEl = document.createElement('button');
        view = App.ClickCounterView(clickCounter, {updateEl, triggerEl});
    })

    it('clickCounter가 주입 되었는지 확인한다', () => {
        const actual = () => App.ClickCounterView(null, {updateEl});
        expect(actual).toThrowError();
    })

    it('updateEl이 주입 되었는지 확인한다', () => {
        const actual = () => App.ClickCounterView(clickCounter, {triggerEl});
        expect(actual).toThrowError();
    })

    it('triggerEl이 주입 되었는지 확인한다', () => {
        const actual = () => App.ClickCounterView(clickCounter, {updateEl});
        expect(actual).toThrowError();
    })

    

    describe('update View', () => {
        it('ClickCounter의 getValue() 값을 출력', () => {
            const counterValue = clickCounter.getValue();
            view.updateView();
            expect(updateEl.innerHTML).toBe(counterValue.toString());
        })
    })

    describe('increase 실행 후 updateView를 실행하는 2가지 동작', () => {
        // 테스트 더블 사용.
        // 사용 이유 실행이 되었는지 확인할 필요가 있음.
        it('increase 실행', () => {
            spyOn(clickCounter, 'increase')
            view.increaseAndUpdateView()
            expect(clickCounter.increase).toHaveBeenCalled()
        });
        it('upateView 실행', () => {
            spyOn(view, 'updateView')
            view.increaseAndUpdateView()
            expect(view.updateView).toHaveBeenCalled();
        })
    })

    //Click Event 가 발생하면 increase and updateView 를 실행.
    it('Click Event 가 발생하면 increase and updateView 를 실행',()=>{
        // 준비 : 스파이 심기
        spyOn(view, 'increaseAndUpdateView');

        // click ??
        // 클릭 이벤트 핸들러를 바인딩할 돔 엘리먼트를 주입.
        triggerEl.click();

        // 단언
        expect(view.increaseAndUpdateView).toHaveBeenCalled();
    })
})