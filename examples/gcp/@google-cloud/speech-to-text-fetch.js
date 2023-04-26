const path = require("path");

// Ler o arquivo de áudio e converter para base64
const audioContent = require('fs').readFileSync(path.join(__dirname, 'audio.wav')).toString('base64');

// Definir as opções do reconhecimento de voz
const data = JSON.stringify({
    audio: { content: audioContent },
    config: {
        encoding: 'LINEAR16',
        languageCode: 'pt-BR',
        enableAutomaticPunctuation: true,
        model: 'default'
    },
});

// Definir as opções da requisição HTTP POST
const options = {
    method: 'POST',
    qs: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: {
        'Content-Type': 'application/json',
    },
    body: data,
};

// Enviar a requisição POST utilizando o método "fetch"
fetch('https://speech.googleapis.com/v1/speech:recognize', options)
    .then(response => response.json())
    .then(data => {
        console.log(data?.results[0]?.alternatives);
    })
    .catch(error => console.error(error));
