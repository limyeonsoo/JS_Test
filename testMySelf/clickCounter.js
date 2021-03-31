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
        increase(){
            data.value++;
        }
    }
}