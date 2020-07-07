$(document).ready()
{
    var usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
    var usuarioJSON = JSON.parse(localStorage.getItem('db_usuarios'));
    var logout = document.querySelector('#logout').addEventListener('click', logoutUser);
    var enviar = document.querySelector('#btn_send').addEventListener('click', enviarMsg);       

    function logoutUser() {

        usuarioCorrente = {};
        sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
        window.location = 'index.html';
    }

    var vet_nomes = [];

    if(usuarioCorrente.tipo == false){

        for(i = 0 ; i < usuarioCorrente.aulas_agendadas.length ; i++){
            
            if(vet_nomes.indexOf(usuarioCorrente.aulas_agendadas[i].nome_professor) == -1 && 
               vet_nomes.indexOf(usuarioCorrente.aulas_agendadas[i].id_professor) == -1){

                let contato = {

                    "nome" : usuarioCorrente.aulas_agendadas[i].nome_professor,
                    "id" : usuarioCorrente.aulas_agendadas[i].id_professor,
                }

                vet_nomes.push(contato);                
            }
        }

    } else {

        for(i = 0 ; i < usuarioCorrente.aulas_agendadas.length ; i++){

            if(vet_nomes.indexOf(usuarioCorrente.aulas_agendadas[i].nome_aluno) == -1 && 
                vet_nomes.indexOf(usuarioCorrente.aulas_agendadas[i].id_aluno) == -1 ){

                let contato = {

                    "nome" : usuarioCorrente.aulas_agendadas[i].nome_aluno,
                    "id" : usuarioCorrente.aulas_agendadas[i].id_aluno,
                }                    

                vet_nomes.push(contato);
            }
        }        
    }

    var texto = '<option value="" selected="" hidden></option>';
    var selector = document.getElementById('opc_professor');

    for(i = 0 ; i < vet_nomes.length ; i++){

        texto = texto + `
            <option value="${vet_nomes[i].nome}">${vet_nomes[i].nome}</option>
        `
    }
    
    selector.innerHTML = texto;


    /**
     * Retorna um objeto da mensagem a ser enviada.
     * @author Rayane Paiva Reginaldo
     * @param {String} id_remetente 
     * @param {String} id_destinatario 
     * @param {String} assunto 
     * @param {String} texto 
     * @param {BinaryType} arquivo 
     */
    function constroiMSG(id_remetente, id_destinatario, assunto, texto, arquivo){

        return {

            "id_mensagem" : generateUUID(),
            "id_remetente" : id_remetente,
            "id_destinatario" : id_destinatario,                        
            "assunto" : assunto, 
            "texto" : texto,
            "arquivo" : arquivo,
            "data" : new Date(),
            "lida" : false,
        };
    }

    /**
     * Retorna o ID do destinatario da mensagem
     * @author Rayane Paiva Reginaldo
     * @param {String} destinatario 
     */
    function getIDDestinatario(destinatario){
        
        let id_destinatario;
        let st = false;

        for (let index = 0 ; index < vet_nomes.length && st == false ; index++) {
            
            if(destinatario == vet_nomes[index].nome){

                id_destinatario = vet_nomes[index].id;
                st = true;
            }
        }

        return id_destinatario;
    }

    /**
     * Adiciona mensagens nos respectivos destinatarios no lolcalStorage
     * @author Rayane Paiva Reginaldo
     * @param {String} id_remetente 
     * @param {String} id_destinatario 
     * @param {Object} msg 
     */
    function addMsgUsuarios(id_remetente, id_destinatario, msg){        
        
        for (let index = 0 ; index < usuarioJSON.usuarios.length ; index++) {            

            if (usuarioJSON.usuarios[index].id_usuario == id_destinatario) {
                usuarioJSON.usuarios[index].mensagens.push(msg);
            }

            if (usuarioJSON.usuarios[index].id_usuario == id_remetente) {
                usuarioJSON.usuarios[index].mensagens.push(msg);
            }

        }

        localStorage.setItem('db_usuarios', JSON.stringify (usuarioJSON));
        
        alert('Mensagem Enviada!');
    }


    /**
     * Faz o envio da mensagem para o destinatario.
     * @author Rayane Paiva Reginaldo
     */
    function enviarMsg(){

        var assunto = document.getElementById('assunto').value;
        var destinatario = document.querySelector('select').value;
        var mensagem = document.getElementById('text_area').value;
        var arquivo = document.getElementById('inputFile').value;

        var id_destinatario = getIDDestinatario(destinatario);
        
        var msg = constroiMSG(usuarioCorrente.id_usuario, id_destinatario, assunto, mensagem, arquivo);

        usuarioCorrente.mensagens.push(msg);        

        addMsgUsuarios(usuarioCorrente.id_usuario, id_destinatario, msg);

        sessionStorage.setItem('usuarioCorrente', JSON.stringify (usuarioCorrente));        
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
}