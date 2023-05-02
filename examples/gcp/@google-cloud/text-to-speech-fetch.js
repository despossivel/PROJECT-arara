const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { decode } = require('base64-arraybuffer');
const wav = require('wav');

const outputFilePath = path.join(__dirname, 'audio2.wav');

const data = JSON.stringify({
  input: { text: 'Um, dois, tres, testando com fetch' },
  voice: { languageCode: 'pt-BR', ssmlGender: 'FEMALE' },
  audioConfig: { audioEncoding: 'LINEAR16' },
});

const options = {
  method: 'POST',
  qs: { key: 'TOKEN' },
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer TOKEN` // Substitua pelo seu token de acesso à API
  },
  body: data,
};

fetch('https://texttospeech.googleapis.com/v1/text:synthesize', options)
  .then(response => response.json())
  .then(data => {

    console.log(data)
    const arrayBuffer = decode(data.audioContent);
    const buffer = Buffer.from(arrayBuffer);

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    const writer = new wav.FileWriter(outputFilePath, {
      sampleRate: 16000,
      channels: 1,
      bitDepth: 16,
    });

    readable.pipe(writer);

    console.log('Arquivo WAV gerado com sucesso!');
  })
  .catch(error => console.error(error));
