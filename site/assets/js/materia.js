$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    let main = document.querySelector('main');
    let materia;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var materia_ID = url.searchParams.get("prof_id");
    let conteudo_pagina = "";

    for(i=0;i<usuarioCorrente.materias.length && materia_ID != usuarioCorrente.materias[i].id; i++){
        materia = usuarioCorrente.materias[i];
    };

    conteudo_pagina = `
    
    <div class="d-flex justify-content-center" style="background-color: #ffffff;">

        <div class="text-center"><img class="rounded img-fluid" src="assets/img/pexels-photo-2100063.jpeg" style="height: 440px;">
            
            <div>
                <h1 class="text-center" style="font-family: Capriola, sans-serif;">${materia.professor}</h1>
            </div>
            <div>
                <h6 class="text-center" style="font-family: Capriola, sans-serif;">${materia.disciplina} </h6>
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
                <p class="text-center" style="font-family: Capriola, sans-serif;">$ 80,00/h</p>
                <button class="btn btn-primary" type="button" style="font-family: Capriola, sans-serif;">Schedule Lesson</button>
            </div>
        
        </div>
    </div>

    <hr style="background-color: #00b2f7;">   

`
main.innerHTML = conteudo_pagina;

}
 