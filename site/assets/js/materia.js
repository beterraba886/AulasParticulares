$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    let usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));
    let main = document.querySelector('main');
    var professor;
    var url_string = window.location.href;
    var url = new URL(url_string);
    let professor_ID = url.searchParams.get("prof_id");
    let conteudo_pagina = "";

    //criando data minima
    let data_hoje = new Date();
    addDays(data_hoje, 1);
    data_hoje = data_hoje.toISOString().slice(0,10);


    for(i=0;i<usuariosJSON.usuarios.length;i++){
        if(usuariosJSON.usuarios[i].id_usuario == professor_ID){
            professor = usuariosJSON.usuarios[i];
        }
    };    

    conteudo_pagina = `
    
    <div class="d-flex justify-content-center" style="background-color: #ffffff;">

    <div class="text-center"><img class="rounded img-fluid" src="assets/img/pexels-photo-2100063.jpeg" style="height: 440px;">
        
        <div>
            <h1 class="text-center" style="font-family: Capriola, sans-serif;">${professor.nome}</h1>
        </div>
        <div>
            <h6 class="text-center" style="font-family: Capriola, sans-serif;">${professor.disciplina} </h6>
        </div>
        
        <hr style="background-color: #00b2f7;">
        
        <div>
            <h3 style="font-family: Capriola, sans-serif;">Sobre</h3>
        </div>
        
        <div>
            <p class="text-justify" style="font-family: Capriola, sans-serif;"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p class="text-center" style="font-family: Capriola, sans-serif;">Outras Informações:&nbsp;<a href="#">${professor.link}</a></p>
            <hr style="background-color: #00b2f7;">
        
        </div>
        
        <div>
            <h3 class="text-center" style="font-family: Capriola, sans-serif;">Valor das Aulas</h3>
            <p class="text-center" style="font-family: Capriola, sans-serif;">${professor.valor}</p>                
            <input type="date" min="${data_hoje}" id="data_marcada" style="margin: 8px; padding: 6px 12px;" >
            <input type="time" id="hora_marcada" min="09:00" max="22:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" style="margin: 8px; padding: 6px 12px;"  required>   
            <button id="btn_marcar" class="btn btn-primary btn-lg" type="button" style="font-family: Capriola, sans-serif; padding: 6px 12px;">Schedule Lesson</button>
        </div>
    
    </div>
</div>

<hr style="background-color: #00b2f7;">      

`
main.innerHTML = conteudo_pagina;

marcarAula = function(professor){

    let i=0, j=0, z=0;
    let data_materia = document.querySelector('#data_marcada').value;
    let hora_materia = document.querySelector('#hora_marcada').value;

    data_materia = new Date(data_materia);
    let id_aula = generateUUID();
    //acha posição do aulas agendadas no usuario corrente
    while(usuarioCorrente.id_usuario != usuariosJSON.usuarios[i].id_usuario){
        i++;

    }
    //acha posicao do usuario no localStorage
    while(usuarioCorrente.aulas_agendadas[j] && usuarioCorrente.aulas_agendadas[j].id_professor != usuariosJSON.usuarios[j].id_usuario){
        j++;

    }
/*
    if(usuarioCorrente.aulas_agendadas[j] != undefined && materiaExiste(usuarioCorrente)){
        usuarioCorrente.aulas_agendadas[j].data_aula.push(data_materia);
        usuariosJSON.usuarios[i].aulas_agendadas[j].data_aula.push(data_materia);
        professor.aulas_agendadas.data_aula.push(data_materia);
    }
    else{
*/
    let aula = {
        "id_aula": id_aula,
        "id_aluno": usuarioCorrente.id_usuario,
        "id_professor": professor.id_usuario,
        "nome_professor": professor.nome,
        "data_aula": data_materia.toISOString().slice(0,10),
        "hora_aula": hora_materia,
        "disciplina": professor.disciplina,
    };
    let aula_professor = {
        "id_aula": id_aula,
        "id_aluno": usuarioCorrente.id_usuario,
        "id_professor": professor.id_usuario,
        "nome_aluno": usuarioCorrente.nome,
        "disciplina": professor.disciplina,
        "data_aula": data_materia.toISOString().slice(0,10),
        "hora_aula": hora_materia,
    };

    usuarioCorrente.aulas_agendadas.push(aula);
    usuariosJSON.usuarios[i].aulas_agendadas.push(aula);
    professor.aulas_agendadas.push(aula_professor);
//   }    

    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
}

$(document).on('click','#btn_marcar',function(){

    marcarAula(professor);
    alert('aula marcada');
})

    // Função para data
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }
    /*
    function materiaExiste(usuarioCorrente){
        let existe = false;
        for(i=0;i<usuarioCorrente.aulas_agendadas.length; i++)
        if(usuarioCorrente.aulas_agendadas[i].id_professor = professor.id_usuario ){
            existe = true

        }
        return existe;
    }
    */

    // função para gerar códigos randômicos a serem utilizados como código de usuário
    // Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

}


 