/**
 * @author Rayane Paiva Reginaldo
 */
$(document).ready()
{
    var usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    //var usuarioJSON = JSON.parse(localStorage.getItem('db_usuarios'));
    var logout = document.querySelector('#logout').addEventListener('click', logoutUser);
    //var apagar = document.querySelector('#apagar_msg').addEventListener('click', apagarMensagem);

    function logoutUser() {

        usuarioCorrente = {};
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        window.location = 'index.html';
    }

    var main = document.getElementById('cx_msg');
    var mensagens = usuarioCorrente.mensagens;
    var texto = "";

    for (let index = 0; index < mensagens.length; index++) {

        if (mensagens[index].recebida == true) {
            texto = texto + `

                <div class="d-flex justify-content-center" style="background-color: #ffffff;padding: 10px 10px;">

                <div class="card">
        
                    <div class="card-body">
        
                        <h4 class="card-title" id="nome_remetente" style="font-family: Capriola, sans-serif;">${mensagens[index].nome_remetente}</h4>
        
                        <h6 class="text-muted card-subtitle mb-2" id="assunto" style="font-family: Capriola, sans-serif;">
                            ${mensagens[index].assunto}
                        </h6>
        
                        <h6 class="text-muted card-subtitle mb-2" id="data_hora" style="font-family: Capriola, sans-serif;">
                            ${mensagens[index].data}
                        </h6>
        
                        <p class="card-text" id="texto_mensagem" style="font-family: Capriola, sans-serif;">
                            ${mensagens[index].texto}
                        </p>

                        <a href="" id="apagar_msg">apagar</a>

                    </div>
                </div>
            </div>

            `
        }

    }

    if (texto.length == 0) {

        texto = `
            <div class="d-flex justify-content-center" style="background-color: #ffffff;padding: 10px 10px;">

                <div class="card">

                    <div class="card-body">

                        <p class="card-text" id="descricao" style="font-family: Capriola, sans-serif;">
                            Sem mensagens recebidas!
                        </p>

                    </div>
                </div>
            </div>
        `
    }

    main.innerHTML = texto;
}