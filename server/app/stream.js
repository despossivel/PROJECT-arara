import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import multer from 'multer';
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const upload = multer({ dest: __dirname + '/uploads/' });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Send audio file to the client in chunks
  const audioFilePath = __dirname + '/audios/mic.wav';
  const fileSize = fs.statSync(audioFilePath).size;
  const chunkSize = 1024 * 1024 * 1; // 1MB
  const numChunks = Math.ceil(fileSize / chunkSize);
  let currentChunk = 0;



  const stream = fs.createReadStream(audioFilePath, { highWaterMark: chunkSize });

  stream.on('data', (chunk) => {
    socket.emit('audio', chunk);
    currentChunk++;

    if (currentChunk === numChunks) {
      socket.emit('end');
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/upload', upload.single('audio'), (req, res) => {
  console.log(req.file);

  const ext = path.extname(req.file.originalname);
  // if (ext !== '.mp3') {
  //   return res.status(400).send('Formato de arquivo inválido. Apenas arquivos MP3 são aceitos.');
  // }

  const audioFilePath = req.file.path;
  const originalname = req.file.originalname;
  const newFilePath = path.join(path.dirname(audioFilePath), path.basename(audioFilePath, ext) + '.wav');


  console.log('originalname >>> ', path.join(path.dirname(audioFilePath), path.basename(audioFilePath, ext) + '.wav'))


  ffmpeg(audioFilePath)
    .toFormat('wav')
    .on('error', (err) => {
      console.error(err);
      res.status(500).send('Erro ao converter arquivo para formato WAV.');
    })
    .on('end', () => {
      console.log('Arquivo convertido com sucesso para formato WAV.');
      res.send('Arquivo recebido e convertido com sucesso!');
    })
    .save(newFilePath);
});




server.listen(3000, () => {
  console.log('listening on *:3000');
});



function createWavFile(audioContent, audioFilePath) {
  const wavData = new Uint8Array(44 + audioContent.length);
  const audioView = new DataView(wavData.buffer);

  const audioFormat = 1;
  const numChannels = 1;
  const sampleRate = 16000;
  const bitsPerSample = 16;

  audioView.setUint32(0, 0x46464952, false);
  audioView.setUint32(4, 36 + audioContent.length, true);
  audioView.setUint32(8, 0x45564157, false);
  audioView.setUint32(12, 0x20746d66, false);
  audioView.setUint32(16, 16, true);
  audioView.setUint16(20, audioFormat, true);
  audioView.setUint16(22, numChannels, true);
  audioView.setUint32(24, sampleRate, true);
  audioView.setUint32(28, sampleRate * numChannels * bitsPerSample / 8, true);
  audioView.setUint16(32, numChannels * bitsPerSample / 8, true);
  audioView.setUint16(34, bitsPerSample, true);
  audioView.setUint32(36, 0x61746164, false);
  audioView.setUint32(40, audioContent.length, true);
  wavData.set(audioContent, 44);

  fs.writeFileSync(audioFilePath, wavData);
}