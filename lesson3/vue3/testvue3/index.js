import {reactive} from './reactivity';
const state = reactive({name: 'ddd', age: 1});

console.log(state.name);
console.log(state.age);

