const request = require('request');
const path = require('path');
const { Readable } = require('stream');
const { decode } = require('base64-arraybuffer');
const wav = require('wav');

const outputFilePath = path.join(__dirname, 'audio.wav');

const data = JSON.stringify({
  input: { text: 'Um, dois, tres, testando' },
  voice: { languageCode: 'pt-BR', ssmlGender: 'FEMALE' },
  audioConfig: { audioEncoding: 'LINEAR16' },
});

const options = {
  method: 'POST',
  url: 'https://texttospeech.googleapis.com/v1/text:synthesize',
  qs: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
  headers: { 'Content-Type': 'application/json' },
  body: data,
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);

  // Decode o conteúdo Base64 do arquivo de áudio retornado pela API
  const arrayBuffer = decode(JSON.parse(body).audioContent);
  const buffer = Buffer.from(arrayBuffer);

  // Converter o buffer em um stream legível
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);

  // Criar um stream gravável para o arquivo WAV de saída
  const writer = new wav.FileWriter(outputFilePath, {
    sampleRate: 16000,
    channels: 1,
    bitDepth: 16,
  });

  // Pipe o stream legível para o stream gravável
  readable.pipe(writer);
  console.log('Arquivo WAV gerado com sucesso!');
});
