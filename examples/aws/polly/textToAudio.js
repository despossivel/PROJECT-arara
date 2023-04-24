const {
  Polly
} = require("@aws-sdk/client-polly");
const fs = require('fs');

// Configuração do AWS Polly
const polly = new Polly({
  region: 'us-west-2', // substitua pela sua região da AWS
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

// Parâmetros para o texto e voz
const params = {
  Text: 'Olá, mundo!', // substitua pelo texto que deseja converter em áudio
  OutputFormat: 'mp3', // formato de saída de áudio
  VoiceId: 'Joanna' // substitua pela voz que deseja usar
};

// Chamada para o AWS Polly
polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  // Salva o arquivo de áudio em disco
  fs.writeFile('audio.mp3', data.AudioStream, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Arquivo de áudio salvo com sucesso!');
  });
});
