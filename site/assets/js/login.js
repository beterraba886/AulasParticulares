$(document).ready()
{
    document.getElementById ('btn_salvar').addEventListener ('click', salvarUsuario);     
    document.getElementById ('btn_entrar').addEventListener ('click', processaFormLogin);
    document.getElementById ('radio_aluno').addEventListener('click', desabilitaInput);
    document.getElementById ('radio_prof').addEventListener('click', habilitaInput);

    var db_usuarios = {};
    var usuarioCorrente = {};

    /**
     * Desabilita o input de dados caso seja cadastro de aluno.
     */
    function desabilitaInput(){
        document.getElementById ('disciplina').hidden = true;
        document.getElementById ('valor').hidden = true;
    }

    /**
     * Habilita o input de dados caso seja cadastro de professor.
     */
    function habilitaInput(){        
        document.getElementById ('disciplina').hidden = false;        
        document.getElementById ('valor').hidden = false;
    }

    /**
     * Gera códigos randômicos a serem utilizados como código de usuário.
     * Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
     * Public Domain/MIT
     */
    function generateUUID() {

        var d = new Date().getTime();
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

            var r = Math.random() * 16;

            if(d > 0){
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }

            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    
    const dataAula = [new Date("2020-06-15"), new Date("2020-06-01"), new Date("2020-07-10")];
    const dataAula2 = [new Date("2020-06-23"), new Date("2020-07-03"), new Date("2020-06-13")];

    const dadosIniciais = {

        usuarios: [
            
            {
                // usuarios do tipo aluno nao preenchem os atributos-> disiplina, valor e link.
                "id_usuario" : "0001", 
                "tipo" : false, 
                "username" : "aluno", 
                "nome" : "Aluno da Silva", 
                "email" : "aluno-da-silva@email.com", 
                "disciplina" : "",  
                "valor" : "", 
                "link" : "", 
                "senha" : "aluno",

                "aulas_agendadas": [
                    
                    {                           
                        "id_aula" : "01", 
                        "id_aluno" : "0001",
                        "id_professor" : "0001a",                        
                        "nome_professor" : "Professor da Silva",
                        "disciplina" : "Matemática",
                        "data_aula" : dataAula,
                        "hora_aula" : "12:00",
                    }
                ]
            },

            {
                "id_usuario" : "0001a", 
                "tipo" : true, 
                "username" : "professor", 
                "nome" : "Professor da Silva", 
                "email" : "professor-da-silva@email.com", 
                "disciplina" : "Matemática" , 
                "valor" : "60", 
                "link" : "https://meusite.com.br", 
                "senha" : "professor",

                "aulas_agendadas": [

                    {                           
                        "id_aula" : "01", 
                        "id_aluno" : "0001",
                        "id_professor" : "0001a",
                        "nome_aluno" : "Aluno da Silva",
                        "disciplina" : "Matemática",
                        "data_aula" : dataAula,
                        "hora_aula" : "12:00",
                    }
                ]
            }

        ]
    };

    /**
     * Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
     */
    function initLoginApp () {

        usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');

        if (usuarioCorrenteJSON) {
            usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
        }

        var usuariosJSON = localStorage.getItem('db_usuarios');

        if (!usuariosJSON) {

            db_usuarios = dadosIniciais;
            localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));

        } else  {
            db_usuarios = JSON.parse(usuariosJSON);    
        }
    };

    /**
     * Coleta dados do formulario de cadastro e adiciona novo usuario.
     * @param {Event} event 
     */
    function salvarUsuario (event) {

        event.preventDefault ();        
        
        let tipo = document.getElementById('radio_prof').checked ? true : false;
        
        let username  = document.getElementById('txt_login').value;
        let nome   = document.getElementById('txt_nome').value;
        let email  = document.getElementById('txt_email').value;
        let disciplina  = document.getElementById('txt_disciplina').value;
        let valor  = document.getElementById('txt_valor').value;        
        let senha  = document.getElementById('txt_senha').value;
        let senha2 = document.getElementById('txt_senha2').value;

        if (senha != senha2) {
            alert ('As senhas informadas não conferem.');
            return
        }

        addUser (tipo, username, nome, email, disciplina, valor, senha);
        alert ('Usuário salvo com sucesso. Proceda com o login para ');

        $('#loginModal').modal('hide');
    }

    /**
     * Adiciona um novo usuario ao banco de dados no localStorage
     * @param {Boolean} tipo 
     * @param {String} username 
     * @param {String} nome 
     * @param {String} email 
     * @param {String} disciplina 
     * @param {Number} valor 
     * @param {String} senha 
     */
    function addUser (tipo, username, nome, email, disciplina, valor, senha) {    
        
        let newId = generateUUID ();

        let usuario = { 
            
            "id_usuario": newId,
            "tipo": tipo, 
            "username": username, 
            "nome": nome, 
            "email": email, 
            "disciplina": disciplina, 
            "valor": valor,             
            "link" : "",
            "senha": senha,

            "aulas_agendadas": [

                /*{
                    "id_aula" : "", 
                    "id_aluno" : "",
                    "id_professor" : "",
                    "nome_aluno" : "",
                    "disciplina" : "",
                    "data_aula" : [],
                    "hora_aula" : "",
                }*/
            ]
        };

        db_usuarios.usuarios.push (usuario);
        localStorage.setItem('db_usuarios', JSON.stringify (db_usuarios));
    }

    /**
     * Processa o Login
     * @param {Event} event 
     */
    function processaFormLogin (event) {       

        event.preventDefault ();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var tipo     = document.querySelector('select').selectedIndex;        

        if(tipo == 0){
            tipo = false;
        } else {
            tipo = true;
        }       

        resultadoLogin = loginUser (username, password, tipo);

        if (resultadoLogin) {

            window.location.href = 'home.html';            

        } else { 

            alert ('Usuário, senha ou/e tipo de acesso incorretos');

        }
    }

    /**
     * Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial.
     * @param {String} username 
     * @param {String} senha 
     * @param {Boolean} tipo 
     */    
    function loginUser (username, senha, tipo) {

        for (var i = 0; i < db_usuarios.usuarios.length; i++) {

            var usuario = db_usuarios.usuarios[i];
            
            if (username == usuario.username && senha == usuario.senha && tipo == usuario.tipo) {                

                usuarioCorrente.id_usuario = usuario.id_usuario;
                usuarioCorrente.tipo = usuario.tipo;
                usuarioCorrente.username = usuario.username;
                usuarioCorrente.nome = usuario.nome;
                usuarioCorrente.email = usuario.email;
                usuarioCorrente.disciplina = usuario.disciplina;
                usuarioCorrente.valor = usuario.valor;
                usuarioCorrente.link = usuario.link;
                usuarioCorrente.senha = usuario.senha;
                usuarioCorrente.aulas_agendadas = usuario.aulas_agendadas;                                
                
                sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));                
                
                return true;
            }

        }

        return false;
    }

    /**
     * Apaga os dados do usuário corrente no sessionStorage
     */ 
    function logoutUser () {

        usuarioCorrente = {};
        sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
        window.location = LOGIN_URL;
    }

    initLoginApp();    
}