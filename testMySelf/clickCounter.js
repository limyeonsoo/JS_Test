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