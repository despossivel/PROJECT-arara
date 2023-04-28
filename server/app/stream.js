import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import multer from 'multer';

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

  const oldPath = req.file.path;
  const ext = extname(req.file.originalname);
  const newPath = `${oldPath}${ext}`;

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao renomear o arquivo.');
    }

    res.send('Arquivo recebido com sucesso!');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
