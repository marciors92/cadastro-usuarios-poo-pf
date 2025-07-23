export const limparNaoNumericos = (texto) => texto.replace(/\D/g, '');

export const buscarEnderecoPorCep = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();
        if (!dados.erro) {
            return {
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                uf: dados.uf
            };
        } else {
            throw new Error('CEP não encontrado ou inválido.');
        }
    } catch (error) {
        console.error('Erro ao buscar CEP: ', error);
        throw new Error('Erro ao buscar CEP. Por favor, tente novamente.');
    }
};

export const limparCampos = (campos) => {
    campos.forEach(campo => campo.value = '');
};

export const preencherCampos = (campos, dados) => {
    for (const key in dados) {
        if (campos[key]) {
            campos[key].value = dados[key] || '';
        }
    }
};