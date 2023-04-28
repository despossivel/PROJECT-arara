import Controller from "./controller.mjs";
import Media from "./util/media.mjs";
import Recorder from "./util/recorder.mjs";
import ApiConsumer from "./util/api-consumer.mjs"
import View from "./view.mjs";

const view = new View()
const media = new Media()
const recorder = new Recorder()
const apiConsumer = new ApiConsumer()

Controller.initialize({
    view,
    media,
    recorder,
    apiConsumer
})