export default class ApiConsumer {
    constructor() {
        this._init()

        this.options = {
            method: this.method,
            url: this.url,
            qs: this.qs,
            headers: this.headers,
            // body: data,
        }

    }

    _init() {

    }

    _run(audioContent) {
        console.log('send base64:')
        // console.log('audioContent : ', audioContent)


        // Base64 string do arquivo de áudio
        const base64String = audioContent //"data:audio/wav;base64,UklGRh...";

        // Decodificar a string base64
        const binaryString = atob(base64String.split(",")[1]);

        // Converter o binário em um ArrayBuffer
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const bufferView = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryString.length; i++) {
            bufferView[i] = binaryString.charCodeAt(i);
        }

        // Criação do contexto de áudio
        const audioContext = new AudioContext();

        console.log(audioContext)

        // Decodifica o ArrayBuffer em um buffer de áudio
        audioContext.decodeAudioData(arrayBuffer, function (buffer) {
            // Cria um nó de áudio para o buffer de áudio
            const source = audioContext.createBufferSource();
            source.buffer = buffer;

            // console.log(base64String)

            // fetch('http://192.168.1.135:3000/speech:recognize:base64', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: String(base64String)
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Erro ao fazer a requisição');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         console.log(data);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });

            // const outputFilePath = path.join('', 'audio-base64.wav');


            // const audioContent = base64String.toString();

            // const arrayBuffer = decode(audioContent);
            // const buffer = Buffer.from(arrayBuffer)
            // // Converter o buffer em um stream legível
            // const readable = new Readable();
            // readable.push(buffer);
            // readable.push(null);
            // // Criar um stream gravável para o arquivo WAV de saída
            // const writer = new wav.FileWriter(outputFilePath, {
            //     sampleRate: 16000,
            //     channels: 1,
            //     bitDepth: 16,
            // });
            // // Pipe o stream legível para o stream gravável
            // readable.pipe(writer);
            // console.log('Arquivo WAV gerado com sucesso!');



            // const audioPath = base64String.split(",")[0];
            // // console.log("Caminho do arquivo de áudio: ", audioPath);

            // // Conectar o nó de áudio à saída do contexto de áudio
            // source.connect(audioContext.destination);

            // // Iniciar a reprodução do áudio
            // source.start(0);
        });



    }


}

