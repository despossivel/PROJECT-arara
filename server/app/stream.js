import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import multer from 'multer';
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import {
  IOSpeechToText
} from "./SpeechToText.js"

import EventEmitter from 'events';

const meuEmitter = new EventEmitter();
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
  const audioFilePath = __dirname + '/audios/stream.wav';
  const fileSize = fs.statSync(audioFilePath).size;
  const chunkSize = 1024 * 1024 * 1; // 1MB
  const numChunks = Math.ceil(fileSize / chunkSize);
  let currentChunk = 0;

  const stream = fs.createReadStream(audioFilePath, { highWaterMark: chunkSize });

  meuEmitter.on('send:audio', () => {
    console.log('O evento "send:audio" foi acionado.');
    stream.on('data', (chunk) => {
      socket.emit('audio', chunk);
      currentChunk++;
      if (currentChunk === numChunks) {
        socket.emit('end');
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/upload', upload.single('audio'), (req, res) => {
  console.log(req.file);

  const ext = path.extname(req.file.originalname);
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
    .on('end', async () => {
      console.log('Arquivo convertido com sucesso para formato WAV.');
      res.send('Arquivo recebido e convertido com sucesso!');

      await IOSpeechToText(newFilePath)
      meuEmitter.emit('send:audio');

    })
    .save(newFilePath);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


