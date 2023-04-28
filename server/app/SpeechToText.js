
import requestRest from 'request'
import path from 'path'
import fs from 'fs'
import { decode } from 'base64-arraybuffer'
import Gpt from "./Gpt.js"

import { Readable } from 'stream'

import wav from 'wav'


import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import textToSpeech from "./TextToSpeech.js"

// import fs from 'fs';
import axios from 'axios';



export async function IOSpeechToText(audioFilePath) {
  // const audioFilePath = __dirname + '/audios/mic.wav';



  const audioContent = fs.readFileSync(audioFilePath).toString('base64');

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
    params: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  // Use o método "axios" para enviar a requisição POST
  try {
    const response = await axios(options);
    console.log(response.data.results[0].alternatives[0].transcript);


    const responseGPT = await Gpt({
      text: response.data.results[0].alternatives[0].transcript
    })

    console.log(responseGPT)

    textToSpeech(responseGPT);

  } catch (error) {
    throw new Error(error);
  }
}



export async function getSpeechToText() {
  const audioFilePath = __dirname + '/audios/mic.wav';



  const audioContent = fs.readFileSync(audioFilePath).toString('base64');

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
    params: { key: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8' },
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  // Use o método "axios" para enviar a requisição POST
  try {
    const response = await axios(options);
    console.log(response.data.results[0].alternatives);





  } catch (error) {
    throw new Error(error);
  }
}




export async function base64SpeechToText() {


  const audioFilePath = __dirname + '/audios/mic.wav';



  const audioContent = fs.readFileSync(audioFilePath).toString('base64');


  // return audioContent;

  // // Defina as opções do reconhecimento de voz
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



