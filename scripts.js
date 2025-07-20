document.addEventListener('DOMContentLoaded', () => {
    // Variáveis para os elementos do formulário
    const formulario = document.getElementById('formularioCadastro');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputCep = document.getElementById('cep');
    const inputLogradouro = document.getElementById('logradouro');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const inputUf = document.getElementById('uf');

    // Função para salvar os dados no Web Storage
    const salvarDados = () => {
        const dadosFormulario = {
            nome: inputNome.value,
            email: inputEmail.value,
            cep: inputCep.value,
            logradouro: inputLogradouro.value,
            bairro: inputBairro.value,
            cidade: inputCidade.value,
            uf: inputUf.value
        };
        // Usa localStorage para manter os dados mesmo após o navegador ser fechado
        localStorage.setItem('dadosCadastro', JSON.stringify(dadosFormulario));
    };

    // Função para restaurar os dados do Web Storage
    const restaurarDados = () => {
        const dadosSalvos = localStorage.getItem('dadosCadastro');
        if (dadosSalvos) {
            const dados = JSON.parse(dadosSalvos);
            inputNome.value = dados.nome || '';
            inputEmail.value = dados.email || '';
            inputCep.value = dados.cep || '';
            inputLogradouro.value = dados.logradouro || '';
            inputBairro.value = dados.bairro || '';
            inputCidade.value = dados.cidade || '';
            inputUf.value = dados.uf || '';
        }
    };

    // Função para preencher o endereço a partir do CEP usando ViaCEP
    const preencherEndereco = async () => {
        const cep = inputCep.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const dados = await response.json();

                if (!dados.erro) {
                    inputLogradouro.value = dados.logradouro;
                    inputBairro.value = dados.bairro;
                    inputCidade.value = dados.localidade;
                    inputUf.value = dados.uf;
                    salvarDados(); // Salva os dados após preencher o endereço
                } else {
                    alert('CEP não encontrado ou inválido.');
                    limparCamposEndereco();
                }
            } catch (error) {
                console.error('Erro ao buscar CEP: ', error);
                alert('Erro ao buscar CEP. Por favor, tente novamente.');
                limparCamposEndereco();
            }
        } else {
            limparCamposEndereco();
        }
    };

    // Função para limpar os campos de endereço
    const limparCamposEndereco = () => {
        inputLogradouro.value = '';
        inputBairro.value = '';
        inputCidade.value = '';
        inputUf.value = '';
        salvarDados(); // Salva os dados após limpar os campos
    };

    // Event Listeners
    inputCep.addEventListener('blur', preencherEndereco); // Preenche ao sair do campo CEP
    formulario.addEventListener('input', salvarDados); // Salva dados a cada alteração no formulário
    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        alert('Usuário cadastrado com sucesso!');
    });

    // Restaura os dados ao carregar a página
    restaurarDados();
});