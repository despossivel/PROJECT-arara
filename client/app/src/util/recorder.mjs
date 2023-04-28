export default class Recorder {
    constructor() {
        this.audioType = 'audio/webm;codecs=opus'
        this.mediaRecorder = {}
        this.recordedBase64 = ''
        this.recordedBlobs = []
    }

    _setup() {
        const options = { mimeType: this.audioType }
        const isSupported = MediaRecorder.isTypeSupported(options.mimeType)
        if (!isSupported) {
            const msg = `the codec: ${options.mimeType} isn't supported!!`
            alert(msg)

            throw new Error(msg)
        }

        return options
    }

    startRecording(stream) {
        const options = this._setup()
        this.mediaRecorder = new MediaRecorder(stream, options)

        this.mediaRecorder.onstop = (event) => {
            console.log('Recorded Blobs', this.recordedBlobs)
        }

        this.mediaRecorder.ondataavailable = (event) => {
            if (!event.data || !event.data.size) return;

            this.recordedBlobs.push(event.data)
        }


        this.mediaRecorder.start()
        // console.log('Media Recorded started', this.mediaRecorder)
    }

    blobToBase64(blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    async stopRecording() {
        if (this.mediaRecorder.state === "inactive") return;
        this.mediaRecorder.stop()
        // console.log('media recorded stopped!')
    }


    async getRecordingURL() {
        const blob = new Blob(this.recordedBlobs, { type: this.audioType })
        const url = URL.createObjectURL(blob);
        const xhr = new XMLHttpRequest();

        const formData = new FormData(); // Cria um objeto FormData
        formData.append('audio', blob, 'audio.wav'); // Adiciona o arquivo de áudio ao formulário

        xhr.open('POST', 'http://192.168.1.135:3000/upload', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Áudio enviado com sucesso!');
            } else {
                console.error('Ocorreu um erro ao enviar o áudio.');
            }
        };
        xhr.onerror = function () {
            console.error('Ocorreu um erro ao enviar o áudio.');
        };
        xhr.send(formData);

 
        const res = await this.blobToBase64(blob)
         
        // do what you wanna do
        // console.log('res >>> ', res); // res is base64 now
        this.recordedBase64 = res;
        // });
        return window.URL.createObjectURL(blob)
    }
}