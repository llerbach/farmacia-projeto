// cria array que vai representar o banco de dados local
let banco = []


const getBanco = () => JSON.parse(localStorage.getItem('cadastroList')) || []
const setBanco = (banco) => localStorage.setItem('cadastroList', JSON.stringify(banco))

// cria item na listagem de requisitos (label, defini a class e cria input com botao)
const criarItem = (tarefa, indice) => {
    const item = document.createElement('label')
    item.classList.add('cadastroItem')
    item.innerHTML = `
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('cadastroList').appendChild(item)
}

//para evitar inserção duplicada na lista toda vez que chamamos a funcao atualizarTela() 
const limparTarefas = () => {
    const todoList = document.getElementById('cadastroList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice))
}

// inserção ao precionar tecla enter
const inserirItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value

    if (tecla === 'Enter') {
        const banco = getBanco()
        banco.push({ 'tarefa': texto, 'status': '' })
        setBanco(banco)
        atualizarTela()
        evento.target.value = ''
    }
}

//remove item por indice
const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    console.log(elemento.type)
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem(indice)
    }
}

document.getElementById('cadastronewItem').addEventListener('keypress', inserirItem)
document.getElementById('cadastroList').addEventListener('click', clickItem)

atualizarTela()