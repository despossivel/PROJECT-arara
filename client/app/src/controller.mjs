export default class Controller {
    constructor({ view, media, recorder, apiConsumer }) {
        this.view = view
        this.media = media
        this.recorder = recorder
        this.apiConsumer = apiConsumer

    }

    static initialize(dependencies) {
        const instance = new Controller(dependencies)

        return instance._init()
    }

    _init() {
        this.view.configureStartRecordingButton(this.onStartRecording.bind(this))
        this.view.configureStopRecordingButton(this.onStopRecording.bind(this))
    }

    async onStartRecording() {
        const audioStream = await this.media.getAudio()
        this.recorder.startRecording(audioStream)
    }

    async onStopRecording() {
        this.recorder.stopRecording()

        setTimeout(async () => {
            const audioURL = await this.recorder.getRecordingURL()
            this.apiConsumer._run(this.recorder.recordedBase64)
            this.view.playAudio(audioURL)
        });
    }
}