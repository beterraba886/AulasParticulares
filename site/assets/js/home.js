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
            if(addDays(data_atual, -7) < data_materia &&  data_atual > data_materia){
                
                let card = document.createElement('div');
                card.className = 'd-flex justify-content-center';                
                card.style.backgroundColor = '#ffffff';
                card.style.padding = '10px 10px';

                let cardBox1 = document.createElement('div');
                cardBox1.className = 'card';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let headerTitle = document.createElement('h4');
                headerTitle.className = 'card-title';
                headerTitle.innerText = materia.id;

                let headerSubTitle1 = document.createElement('h6');
                headerSubTitle1.className = 'text-muted card-subtitle mb-2';

                let headerSubTitle2 = document.createElement('h6');
                headerSubTitle2.className = 'text-muted card-subtitle mb-2';
                
                let paragraph = document.createElement('p');
                paragraph.className = 'card-text';
                paragraph.innerText = 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.';

                let button = document.createElement('button');
                button.className = 'btn btn-primary';
                button.type = 'button';                
        
                cardBody.appendChild(headerTitle);
                cardBody.appendChild(headerSubTitle1);
                cardBody.appendChild(headerSubTitle2);

                cardBox1.appendChild(cardBody);                

                card.appendChild(cardBox1);
        
                main.appendChild(card);
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