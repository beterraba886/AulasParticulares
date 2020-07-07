$(document).ready()
{
    let main = document.querySelector('main');

    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

    window.onload = hideSearch();

    let logout = document.querySelector('#logout').addEventListener('click', logoutUser);

    let data_atual = new Date();

    if (usuarioCorrente.aulas_agendadas.length == 0) {

        let cardDFlex = document.createElement('div');
        cardDFlex.className = 'd-flex justify-content-center';
        cardDFlex.style.backgroundColor = '#ffffff';
        cardDFlex.style.padding = '10px 10px';

        let card = document.createElement('div');
        card.className = 'card';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.id = 'descricao';
        cardText.style.fontFamily = 'Capriola, sans-serif';
        cardText.innerText = 'Vocẽ não tem agendamentos futuros.';

        cardBody.appendChild(cardText);

        card.appendChild(cardBody);

        cardDFlex.appendChild(card);

        main.appendChild(cardDFlex);

    } else {

        usuarioCorrente.aulas_agendadas.forEach((materia) => {

            var controle = 0;

                materia.data_aula = new Date(materia.data_aula);

                if (data_atual < materia.data_aula) {

                    controle++;                   

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
                    
                    if (usuarioCorrente.tipo){
                        cardTitle.innerText = materia.nome_aluno;
                    } else {
                        cardTitle.innerText = materia.nome_professor;
                    }

                    let textMuted1 = document.createElement('h6');
                    textMuted1.className = 'text-muted card-subtitle mb-2';
                    textMuted1.id = 'disciplina';
                    textMuted1.style.fontFamily = 'Capriola, sans-serif';
                    textMuted1.innerText = materia.disciplina;

                    let textMuted2 = document.createElement('h6');
                    textMuted2.className = 'text-muted card-subtitle mb-2';
                    textMuted2.id = 'data_hora';
                    textMuted2.style.fontFamily = 'Capriola, sans-serif';
                    textMuted2.innerText = materia.data_aula.toISOString().slice(0, 10)  + '    -   ' + materia.hora_aula;

                    let cardText = document.createElement('p');
                    cardText.className = 'card-text';
                    cardText.id = 'descricao';
                    cardText.style.fontFamily = 'Capriola, sans-serif';
                    cardText.innerText = 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.';

                    let button = document.createElement('button');
                    button.className = 'btn btn-primary';
                    button.id = `${materia.id_aula}`;
                    button.style.fontFamily = 'Capriola, sans-serif';
                    button.style.margin = '8px';
                    button.type = 'button';
                    button.innerText = 'Cancelar Agendamento';

                    button.addEventListener('click', function(){

                        let vet_usuarios = usuariosJSON.usuarios;
                        var i, j, z;

                        // procurar aluno e professor no db_usuarios vai percorrer todo o db log(n)
                        for(i = 0 ; i < vet_usuarios.length ; i++){
                            
                            let vet_aulas = vet_usuarios[i].aulas_agendadas;

                            for(j = 0 ; j < vet_aulas.length ; j++){

                                if(vet_aulas[j].id_aula == this.id){                                                                        
                                    vet_aulas.splice(j , 1);
                                }

                            }

                            vet_usuarios[i].aulas_agendadas = vet_aulas;
                        }

                        usuariosJSON.usuarios = vet_usuarios;

                        var stp = false;

                        // atualizar usuario corrente pior caso -> log(n)
                        for (z = 0 ; z < vet_usuarios.length && stp == false; z++){

                            if(usuarioCorrente.id_usuario == vet_usuarios[z].id_usuario){
                                usuarioCorrente.aulas_agendadas = vet_usuarios[z].aulas_agendadas;
                                stp = true;
                            }

                        }
                        
                        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
                        localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));                        
                        location.reload();
                        alert('AULA CANCELADA');

                    });

                    let button2 = document.createElement('button');
                    button2.className = 'btn btn-primary';
                    button2.id = 'btn_adiar';
                    button2.style.fontFamily = 'Capriola, sans-serif';
                    button2.style.margin = '8px';
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

            if (controle == 0) {

                let cardDFlex = document.createElement('div');
                cardDFlex.className = 'd-flex justify-content-center';
                cardDFlex.style.backgroundColor = '#ffffff';
                cardDFlex.style.padding = '10px 10px';

                let card = document.createElement('div');
                card.className = 'card';

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let cardText = document.createElement('p');
                cardText.className = 'card-text';
                cardText.id = 'descricao';
                cardText.style.fontFamily = 'Capriola, sans-serif';
                cardText.innerText = 'Vocẽ não tem agendamentos futuros.';

                cardBody.appendChild(cardText);

                card.appendChild(cardBody);

                cardDFlex.appendChild(card);

                main.appendChild(cardDFlex);
            }
        });
    }

    // Apaga os dados do usuário corrente no sessionStorage
    function logoutUser() {

        usuarioCorrente = {};
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        window.location = 'index.html';
    }

    // Função para data
    function addDays(date, days) {

        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    function cancelarAula(aula){ 
        //usuarioCorrente.aulas_agendadas
        
        
        for(i=0;i<aula,length;i++){
            //console.log(aula);

        }
    }

    /**
     * Esconde a opção de pesquisar na barra de navegação 
     * caso o usuario logado seja um professor.
     * @author Rayane Paiva Reginaldo
     */
    function hideSearch() {

        if (usuarioCorrente.tipo) {
            document.getElementById('nav_pesquisar').hidden = true;
        } else {
            document.getElementById('nav_pesquisar').hidden = false;
        }
    }

}