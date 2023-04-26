// Importe o pacote "request"
const request = require('request');
const path = require("path")
// Converta o arquivo de áudio em base64
const audioContent = require('fs').readFileSync(path.join(__dirname, 'audio.wav')).toString('base64');
// const inputFilePath = path.join(__dirname, 'audio.mp3');



// Defina as opções do reconhecimento de voz
const data = JSON.stringify({
    audio: { content: audioContent },
    config: {
        encoding: 'LINEAR16',
        languageCode: 'pt-BR',
        enableAutomaticPunctuation: true,
        model: 'default',
        // sampleRateHertz: 16000
    },
});

// Defina as opções da requisição HTTP POST
const options = {
    method: 'POST',
    url: 'https://speech.googleapis.com/v1/speech:recognize',
    qs: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: { 'Content-Type': 'application/json' },
    body: data,
};

// Use o método "request" para enviar a requisição POST
request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(JSON.parse(body))
    // Exiba o resultado do reconhecimento de voz
    console.log(JSON.parse(body)?.results[0]?.alternatives);
});
