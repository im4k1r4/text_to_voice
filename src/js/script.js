let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectedVoice = 0; // guardar a voz, 0 = primeiro item do array

window.speechSynthesis.addEventListener('voiceschanged', () => { // unico listener que ele tem
    let voicesList = window.speechSynthesis.getVoices(); // pega as vozes disponíveis
    for(let i in voicesList) { // looping para percorrer o array de opções de vozes
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', i); // a posição dessa voz específica do array
        optionEl.innerText = voicesList[i].name; // o nome daquela voz, elemento criado
        voices.appendChild(optionEl); // inserir dentro do select
    } 
});

button.addEventListener('click', () => {
    if(textarea.value !== '') {
        let ut = new SpeechSynthesisUtterance(textarea.value); // armazena em ut os valores do text area e usa a fn speech
        let voicesList = window.speechSynthesis.getVoices();
        ut.voice = voicesList[selectedVoice]; // vai pegar todo o objeto da voz e pegar o item que eu quero. 
        window.speechSynthesis.speak(ut);  // recurso novo suportado por todos os navegadores; fn speak recebe o ut
    }
});

voices.addEventListener('change', () => { // evento de change, e quando eu mudar
    selectedVoice = parseInt(voices.value); // mudo a voz selecionada para o value selecionado em voices (parseInt pra transformar a string em número)
});

// Função pra executar constantemente pra saber quando está falando ou não. Se estiver falando, desabilito o select e o botão

function updateStatus() {
    if(window.speechSynthesis.speaking) { // speaking propriedade boolean de quando está falando ou não
        voices.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
    } else { // quando não estiver falando
        voices.removeAttribute('disabled');
        button.removeAttribute('disabled');
    }
}

setInterval(updateStatus, 100);