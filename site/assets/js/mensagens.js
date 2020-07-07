$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    let logout = document.querySelector('#logout').addEventListener('click', logoutUser);

    function logoutUser() {

        usuarioCorrente = {};
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        window.location = 'index.html';
    }

    var vet_nomes = [];

    if(usuarioCorrente.tipo == false){

        for(i = 0 ; i < usuarioCorrente.aulas_agendadas.length ; i++){
            
            if(vet_nomes.indexOf(usuarioCorrente.aulas_agendadas[i].nome_professor) == -1){
                vet_nomes.push(usuarioCorrente.aulas_agendadas[i].nome_professor);
            }
        }

    } else {

        for(i = 0 ; i < usuarioCorrente.aulas_agendadas.length ; i++){

            if(vet_nomes.indexOf(usuarioCorrente.aulas_agendadas[i].nome_aluno) == -1){
                vet_nomes.push(usuarioCorrente.aulas_agendadas[i].nome_aluno);
            }
        }        
    }

    var texto = '<option value="" selected="" hidden></option>';
    var selector = document.getElementById('opc_professor');

    for(i = 0 ; i < vet_nomes.length ; i++){

        texto = texto + `
            <option value="${vet_nomes[i]}">${vet_nomes[i]}</option>
        `
    }
    
    selector.innerHTML = texto;
}