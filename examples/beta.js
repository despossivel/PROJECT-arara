// curl https://api.openai.com/v1/chat/completions \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer $TOKEN" \
// -d '{
//    "model": "gpt-3.5-turbo",
//    "messages": [{"role": "user", "content": "Say this is a test!"}],
//    "temperature": 0.7
//  }'




// Importe o pacote "request"
const request = require('request');

// Converta o arquivo de áudio em base64
const audioContent = require('fs').readFileSync('/Users/matheus.brito/Documents/lab/PROJECT-arara/output-texttospeech.wav').toString('base64');

// Defina as opções do reconhecimento de voz
const data = JSON.stringify({
    audio: { content: audioContent },
    config: {
        encoding: 'OGG_OPUS',
        languageCode: 'pt-BR',
        enableAutomaticPunctuation: true,
        model: 'default',
        sampleRateHertz: 24000
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


    // console.log(JSON.parse(body))
    // Exiba o resultado do reconhecimento de voz
    // console.log(JSON.parse(body)?.results[0]?.alternatives);



    // const request = require('request');

    const options = {
        url: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        json: {
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": "um dos tres testando" }],
            "temperature": 0.7
        }
    };

    request(options, (error, response, body) => {
        if (error) throw new Error(error);

        // console.log(JSON.parse(body))
        console.log(response.body.choices[0].message.content)
        // Salve o arquivo de áudio no seu sistema de arquivos
        require('fs').writeFileSync('output-speechtotext.wav', "um dos tres testando", 'base64');
        // console.log('Arquivo de áudio salvo!');

    });











});











