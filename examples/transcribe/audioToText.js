const {
  Transcribe: TranscribeService
} = require("@aws-sdk/client-transcribe");
const fs = require('fs');

// Configuração do AWS Transcribe
const transcribe = new TranscribeService({
  region: 'us-west-2', // substitua pela sua região da AWS
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

// Parâmetros para o arquivo de áudio
const params = {
  Media: { MediaFileUri: 's3://my-audio-bucket/my-audio-file.mp3' }, // substitua pela URL do seu arquivo de áudio
  MediaFormat: 'mp3', // formato do arquivo de áudio
  LanguageCode: 'pt-BR' // idioma do arquivo de áudio
};

// Chamada para o AWS Transcribe
transcribe.startTranscriptionJob(params, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Job ID:', data.TranscriptionJob.TranscriptionJobName);
});

// Obtém o resultado da transcrição
transcribe.getTranscriptionJob({ TranscriptionJobName: 'JOB_NAME' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  if (data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
    // Lê o arquivo de texto gerado
    const transcriptUri = data.TranscriptionJob.Transcript.TranscriptFileUri;
    const req = https.get(transcriptUri, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const transcript = JSON.parse(data).results.transcripts[0].transcript;
        console.log('Transcrição:', transcript);
      });
    });
    req.on('error', (err) => {
      console.log(err);
    });
  }
});
