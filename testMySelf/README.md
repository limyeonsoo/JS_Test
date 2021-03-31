# JS_Test & TDD

[](https://github.com/limyeonsoo/JS_Test/testMySelf)

# Test가 필요한 이유

<문법 체크 과정이 없다. JavaScript>

- JavaScript는 빌드과정이 없다면 에러 확인이 정확하지 못하다.

    `console.log = 14`와 같은 것도 동작이 됨.

- 타입이 애매하다.

    ```jsx
    '1' + 11 = '11'
    '2' * 3  = 6
     1 + '2' + 3 * 4 = '1212'
    ```

# 단위 테스트 (Unit Test)

단위(Unit) : 

특정 조건에서 어떻게 작동해야 할지 정의한 것.
input 에 따른 output의 결과. ⇒ 함수라고도 할 수 있다.

준비 - 실행 - 단언 패턴.  === (arrange, act, assert)

# 테스트 주도 개발 (TDD)

Red - Green - Refactor 순환.

테스트하기 쉬운 코드.

관심사의 분리.

# Jasmine

JavaScript 테스트 도구.

1. 스탠드얼론(standalone)
2. 카르마(karma)

### 설치 방법

1. npm 패키지를 이용한 방법

    [jasmine/jasmine](https://github.com/jasmine/jasmine)

2. Jasmine Standalone

    [Releases · jasmine/jasmine](https://github.com/jasmine/jasmine/releases)

![JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled.png](JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled.png)

# 질이 좋지 못한 코드

```jsx
<button onclick="counter++; countDisplay()">증가</button>
// 하나의 코드가 여러가지 역할을 함
// 단일책임의 원칙을 지켜주자!

var counter = 0;
// 전역변수는 전형적인 안티 패턴.

var el = document.getElementById('counter-display');
// element의 ID가 달라진다면 전혀 사용할 수 없는 el
// 개방-폐쇄 원칙을 지켜주자!
```

< 개선 >

1. 코드를 UI에서 완전히 분리.  view 따로  controler model 따로
2. JS를 별도 파일로 분리. 재사용성 향상. 테스트성 향상.

# 모듈 패턴

함수로 데이터를 감추고, 모듈 API를 담고 있는 객체를 반환하는 형태

1. 임의 함수 호출하여 생성하는 모듈.
2. 즉시 실행 함수(IIFE) 기반의 모듈.

## 모듈 생성 원칙

1. **단일 책임 원칙**에 따라 모듈은 한 가지 역할만 한다.

    역할 집중은 모듈을 더욱 튼튼하게 만든다.

    ⇒ 테스트 하기도 쉽다.

2. 모듈 자신이 사용할 객체가 있다면 **의존성 주입 형태**로 제공한다.
또는 팩토리 주입형태로 제공

    ⇒ 테스트 하기도 쉽다.

### 임의 함수 호출하여 생성하는 모듈.

```jsx
var App = App || {}

App.Person = function (God) {
	var naem = God.makeName()

	Return {
		getName : function() {return name},
		setName : function(newName) {name = newName}
	}
}
```

- namespace 활용
- 의존성을 활용하여 함수를 작성.

### 즉시 실행 함수 기반의 모듈.

```jsx
var App = App || {}

App.Person = (function () {
	let name = ""

	return {
		getName(God){
			name = name || God.makeName()
			return name
		},
		setName(newName) { name = newName }
	}
})() // 함수 선언 즉시 실행.
```

- 싱글톤 패턴이 됨.

# ClickCounter 테스트 하기.

[](https://github.com/limyeonsoo/JS_Test/testMySelf)

![JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%201.png](JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%201.png)

![JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%202.png](JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%202.png)

![JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%203.png](JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%203.png)

**적색 (Red) → 녹색 (Green) → Refactoring 을 번갈아가면서 구현 진행.**

### < 이 단계에서 할 수 있는 것>

- 단순히 0을 반환하는 것이 아니라, value의 값을 반환해서 그 값이 toBe 되는지 확인 하는 것.

### 테스트 기본 꼴

```jsx
describe('설명', () => {
    it('설명', () => {
        // 준비
        

        // 실행

        // 단언
    })
})
```

### beforeEach

it 함수 호출 직전에 실행되는 자스민 함수.

→ 중복 코드를 it이 실행되기 전에 일괄 처리 할 수 있다.

```jsx
describe(() => {
		beforeEach(() => {   //   (1)
		afterEach(() => {    //   (3)
		it(() = {            //   (2)
});
```

# View에 대한 Test

- clickCounter는 객체를 만들어 parameter로 전달 받을 수 있다.
- 데이터를 출력할 DOM도 만들어서 전달 받을 수 있다.

⇒ 모듈 주입

하나의 기능 단위로 모듈을 분리 할 수 있다 : 단일 책임 원칙.

```jsx
beforeEach(() => {
    clickCounter = App.ClickCounter();
    updateEl = document.createElement('span');
    view = App.ClickCounterView(clickCounter, updateEl);
})
```

### → 의존성이 주입 되었는지에 대한 확인도 필요하다.

< Jasmine 프레임워크 >

`expect(function() {throw new Error()}).toThrowError()` : 에러를 던지는 함수로 에러 여부 확인 가능.

## increase() 가 실행 된 후, updateView()가 실행되는 로직은?

1. increase()
2. updateView()

2가지로 나눌 수 있다.

Test도 2가지로 나누어 주고, 각각이 실행되었는지 확인할 필요도 있다.

# 테스트 더블

단위 테스트 패턴으로, 테스트하기 곤란한 컴포넌트를 대체하여 테스트 하는 것.
특정한 동작을 흉내만 낼 뿐이지만, 테스트 하기에 적합.

- **더미(dummy)** : 인자를 채우기 위해 사용
- **스텁(sturb)** : 더미 개선 → 실제 동작 + return 값이 있는 것.
- **스파이(spy)**  : 스텁과 유사. 내부적으로 기록을 남기는 추가 기능.
- **페이크(fake)** : 스텁 개선 → 실제 코드. 운영에서는 사용할 수 없음.
스텁 : return 값 하드 코딩. vs 페이크 : 실제 코드.
- **목(mock)** :  더미, 스텁, 스파이를 혼합한 형태.

자스민에서는 테스트 더블을 스파이스(spies)라고 부른다.
spyOn(), createSpy() 함수 등 이 있음.

### spyOn(1 : 감지할 객체, 2 : 객체의 함수)

ex) bar() 함수가 MyApp.foo() 함수를 실행하는지 검증할 때.

1. MyApp이라는 감지할 객체와 MyApp.foo() 라는 함수를 spyOn()한다.

    `spyOn(MyApp, 'foo')`

2. bar()함수에 대한 처리를 해준다.

    `bar()`

3. spy하고 있는 함수가 실행되었는지 체크한다.

    `expect(MyApp.foo).toHaveBeenCalled()`

```jsx
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
```

![JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%204.png](JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%204.png)

# Click Event에 대한 Test

// 클릭 이벤트 핸들러를 바인딩할 돔 엘리먼트를 주입.

```jsx
beforeEach(() => {
    clickCounter = App.ClickCounter();
    updateEl = document.createElement('span');
    **triggerEl = document.createElement('button');**
    view = App.ClickCounterView(clickCounter, {updateEl, triggerEl});
})

it('Click Event 가 발생하면 increase and updateView 를 실행',()=>{
    // 준비 : 스파이 심기
    spyOn(view, 'increaseAndUpdateView');

    // click ??
    // 클릭 이벤트 핸들러를 바인딩할 돔 엘리먼트를 주입.
    triggerEl.click();

    // 단언
    expect(view.increaseAndUpdateView).toHaveBeenCalled();
})
```

# 기존 vs 개선

```jsx
<html>
    <body>
        <span id="counter-display"></span>
        <button onclick="counter++; countDisplay()">증가</button>
        <script>
            var counter = 0;
            var el = document.getElementById('counter-display');
            function countDisplay(){
                el.innerHTML = counter;
            };
        </script>
    </body>
</html>
```

```jsx
<html>
    <body>
        <span id="counter-display"></span>
        <button id="btn-increase">Increase</button>

        <script src="ClickCounter.js"></script>
        <script src="ClickCounterView.js"></script>

        <script>
            (() => {
                const clickCounter = App.ClickCounter();
                const updateEl = document.getElementById('counter-display');
                const triggerEl = document.getElementById('btn-increase');
                const view = App.ClickCounterView(clickCounter, {updateEl, triggerEl});
                view.updateView();
            })();
        </script>
    </body>
</html>
```

# 덧셈 뺄셈 +2덧셈

```jsx
<script>
    (() => {
        const data = { value : 0 };
        const counterDsc = App.ClickCounter(data).setCountFn(v => v - 1);
        const counterInc = App.ClickCounter(data).setCountFn(v => v + 1);
        
        const updateEl = document.getElementById('counter-display');

        const btnInc = document.getElementById('btn-increase');
        const btnDsc = document.getElementById('btn-decrease');

        const dscCounterView = App.ClickCounterView(counterDsc, {updateEl, triggerEl : btnDsc});
        const incCounterView = App.ClickCounterView(counterInc, {updateEl, triggerEl : btnInc});

        incCounterView.updateView(); //둘중 하나
    })();
</script>
```

![JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%205.png](JS_Test%20&%20TDD%2026d3301adf654c1fa8964ab7897f1d05/Untitled%205.png)

< clickCounter >

1. 데이터를 전달한다.

    감소 카운터 / 증가 카운터 모두 같은 데이터를 사용하기 위해 객체 형태로 전달해준다.

2. setCountFn(fn)을 이용하여 count() 함수를 오버라이딩 하여 data변화율을 재정의 해준다.
3. setCountFn에서 반환한 this에 체이닝 하여 재정의된 count()를 바로 실행한다.

```jsx
var App = App || {}

App.ClickCounter = (_data) => {
    if(!_data) throw Error('_data');
    
    const data = _data;

    // data 전달에 관해서...
    // 원시타입으로 전달할 경우 값복사  X
    // 객체타입으로 전달해야 레퍼런스 타입으로 전달 가능.  => const data  data.value  

    data.value = data.value || 0;

    return {
        getValue() {
            return data.value;
        },
        count(){
            data.value++;
        },

        setCountFn(fn){
            // this.count 오버라이딩
            this.count = () => (data.value = fn(data.value))
            // 함수 체이닝을 위한 this 반환.
            return this;
        }
    }
}
```