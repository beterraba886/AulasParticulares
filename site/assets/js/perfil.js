$(document).ready()
{
    let usuarioLogado = JSON.parse(sessionStorage.getItem('usuarioCorrente'));    
   
    carregar_dados_usuario();

    window.onload = hideSearch();
    document.getElementById('btn_atualizar').addEventListener('click', atualizar_dados);       
    

    /**
     * Carrega os dados do usuario logado na pagina de perfil.
     */
    function carregar_dados_usuario() {        

        if(usuarioLogado.tipo == false){

            document.getElementById ('disciplina').hidden = true;
            document.getElementById ('valor').hidden = true;
            document.getElementById ('link').hidden = true;

            let inputUsername = document.getElementById('user');
            let inputName = document.getElementById('name');
            let inputEmail = document.getElementById('email');
    
            inputUsername.value = usuarioLogado.username;
            inputName.value = usuarioLogado.nome;
            inputEmail.value = usuarioLogado.email;

        } else {

            document.getElementById ('disciplina').hidden = false;
            document.getElementById ('valor').hidden = false;
            document.getElementById ('link').hidden = false;

            let inputUsername = document.getElementById('user');
            let inputName = document.getElementById('name');
            let inputEmail = document.getElementById('email');
            let inputDisciplina = document.getElementById('disciplina');
            let inputValor = document.getElementById('valor');
            let inputLink = document.getElementById('link');
    
            inputUsername.value = usuarioLogado.username;
            inputName.value = usuarioLogado.nome;
            inputEmail.value = usuarioLogado.email;
            inputDisciplina.value = usuarioLogado.disciplina;
            inputValor.value = usuarioLogado.valor;
            inputLink.value = usuarioLogado.link;

        }

    }


    /**
     * Atualiza dados do usuario logado no localStorage e no sessionStorage
     */
    function atualizar_dados() {

        let new_db_usuarios = JSON.parse(localStorage.getItem('db_usuarios'));
        let find = false;

        //busca sequencial -> pior caso log(n)
        for (i = 0 ; i < new_db_usuarios.usuarios.length && find == false ; i++) {

            if (usuarioLogado.id == new_db_usuarios.usuarios[i].id) {

                new_db_usuarios.usuarios[i].username = document.getElementById('user').value;
                new_db_usuarios.usuarios[i].nome = document.getElementById('name').value;
                new_db_usuarios.usuarios[i].email = document.getElementById('email').value;
                new_db_usuarios.usuarios[i].disciplina = document.getElementById('disciplina').value;
                new_db_usuarios.usuarios[i].valor = document.getElementById('valor').value;
                new_db_usuarios.usuarios[i].link = document.getElementById('link').value;                

                usuarioLogado.username = document.getElementById('user').value;
                usuarioLogado.nome = document.getElementById('name').value;
                usuarioLogado.email = document.getElementById('email').value;
                usuarioLogado.disciplina = document.getElementById('disciplina').value;
                usuarioLogado.valor = document.getElementById('valor').value;
                usuarioLogado.link = document.getElementById('link').value;                

                find = true;
            }
        }       
        
        sessionStorage.setItem('usuarioCorrente', JSON.stringify (usuarioLogado));
        localStorage.setItem('db_usuarios', JSON.stringify (new_db_usuarios));

        if(find){
            alert('Dados atualizados com sucesso!');
        } else{
            alert('Os dados não foram atualizados!');
        }        
        
        document.location.reload(true);
    }

    /**
     * Esconde a opção de pesquisar na barra de navegação 
     * caso o usuario logado seja um professor.
     */
    function hideSearch(){

        if(usuarioLogado.tipo){
            document.getElementById ('nav_pesquisar').hidden = true;
        } else {
            document.getElementById ('nav_pesquisar').hidden = false;
        }
    }


}