$(document).ready()
{

    let teste  = localStorage.getItem('db_usuarios');
    let main = document.querySelector('main');
    usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    //console.log(usuarioCorrente);
    usuarioCorrente.materias.forEach( () => {
        let card = document.createElement('div');
        card.className = 'card text-center';

        let cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.innerText = usuarioCorrente.materias.id;

        let cardBody = document.createElement('div');
        cardBody = className ='card-body';
        
        let cardBodyTitulo = document.createElement('h5');
        cardBodyTitulo.className = "card-title";
        cardBodyTitulo.innerText = usuarioCorrente.materias.professor;

        let cardBodyTexto = document.createElement('p');
        cardBodyTexto.className = "card-text";
        cardBodyTexto.innerText = usuarioCorrente.materias.disciplina;


        let cardBodyBotao = document.createElement('a');
        cardBodyBotao.className = 'btn btn-primary';
        cardBodyBotao.innerText = usuarioCorrente.materias.valor;

        console.log('card: ' + typeof(card));
        console.log('cardHeader: ' + typeof(cardHeader));
        console.log('cardBody: ' + typeof(cardBody));
        
        //cardBody.appendChild(cardBodyTitulo);
        //cardBody.appendChild(cardBodyTexto);
        //cardBody.appendChild(cardBodyBotao);
        //cardHeader.appendChild(cardBody);
        //card.appendChild(cardHeader);

        //main.appendChild(card);
    });


/*
    // Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
    function loginUser (login, senha, tipo) {
        
        // Verifica todos os itens do banco de dados de usuarios 
        // para localizar o usuário informado no formulario de login
        for (var i = 0; i < db_usuarios.usuarios.length; i++) {
            var usuario = db_usuarios.usuarios[i];
            
            // Se encontrou login, carrega usuário corrente e salva no Session Storage
            if (login == usuario.login && senha == usuario.senha && tipo == usuario.tipo) {
                usuarioCorrente.id = usuario.id;
                usuarioCorrente.login = usuario.login;
                usuarioCorrente.email = usuario.email;
                usuarioCorrente.nome = usuario.nome;
                usuarioCorrente.tipo = usuario.tipo;
                
                // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
                sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

                // Retorna true para usuário encontrado
                return true;
            }
        }

        // Se chegou até aqui é por que não encontrou o usuário e retorna falso
        return false;
    }

*/


}