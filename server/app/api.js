import { once } from 'node:events'
import { createServer } from 'node:http'
import JWT from 'jsonwebtoken'
import speechToText, { base64SpeechToText } from "./SpeechToText.js"
import textToSpeech from "./TextToSpeech.js"
import Gpt from "./Gpt.js"


import multer from 'multer';
import requestRest from 'request'
import path from 'path'
import { Readable } from 'stream'
import { decode } from 'base64-arraybuffer'
import wav from 'wav'
import fs from 'fs'


const uploadDir = './'; // Diretório para salvar os arquivos de upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = `---${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage });

const DEFAULT_USER = {
  user: 'gpt',
  password: '123'
}

const JWT_KEY = '123'

async function loginRoute(request, response) {
  const { user, password } = JSON.parse(await once(request, 'data'))
  if (user !== DEFAULT_USER.user || password !== DEFAULT_USER.password) {
    response.writeHead(401)
    response.end(JSON.stringify({ error: 'user invalid!' }))
    return
  }
  const token = JWT.sign({ user, message: 'hey duuude!' }, JWT_KEY)

  response.end(JSON.stringify({ token }))
}

function isHeadersValid(headers) {
  try {
    const auth = headers.authorization.replace(/bearer\s/ig, '')
    JWT.verify(auth, JWT_KEY)
    return true
  } catch (error) {
    return false
  }
}

const handler = async (request, response) => {

  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');



  if (request.url === '/login' && request.method === 'POST') {
    return loginRoute(request, response)
  }

  if (request.url === '/text:synthesize' && request.method === 'POST') {
    const dataJSON = JSON.parse(await once(request, 'data'))
    const responseData = await textToSpeech(dataJSON)
    // response.end(JSON.stringify({ result: responseData }))
  }

  if (request.url === '/text:synthesize:with:gpt' && request.method === 'POST') {
    const dataJSON = JSON.parse(await once(request, 'data'))
    const result = await Gpt(dataJSON)
    const response = await textToSpeech(result)
    // response.end(JSON.stringify({ result: responseData }))
  }

  if (request.url === '/speech:recognize:base64' && request.method === 'POST') {
    const dataJSON = (await once(request, 'data')).toString()

    console.log(dataJSON)

    const responseData = await base64SpeechToText(dataJSON)

    // response.end(JSON.stringify({ result: 'responseData' }))
  }

  if (request.method === 'POST' && request.url === '/upload') {
    await upload.single('audio')(request, response, async (err) => {
      if (err) {
        console.error(err);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Erro ao fazer upload do arquivo de áudio');
      } else {
        const responseData = await speechToText(request.file.filename)

        response.end(JSON.stringify({ result: responseData }))
      }
    });
  }

  // if (!isHeadersValid(request.headers)) {
  //   response.writeHead(400)
  //   return response.end(JSON.stringify({ error: 'invalid token!' }))
  // }

  response.end(JSON.stringify({ result: 'Hey welcome!' }))
}

const app = createServer(handler)
  .listen(3000, () => console.log('listening at 3000'))

export { app }
