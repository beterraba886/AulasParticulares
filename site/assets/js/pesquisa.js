$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));
    document.getElementById('btn_pesquisa').addEventListener('click', pesquisar);
    let div_pesquisa = document.getElementById('div_pesquisa');
    let professores = [];
    let texto = "";
    usuariosJSON.usuarios.forEach((usuario)=>{
        if(usuario.tipo == "true"){
            professores.push(usuario);
        }
    });

    console.log(professores);

    //filtrar

    function pesquisar() {
        let input = document.getElementById('input');
        let valor = input.value;
        texto = "";
        professores.forEach((professor)=>{
            if(professor.nome.includes(valor)){
                texto = texto + `
                <div class="d-flex justify-content-center" style="width: 100%;padding: 20px;"><img class="rounded img-fluid" style="width: 120px;height: 140px;" src="assets/img/pexels-photo-2100063.jpeg">
                    <div style="padding: 0px 15px;">
                        <div><label style="font-family: Capriola, sans-serif;font-size: 19px;">${professor.nome}</label></div>
                        <div><label style="font-family: Capriola, sans-serif;font-size: 14px;">Aulas para o ensino médio</label></div>
                        <div><label style="font-family: Capriola, sans-serif;font-size: 14px;">Matemática</label></div>
                        <div><button class="btn btn-primary" type="button" style="font-family: Capriola, sans-serif;height: 31px;width: 99px;font-size: 13px;">Detalhes</button></div>
                    </div>
                </div>
                `;
            }
        })

        div_pesquisa.innerHTML = texto;
    }
}