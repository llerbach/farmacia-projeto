function entrar() {
    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#usserLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgError = document.querySelector('#msgError')
    let listaUser = []

    let userValid = {
        nome: '',
        user: '',
        senha: ''
    }

    listaUser = JSON.parse(localStorage.getItem('listaUser'));

    listaUser.forEach((item) => {
        if (usuario.value == item.userCad && senha.value == item.senhaCad) {
            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad
            }
        }
    });

    if (usuario.value == userValid.user && senha.value == userValid.senha) {
        window.location.href = 'cadastroexames.html'

        /* token para garantir a segurança, n precisa ter*/

        let token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)


    } else {
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'usuario ou senha incorretos'
        usuario.focus()
    }

}

/* ver sobre os usuarios que ja tinham no banco 
de dados dele e ver dps se ele vai fazer no proximo video*/