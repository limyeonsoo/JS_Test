describe('App.ClickCounter', () => {
    let counter;
    beforeEach(() => {
        const data = { value : 0 };
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
            counter.increase();

            // 단언
            expect(counter.getValue()).toBe(initialValue+1);
        })
    })

    // 기능 추가 
    it('데이터를 받지 못했을 때 에러', () => {
        const actual = () => (counter = App.ClickCounter());
        expect(actual).toThrowError();
    })
})