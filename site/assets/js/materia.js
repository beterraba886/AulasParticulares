$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    let usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));
    let main = document.querySelector('main');
    var professor;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var professor_ID = url.searchParams.get("prof_id");
    let conteudo_pagina = "";

    //criando data minima
    let data_hoje = new Date();
    addDays(data_hoje, 1);
    data_hoje = data_hoje.toISOString().slice(0,10);

    console.log(data_hoje);

    for(i=0;i<usuariosJSON.usuarios.length && professor_ID != usuariosJSON.usuarios[i].id; i++){
        professor = usuariosJSON.usuarios[i];
    };
    console.log(professor);
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
                <h3 style="font-family: Capriola, sans-serif;">About</h3>
            </div>
            
            <div>
                <p class="text-justify" style="font-family: Capriola, sans-serif;"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p class="text-center" style="font-family: Capriola, sans-serif;">More Info:&nbsp;<a href="#">https://github.com/JaneDoe</a></p>
                <hr style="background-color: #00b2f7;">
            
            </div>
            
            <div>
                <h3 class="text-center" style="font-family: Capriola, sans-serif;">Value of Lessons</h3>
                <p class="text-center" style="font-family: Capriola, sans-serif;">${professor.valor}</p>
                <button id="btn_marcar" class="btn btn-primary" type="button" style="font-family: Capriola, sans-serif;">Schedule Lesson</button>
                <input type="date" min="${data_hoje}" id="data_marcada">    
            </div>
        
        </div>
    </div>

    <hr style="background-color: #00b2f7;">   

`
main.innerHTML = conteudo_pagina;

marcarAula = function(professor){
    console.log(professor);
    let i=0;
    let data_materia = document.querySelector('#data_marcada').value;
    let id_aula = generateUUID();
    let aula = {
        "id_aula": id_aula,
        "id_aluno": usuarioCorrente.id,
        "id_professor": professor.id,
        "nome_professor": professor.nome,
        "data_aula": data_materia,
        "hora_aula": "",
    };
    //console.log(usuarioCorrente.aulas_agendadas);

    usuarioCorrente.aulas_agendadas.push(aula);
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    
    while(usuarioCorrente.id != usuariosJSON.usuarios[i].id){
        i++;
    }
    usuariosJSON.usuarios[i].aulas_agendadas.push(aula);
    localStorage.setItem('db_usuarios', JSON.stringify(usuariosJSON));
}
$(document).on('click','#btn_marcar',function(){

    marcarAula(professor);
    //console.log(professor.nome)
})

    // Função para data
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }


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


 