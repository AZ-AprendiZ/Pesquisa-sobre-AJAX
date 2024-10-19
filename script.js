// - - - - - - - - - - - - - - - - - - - - - //

function esconderPesquisas(id, botaoId){
    var elemento = document.getElementById(id);
    var botao = document.getElementById(botaoId);

    if (elemento.style.display === "block"){
        elemento.style.display = "none";
        botao.textContent = "Mostrar pesquisas";
    } else {
        elemento.style.display = "block";
        botao.textContent = "Esconder pesquisas";
    }
}

// - - - - - - - - - - - - - - - - - - - - - //
function mostrarTexto(id) {
    var elemento = document.getElementById(id);
    var todosbotoes = document.getElementsByClassName('pesquisa');

    for (var i = 0; i < todosbotoes.length; i++) {
        if (todosbotoes[i].id !== id) {  
            todosbotoes[i].style.display = "none";
        }
    }

    if (elemento.style.display === "none") {
        elemento.style.display = "block";
    } else {
        elemento.style.display = "none";
    }
}
// - - - - - - - - - - - - - - - - - - - - - //

// Texto digitado lentamente
function digitarTexto(id, texto, intervalo = 100) {
    const elem = document.getElementById(id);
    elem.value = "";
    let i = 0;
    const timer = setInterval(() => {
        if (i < texto.length) {
            elem.value += texto[i++];
        } else {
            clearInterval(timer);
        } }, intervalo);
}
// - - - - - - - - - - - - - - - - - - - - - //


// AJAX -- XMLHttpRequest
function buscarEnderecoAjax(){

    const cep = document.getElementById("cep").value.replace(/\D/g,'');

    if (cep.length !== 8){
        alert("Por favor, insira um CEP válido.")
        return;
    }

    // Criando objeto XMLHttpRequest para controlar comunicação
    // nagador para servidor.
    const xhttp = new XMLHttpRequest();

    // Preparando o tratamento da resposta
    xhttp.onreadystatechange = function() {
        // readState 4 = resposta recebida
        //  status 200 = resposta OK

        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            const endereco = JSON.parse(this.responseText);
            
            // document.getElementById("logradouro").value = endereco.logradouro;
            digitarTexto("logradouro", endereco.logradouro);
            
            // document.getElementById("complemento").value = endereco.complemento;
            digitarTexto("complemento", endereco.complemento);
            
            // document.getElementById("bairro").value = endereco.bairro;
            digitarTexto("bairro", endereco.bairro);
            
            // document.getElementById("cidade").value = endereco.localidade;
            digitarTexto("cidade", endereco.localidade);
            
            // document.getElementById("uf").value = endereco.uf;
            digitarTexto("uf", endereco.uf);


            ids = ['logradouro','complemento', 'bairro', 'cidade', 'uf'];

            ids.forEach(id => {
                const elemento = document.getElementById(id);
                elemento.style.color = "#d41717"
                
            });

            
            console.log(this.readyState);
            console.log(this.status);
            //document.getElementById("demo").innerHTML = this.responseText;
        }
    };

    // Preparando a solicitação:
    console.log('antes do open cep:'+cep);

    // xhttp.open("GET", `https://viacep.com.br/ws/${cep}/json/`, true);
    xhttp.open("GET", "https://viacep.com.br/ws/"+cep+"/json", true);

    // console.log('antes do send');
    xhttp.send();
    // console.log('depois do send');
}

// FETCH - API
function buscarEnderecoFetch(){
    const cep = document.getElementById("cep").value.replace(/\D/g,'');
    // replace('/\D/g','') = replace para substituir valores; \D encontrará o valor que não for digito de 0-9; o "g" para que encontre em toda a string, '' serve para remover esses caracteres encontrados

    if (cep.length !== 8){
        alert("Por favor, insira um CEP válido")
        return ;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)

        .then(response => {
            if (!response.ok){
                throw new Error('Erro na requisição');
            }
            return response.json();
        })

        .then(data => {
            if (data.erro){
                alert("CEP não encontrado.")
                return;
            }

            // document.getElementById("logradouro").value = data.logradouro;
            digitarTexto("logradouro", data.logradouro);
            
            // document.getElementById("complemento").value = data.complemento;
            digitarTexto("complemento", data.complemento);
            
            // document.getElementById("bairro").value = data.bairro;
            digitarTexto("bairro", data.bairro);
            
            // document.getElementById("cidade").value = data.localidade;
            digitarTexto("cidade", data.localidade);
            
            // document.getElementById("uf").value = data.uf;
            digitarTexto("uf", data.uf);

            ids = ['logradouro','complemento', 'bairro', 'cidade', 'uf'];

            ids.forEach(id => {
                const elemento = document.getElementById(id);
                elemento.style.color = "#767a08"
                
            });
        })

        .catch(error => {
            alert("Erro ao buscar o CEP. Tente novamente.");
            console.error(error);
        });
    }


async function buscarEnderecoAsync(){
    const cep = document.getElementById("cep").value.replace(/\D/g, '');

    if (cep.length !== 8){
        alert("Por favor, insira um CEP válido.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        // Espera a resposta da requisição

        if (!response.ok){
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        // Aguarda a conversão para JSON

        if (data.erro) {
            alert("CEP não encontrado.");
            return;
        }

        // Preencher os campos com os dados retornados

        // document.getElementById("logradouro").value = data.logradouro;
        digitarTexto("logradouro", data.logradouro);

        // document.getElementById("complemento").value = data.complemento;
        digitarTexto("complemento", data.complemento);
        
        // document.getElementById("bairro").value = data.bairro;
        digitarTexto("bairro", data.bairro);
        
        // document.getElementById("cidade").value = data.localidade;
        digitarTexto("cidade", data.localidade);
        
        // document.getElementById("uf").value = data.uf;
        digitarTexto("uf", data.uf);

        ids = ['logradouro','complemento', 'bairro', 'cidade', 'uf'];

        ids.forEach(id => {
            const elemento = document.getElementById(id);
            elemento.style.color = "#1750d4";  
        });
    } catch (erro){
        alert("Erro ao buscar o CEP. Tente novamente.");
        console.error("Ocorreu um erro:", error);
    }


}



    

