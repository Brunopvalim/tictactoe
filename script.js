let matrix = {
    a1: "", a2: "", a3: "",
    b1: "", b2: "", b3: "",
    c1: "", c2: "", c3: ""
}

let turn = "";
let warning = "";
let playing = false;



// Functions
const itemClick = e =>{
    let item = e.target.getAttribute('data-item');
    if(playing && matrix[item] === ''){
        matrix[item] = turn;
        renderMatrix();
        togglePlayer();
    }
}

const reset = ()=>{
    warning = '';

    let random = Math.floor(Math.random()*2);
    turn = (random === 0) ? 'x' : 'o';

    for (let i in matrix) {
        matrix[i] = '';
    }

    playing = true;

    renderMatrix();
    renderInfo();

}

const renderMatrix = ()=> {
    for (let i in matrix) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = matrix[i];
    }

    checkGame();
}

const renderInfo = ()=> {
    document.querySelector('.turn').innerHTML = turn;
    document.querySelector('.result').innerHTML = warning;
}

const togglePlayer = () => {
    turn = (turn === 'x') ? 'o' : 'x';
    renderInfo();
}

const checkGame = () =>{
    if(checkWinnerFor('x')){
        warning = 'X Wins!';
        playing = false

    }else if(checkWinnerFor('o')){
        warning = 'O Wins!';
        playing = false;

    }else if(isFull()){
        warning = 'DRAW!'
        playing = false;
    }
}

const checkWinnerFor = (player) => {
    let win = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];
    for(let w in win){
        let pArray = win[w].split(','); // a1, a2, a3
        let hasWon = pArray.every(option => matrix[option] === player);
        if(hasWon) {
            return true;
        }
    }
    return false;
}

const isFull = () =>{
    for(let i in matrix){
        if(matrix[i] === '')
            return false;
    }
    return true;
}

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item=>{
    item.addEventListener('click', itemClick);
});

reset();