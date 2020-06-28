$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    var url_string = window.location.href;
    var url = new URL(url_string);
    var materia_ID = url.searchParams.get("materia_id");
    let conteudo_pagina= "";
    for (var i = 0; i < usuarioCorrente.materias.length; i++) {
        if(materia_ID == usuarioCorrente.materias[i].id){
            conteudo_pagina =  ``
        }

    }
}