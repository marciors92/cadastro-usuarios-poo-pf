import { Usuario, Armazenamento } from './classes.js';
import { limparNaoNumericos, buscarEnderecoPorCep, limparCampos, preencherCampos } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioCadastro');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputCep = document.getElementById('cep');
    const inputLogradouro = document.getElementById('logradouro');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const inputUf = document.getElementById('uf');

    const camposEndereco = {
        logradouro: inputLogradouro,
        bairro: inputBairro,
        cidade: inputCidade,
        uf: inputUf
    };

    const salvarDadosFormulario = () => {
        const dadosFormulario = new Usuario(
            inputNome.value,
            inputEmail.value,
            inputCep.value,
            inputLogradouro.value,
            inputBairro.value,
            inputCidade.value,
            inputUf.value
        );
        Armazenamento.salvarDados(dadosFormulario);
    };

    const restaurarDadosFormulario = () => {
        const dadosSalvos = Armazenamento.restaurarDados();
        if (dadosSalvos) {
            preencherCampos({
                nome: inputNome,
                email: inputEmail,
                cep: inputCep,
                ...camposEndereco
            }, dadosSalvos);
        }
    };

    const lidarComPreenchimentoEndereco = async () => {
        const cep = limparNaoNumericos(inputCep.value);
        if (cep.length === 8) {
            try {
                const endereco = await buscarEnderecoPorCep(cep);
                preencherCampos(camposEndereco, endereco);
                salvarDadosFormulario();
            } catch (error) {
                alert(error.message);
                limparCampos(Object.values(camposEndereco));
                salvarDadosFormulario();
            }
        } else {
            limparCampos(Object.values(camposEndereco));
            salvarDadosFormulario();
        }
    };

    formulario.addEventListener('input', salvarDadosFormulario);
    inputCep.addEventListener('blur', lidarComPreenchimentoEndereco);

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        // Aqui você pode adicionar lógica para enviar os dados para um servidor, se necessário.
        alert('Usuário cadastrado com sucesso!');
        // Opcional: Limpar formulário após o envio
        // formulario.reset(); 
        // limparCampos(Object.values(camposEndereco));
        // Armazenamento.salvarDados({}); // Limpa dados salvos
    });

    restaurarDadosFormulario();
});