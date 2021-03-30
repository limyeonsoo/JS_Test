<button onclick="counter++; countDisplay()">증가</button>
// 하나의 코드가 여러가지 역할을 함
// 단일책임의 원칙을 지켜주자!

var counter = 0;
// 전역변수는 전형적인 안티 패턴.

var el = document.getElementById('counter-display');
// element의 ID가 달라진다면 전혀 사용할 수 없는 el
// 개방-폐쇄 원칙을 지켜주자!

// 1. 코드를 UI에서 완전히 분리.  view 따로  controler model 따로
// 2. JS를 별도 파일로 분리. 재사용성 향상. 테스트성 향상.