$(document).ready()
{
    //let teste  = localStorage.getItem('db_usuarios');
    let main = document.querySelector('main');
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

    //
    usuarioCorrente.materias.forEach( (materia) => {
        let card = document.createElement('div');
        card.className = 'card text-center';
        
        let cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.innerText = materia.id;

        let cardBody = document.createElement('div');
        cardBody.className ='card-body';
        
        let cardBodyTitulo = document.createElement('h5');
        cardBodyTitulo.className = "card-title";
        cardBodyTitulo.innerText = materia.professor;

        let cardBodyTexto = document.createElement('p');
        cardBodyTexto.className = "card-text";
        cardBodyTexto.innerText = materia.disciplina;


        let cardBodyBotao = document.createElement('a');
        cardBodyBotao.className = 'btn btn-primary';
        cardBodyBotao.innerText = materia.valor;
        
        cardBody.appendChild(cardBodyTitulo);
        cardBody.appendChild(cardBodyTexto);
        cardBody.appendChild(cardBodyBotao);
        cardHeader.appendChild(cardBody);
        card.appendChild(cardHeader);

        main.appendChild(card);
    });

}