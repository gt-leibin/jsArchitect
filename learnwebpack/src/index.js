import es6defdault, {es6name} from './es6';
console.log('es6name',es6name);
es6defdault();

const btn =  document.getElementById('btnimport');
btn.addEventListener('click', e => {
    import('./btnimport').then(res => {
        console.log('btnimport res', res)
    })
});