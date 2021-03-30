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