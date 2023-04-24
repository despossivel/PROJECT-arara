// Importa o pacote @google-cloud/speech
const speech = require('@google-cloud/speech');

// Cria um cliente para acessar a API
const client = new speech.SpeechClient({
  // Configura as credenciais da conta de serviço
  keyFilename: '/path/to/credentials.json'
});

// Configura o arquivo de áudio para transcrever
const file = {
  uri: 'gs://bucket/audiofile.wav'
};

// Configura as opções de reconhecimento de fala
const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'pt-BR'
};

// Cria uma solicitação de reconhecimento de fala
const request = {
  audio: file,
  config: config
};

// Faz a chamada à API e obtém a transcrição do áudio
client.recognize(request)
  .then(data => {
    const transcription = data[0].results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcrição: ${transcription}`);
  })
  .catch(err => {
    console.error('Erro ao converter áudio em texto:', err);
  });
