$(document).ready()
{
     
    
    let main = document.querySelector('main');
    
    
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

    window.onload = hideSearch();

    let logout = document.querySelector('#logout').addEventListener('click', logoutUser);
 
    let data_atual = new Date();

   

    usuarioCorrente.aulas_agendadas.forEach( (materia) => {
        console.log(materia);
        materia.data_aula.forEach( (data_materia) =>{
            data_materia = new Date(data_materia);
            if(data_atual < data_materia){
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
                cardTitle.id = 'nome';
                cardTitle.style.fontFamily = 'Capriola, sans-serif';
                cardTitle.innerText = materia.nome_professor;

                let textMuted1 = document.createElement('h6');
                textMuted1.className = 'text-muted card-subtitle mb-2';
                textMuted1.id = 'disciplina';
                textMuted1.style.fontFamily = 'Capriola, sans-serif'; 
                textMuted1.innerText = materia.disciplina;

                let textMuted2 = document.createElement('h6');                
                textMuted2.className = 'text-muted card-subtitle mb-2';
                textMuted2.id = 'data_hora';
                textMuted2.style.fontFamily = 'Capriola, sans-serif';
                textMuted2.innerText = data_materia.toISOString().slice(0,10) /* + '-' + materia.hora_aula*/;
                
                let cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.id = 'descricao';
                cardText.style.fontFamily = 'Capriola, sans-serif';
                cardText.innerText = 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.';

                let button = document.createElement('button');
                button.className = 'btn btn-primary';
                button.id = 'btn_cancelar';
                button.style.fontFamily = 'Capriola, sans-serif';
                button.type = 'button';
                button.innerText = 'Cancelar Agendamento';

                let button2 = document.createElement('button');
                button2.className = 'btn btn-primary';
                button2.id = 'btn_adiar';
                button2.style.fontFamily = 'Capriola, sans-serif';
                button2.style.marginLeft = '10px';
                button2.type = 'button';
                button2.innerText = 'Adiar';
        
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(textMuted1);
                cardBody.appendChild(textMuted2);
                cardBody.appendChild(cardText);
                cardBody.appendChild(button);
                cardBody.appendChild(button2);

                card.appendChild(cardBody);                

                cardDFlex.appendChild(card);               
        
                main.appendChild(cardDFlex);
            }

        });

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

    /**
     * Esconde a opção de pesquisar na barra de navegação 
     * caso o usuario logado seja um professor.
     */
    function hideSearch(){

        if(usuarioCorrente.tipo){
            document.getElementById ('nav_pesquisar').hidden = true;
        } else {
            document.getElementById ('nav_pesquisar').hidden = false;
        }
    }

}