// Importe o pacote "request"
const request = require('request');

// Defina as opções de voz e áudio
const data = JSON.stringify({
    input: { text: 'hi!' },
    voice: { languageCode: 'pt-BR', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'OGG_OPUS' },
});

// Defina as opções da requisição HTTP POST
const options = {
    method: 'POST',
    url: 'https://texttospeech.googleapis.com/v1/text:synthesize',
    qs: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: { 'Content-Type': 'application/json' },
    body: data,
};

// Use o método "request" para enviar a requisição POST
request(options, (error, response, body) => {
    if (error) throw new Error(error);

    // Salve o arquivo de áudio no seu sistema de arquivos
    require('fs').writeFileSync('output-texttospeech.wav', JSON.parse(body).audioContent, 'base64');
    console.log('Arquivo de áudio salvo!');
});
