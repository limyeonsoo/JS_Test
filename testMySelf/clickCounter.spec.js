describe('App.ClickCounter', () => {
    let counter;
    const data = { value : 0 };

    beforeEach(() => {
        counter = App.ClickCounter(data);
    })
    describe('getValue()', () => {
        it('초기값이 0인 카운터 값을 반환한다', () => {
            expect(counter.getValue()).toBe(0);
        })
    })

    describe('increase()', () => {
        it('카운터를 1 올린다', () => {
            // 준비
            // ... beforeEach로 생략.
            // 실행
            const initialValue = counter.getValue();
            counter.count();

            // 단언
            expect(counter.getValue()).toBe(initialValue+1);
        })
    })

    // 기능 추가 
    it('데이터를 받지 못했을 때 에러', () => {
        const actual = () => (counter = App.ClickCounter());
        expect(actual).toThrowError();
    })

    //기능 추가  increase 를 count()로 바꾸고, +2  -1 기능을 추가한다.
    it('인자로 함수를 넘기면 count()를 대체 한다.', ()=>{
        const add2 = value => value+2;
        const expected = add2(data.value);

        counter.setCountFn(add2).count(); //체이닝
        const actual = counter.getValue();

        expect(actual).toBe(expected);
    })
})