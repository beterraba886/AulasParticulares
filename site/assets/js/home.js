$(document).ready()
{
    //let teste  = localStorage.getItem('db_usuarios');
    let main = document.querySelector('main');
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    let logout = document.querySelector('#logout').addEventListener('click', logoutUser);
    let data_atual = new Date();

    //

   
    usuarioCorrente.materias.forEach( (materia) => {

        materia.data.forEach( (data_materia) =>{

            data_materia = new Date(data_materia);

            if((addDays(data_atual, -7) < data_materia) && (data_atual > data_materia)){
                
                let cardDFlex = document.createElement('div');
                cardDFlex.className = 'd-flex justify-content-center';                
                cardDFlex.style.backgroundColor = '#ffffff';
                cardDFlex.style.padding = '10px 10px';

                let card = document.createElement('div');
                card.className = 'card';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let cardTitle = document.createElement('h4');
                cardTitle.className = 'card-title';
                cardTitle.style.fontFamily = 'Capriola, sans-serif';
                cardTitle.innerText = 'Matemática';

                let textMuted1 = document.createElement('h6');
                textMuted1.className = 'text-muted card-subtitle mb-2';
                textMuted1.style.fontFamily = 'Capriola, sans-serif'; 
                textMuted1.innerText = 'Professor João';

                let textMuted2 = document.createElement('h6');                
                textMuted2.className = 'text-muted card-subtitle mb-2';
                textMuted2.style.fontFamily = 'Capriola, sans-serif';
                textMuted2.innerText = 'Dia: 00/00/2020 - Hora: 00:00';
                
                let cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.style.fontFamily = 'Capriola, sans-serif';
                cardText.innerText = 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.';

                let button = document.createElement('button');
                button.className = 'btn btn-primary';
                cardText.style.fontFamily = 'Capriola, sans-serif';
                button.type = 'button';
                button.innerText = 'Cancelar Agendamento';
        
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(textMuted1);
                cardBody.appendChild(textMuted2);
                cardBody.appendChild(cardText);
                cardBody.appendChild(button);

                card.appendChild(cardBody);                

                cardDFlex.appendChild(card);                
        
                main.appendChild(cardDFlex);
            }

        });


        /*
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
        cardBodyBotao.href = `materia.html?materia_id=${materia.id}`;        

        cardBody.appendChild(cardBodyTitulo);
        cardBody.appendChild(cardBodyTexto);
        cardBody.appendChild(cardBodyBotao);
        cardHeader.appendChild(cardBody);
        card.appendChild(cardHeader);

        main.appendChild(card);
        */
        ;
    });

    // Apaga os dados do usuário corrente no sessionStorage
        function logoutUser () {
            usuarioCorrente = {};
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
            window.location = 'index.html';
        }

    // Função para data
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
}