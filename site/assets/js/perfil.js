$(document).ready()
{

    let usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioCorrente'));    

    carregar_dados_usuario();

    document.getElementById('btn_atualizar').addEventListener('click', atualizar_dados);       

    function carregar_dados_usuario() {

        //ifelse proff/aluno

        let inputUsername = document.getElementById('user');
        let inputName = document.getElementById('name');
        let inputEmail = document.getElementById('email');
        let inputDisciplina = document.getElementById('disciplina');
        //let inputValor = document.getElementById('valor');
        //let inputDescricao = document.getElementById('descricao');


        inputUsername.value = usuarioLogado.login;
        inputName.value = usuarioLogado.nome;
        inputEmail.value = usuarioLogado.email;
        inputDisciplina.value = usuarioLogado.id;
        //inputUsername.value = usuarioLogado;
        //inputUsername.value = usuarioLogado;
    }


    function atualizar_dados() {

        /** FAZER DEPOIS DE MUDAR A ESTRUTURA DO JSON
         
            if proff
                
                buscar professor no db_professores pelo id do usuarioCorrente
                substituir os dados cadastrados pelos dados no input

            esle

                buscar aluno no db_alunos pelo id do usuarioCorrente
                substituir os dados cadastrados pelos dados no input        

        */

        let new_db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));
        let find = false;

        //busca sequencial -> pior caso log(n)
        for (i = 0 ; i < new_db_usuarios.usuarios.length && find == false ; i++) {

            if (usuarioLogado.id == new_db_usuarios.usuarios[i].id) {

                new_db_usuarios.usuarios[i].login = document.getElementById('user').value;
                new_db_usuarios.usuarios[i].nome = document.getElementById('name').value;
                new_db_usuarios.usuarios[i].email = document.getElementById('email').value;
                //new_db_usuarios.usuarios[i].disciplina = "";

                usuarioLogado.login = document.getElementById('user').value;
                usuarioLogado.nome = document.getElementById('name').value;
                usuarioLogado.email = document.getElementById('email').value;

                find = true;
            }
        }       
        
        sessionStorage.setItem('usuarioCorrente', JSON.stringify (usuarioLogado));
        localStorage.setItem('db_usuarios', JSON.stringify (new_db_usuarios));

        //alerta de cadastro ok ou nao
        //alert();
        
        document.location.reload(true);
    }

}