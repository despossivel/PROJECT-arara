// AIzaSyDzqt48xbBD11K8p4ActAGX4iBw29ACv50


// Importa o pacote @google-cloud/text-to-speech
const textToSpeech = require('@google-cloud/text-to-speech');

// Cria um cliente para acessar a API
const client = new textToSpeech.TextToSpeechClient({
    // Configura as credenciais da conta de serviço
    keyFilename: '/Users/matheus.brito/Documents/lab/PROJECT-arara/examples/gcp/@google-cloud/text-to-speech/cc.json'
});

// Configura o texto a ser convertido em áudio
const request = {
    input: { text: 'Olá, tudo bem?' },
    voice: { languageCode: 'pt-BR', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' }
};

// Faz a chamada à API e obtém o áudio gerado
client.synthesizeSpeech(request, (err, response) => {
    if (err) {
        console.error('Erro ao converter texto em áudio:', err);
        return;
    }

    console.log(response.audioContent)
    // Salva o áudio em um arquivo local
    // require('fs').writeFileSync('output.mp3', response.audioContent, 'binary');
    console.log('Áudio gerado com sucesso!');
});
