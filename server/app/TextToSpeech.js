

import requestRest from 'request'
import path from 'path'
import { Readable } from 'stream'
import { decode } from 'base64-arraybuffer'
import wav from 'wav'
import fs from 'fs'



export default async function textToSpeech(text) {

    const outputFilePath = path.join('', 'audio.wav');

    // question frrom GPC: dataJSON.text


    


    // anwser gpt synthesize

    const data = JSON.stringify({
        input: { text: text },
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

    requestRest(options, (error, response, body) => {
        if (error) throw new Error(error);


        // console.log(JSON.parse(body).audioContent)

        // console.log(JSON.parse(body).audioContent)
        // Decode o conteúdo Base64 do arquivo de áudio retornado pela API
        const arrayBuffer = decode(JSON.parse(body).audioContent);
        const buffer = Buffer.from(arrayBuffer)

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



}



