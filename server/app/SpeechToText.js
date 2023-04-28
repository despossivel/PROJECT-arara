
import requestRest from 'request'
import path from 'path'
import fs from 'fs'
import { decode } from 'base64-arraybuffer'

 
import { Readable } from 'stream'
 
import wav from 'wav'
 



export async function base64SpeechToText(audioFile) {


  // const outputFilePath = path.join('', 'audio-base64.wav');


  // const audioContent = audioFile.toString();

  // const arrayBuffer = decode(audioContent);
  // const buffer = Buffer.from(arrayBuffer)
  // // Converter o buffer em um stream legível
  // const readable = new Readable();
  // readable.push(buffer);
  // readable.push(null);
  // // Criar um stream gravável para o arquivo WAV de saída
  // const writer = new wav.FileWriter(outputFilePath, {
  //   sampleRate: 16000,
  //   channels: 1,
  //   bitDepth: 16,
  // });
  // // Pipe o stream legível para o stream gravável
  // readable.pipe(writer);
  // console.log('Arquivo WAV gerado com sucesso!');




  // Defina as opções do reconhecimento de voz
  const data = JSON.stringify({
    audio: { content: audioContent.replace('data:audio/webm;codecs=opus;base64,', '') },
    config: {
      encoding: 'LINEAR16',
      languageCode: 'pt-BR',
      enableAutomaticPunctuation: true,
      model: 'default',
      // sampleRateHertz: 16000
    },
  });

  // console.log(audioContent)
  // Defina as opções da requisição HTTP POST
  const options = {
    method: 'POST',
    url: 'https://speech.googleapis.com/v1/speech:recognize',
    qs: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: { 'Content-Type': 'application/json' },
    body: data,
  };

  // Use o método "request" para enviar a requisição POST
  requestRest(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(JSON.parse(body))
    // Exiba o resultado do reconhecimento de voz
    console.log(JSON.parse(body)?.results[0]?.alternatives);
  });
}





export default async function speechToText(audioFile) {

  const audioContent = fs.readFileSync(path.join('', audioFile)).toString('base64');


 

  // Defina as opções do reconhecimento de voz
  const data = JSON.stringify({
    audio: { content: audioContent.replace('data:audio/webm;codecs=opus;base64,', '') },
    config: {
      encoding: 'LINEAR16',
      languageCode: 'pt-BR',
      enableAutomaticPunctuation: true,
      model: 'default',
      // sampleRateHertz: 16000
    },
  });

  // console.log(audioContent)
  // Defina as opções da requisição HTTP POST
  const options = {
    method: 'POST',
    url: 'https://speech.googleapis.com/v1/speech:recognize',
    qs: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: { 'Content-Type': 'application/json' },
    body: data,
  };

  // Use o método "request" para enviar a requisição POST
  requestRest(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(JSON.parse(body))
    // Exiba o resultado do reconhecimento de voz
    console.log(JSON.parse(body)?.results[0]?.alternatives);
  });
}



