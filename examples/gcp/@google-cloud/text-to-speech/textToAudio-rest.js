// Importa as bibliotecas necessárias
const fs = require('fs');
const request = require('request');
const { GoogleAuth } = require('google-auth-library');


// gcloud auth application-default print-access-token

// 394570274460-6b1208s28g2se2ckplqn5ikhkh2jp0fr.apps.googleusercontent.com
// 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

const CHAT_GPD_API_KEY = `Bearer ya29.a0Ael9sCP5bXsk0HqMHNGpzpIe75-aFv5xzXMuahS9rmVBOjRmpVO6HToMr-4mZVpUOz5N6iarynXTqfjn-Dovi7CgxMY2AP4gXhOWpLmMMlBK7hJreS6MZqRR60uJVACeMnGLxrGWVV5D5oKAZ3A8_jZWwHluwJEaCgYKASsSARASFQF4udJhPtzFAwoFN84n6wTQZDeDbA0166`
// curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ya29.a0Ael9sCP5bXsk0HqMHNGpzpIe75-aFv5xzXMuahS9rmVBOjRmpVO6HToMr-4mZVpUOz5N6iarynXTqfjn-Dovi7CgxMY2AP4gXhOWpLmMMlBK7hJreS6MZqRR60uJVACeMnGLxrGWVV5D5oKAZ3A8_jZWwHluwJEaCgYKASsSARASFQF4udJhPtzFAwoFN84n6wTQZDeDbA0166" https://speech.googleapis.com/v1/speech:recognize -d '{
//     "config": {
//       "languageCode": "pt-BR",
//       "encoding": "LINEAR16",
//       "sampleRateHertz": 41000
//     },
//     "audio": {
//       "content": "'"$base64File"'"
//     }
// }'

const prompt = `Hi! Hi! Hi! Hi! Hi!`;


// fetch("https://api.openai.com/v1/engines/text-davinci-003-playground/completions", {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${CHAT_GPD_API_KEY}`
//   },
//   body: JSON.stringify({
//     prompt,
//     temperature: 0.22,
//     max_tokens: 500,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   }),
// })



// Configura as informações da solicitação de autenticação
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Faz a autenticação com as credenciais da conta de serviço
auth.getClient().then((client) => {
  // Configura as informações da solicitação de token de acesso
  const tokenRequest = {
    url: `https://oauth2.googleapis.com/token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'AIzaSyCv4pgzGr4JIBEQWqqOUexAk2VFwFdG3J8',
      client_id: client.credentials.client_id,
      client_secret: client.credentials.client_secret
    }
  };

  // Faz a chamada à API OAuth2 para obter um token de acesso
  request(tokenRequest, (err, response, body) => {
    if (err) {
      console.error('Erro ao obter o token de acesso:', err);
      return;
    }

    console.log(tokenRequest)

    // Converte o texto em áudio usando a API REST do Cloud Speech-to-Text
    const accessToken = JSON.parse(body).access_token;
    const text = 'Olá, tudo bem?';
    const voice = {
      languageCode: 'pt-BR',
      name: 'pt-BR-Wavenet-A',
      ssmlGender: 'FEMALE'
    };
    const audioConfig = { audioEncoding: 'MP3' };


    console.log(accessToken)

    const speechRequest = {
      url: 'https://texttospeech.googleapis.com/v1/text:synthesize',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        input: { text },
        voice,
        audioConfig
      })
    };

    // Faz a chamada à API REST para converter o texto em áudio
    request(speechRequest)
      .on('error', (err) => {
        console.error('Erro ao converter texto em áudio:', err);
      })
      .pipe(fs.createWriteStream('output.mp3'))
      .on('finish', () => {
        console.log('Áudio gerado com sucesso!');
      });
  });
}).catch((err) => {
  console.error('Erro ao fazer a autenticação:', err);
});
