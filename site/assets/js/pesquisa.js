$(document).ready()
{
    let usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

    var usuariosJSON = JSON.parse(localStorage.getItem('db_usuarios'));

    document.getElementById('btn_pesquisa').addEventListener('click', pesquisar);

    let logout = document.querySelector('#logout').addEventListener('click', logoutUser);

    let div_pesquisa = document.getElementById('div_pesquisa');

    var professores = [];

    var texto = "";

    //filtrar

    function pesquisar() {                

        var input = document.getElementById('txt_disciplina');
        var valor = input.value;

        texto = "";        

        usuariosJSON.usuarios.forEach((usuario) => {

            if (usuario.tipo == true && usuario.disciplina == valor) {
    
                professores.push(usuario);
            }
    
        });        

        if (professores.length == 0) {

            texto = texto + `

            <div class="d-flex justify-content-center" style="background-color: #ffffff;padding: 10px 10px;">

                <div class="card">
    
                    <div class="card-body">
    
                        <p class="card-text" id="descricao" style="font-family: Capriola, sans-serif;">
                            No momento não temos nenhum professor dessa disciplina!
                        </p>
    
                    </div>
                </div>
            </div>
            `;

        } else {

            professores.forEach((professor) => {

                if (professor.disciplina.includes(valor)) {
                    texto = texto + `

                <div class="d-flex justify-content-center" style="width: 100%;padding: 20px;"><img class="rounded img-fluid" style="width: 120px;height: 140px;" src="assets/img/pexels-photo-2100063.jpeg">

                    <div style="padding: 0px 15px;">

                        <div>
                            <label style="font-family: Capriola, sans-serif;font-size: 19px;">${professor.nome}</label>
                        </div>                        

                        <div>
                            <label style="font-family: Capriola, sans-serif;font-size: 14px;">${professor.disciplina}</label>
                        </div>

                        <div>
                            <a href="materia.html?prof_id=${professor.id_usuario}">
                            <button class="btn btn-primary" type="button" style="font-family: Capriola, sans-serif;height: 31px;width: 99px;font-size: 13px;">Detalhes</button></a>
                        </div>
                    </div>
                </div>
                `;
                }
            })
        }

        div_pesquisa.innerHTML = texto;
        professores = [];
    }

    function logoutUser() {

        usuarioCorrente = {};
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        window.location = 'index.html';
    }
}