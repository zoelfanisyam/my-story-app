import { addDataStory } from "../../../data/api";
import AddView from "./addView";

export default class AddPresenter {
  constructor() {
    this.currentStream = null;
  }

  render() {
    return AddView.render();
  }

  async afterRender() {
    AddView.showHeaderFooter();

    AddView.setupMap();

    const populateCameraList = AddView.setupCameraHandlers(this);
    await populateCameraList();

    const el = AddView.setCameraElements();
    const stream = await this.getStream(el.cameraListSelect.value);
    if (stream) this.launchCamera(el.cameraVideo, stream);

    AddView.setupFormListener(this.handleSubmit.bind(this));

    window.addEventListener("hashchange", () => this.stopCamera());
  }

  async getStream(deviceId) {
    try {
      const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.currentStream = stream;
      return stream;
    } catch (error) {
      alert("Gagal mengakses kamera: " + error.message);
      return null;
    }
  }

  async populateCameraList(select) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videos = devices.filter((d) => d.kind === "videoinput");
    select.innerHTML = videos
      .map(
        (d, i) =>
          `<option value="${d.deviceId}">${
            d.label || `Camera ${i + 1}`
          }</option>`
      )
      .join("");
  }

  launchCamera(video, stream) {
    video.srcObject = stream;
    video.play();
  }

  stopCamera() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((t) => t.stop());
      this.currentStream = null;
    }
    const el = AddView.setCameraElements();
    el.cameraVideo.srcObject = null;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { base64Image, description, latitude, longitude } =
      AddView.getFormData();

    try {
      await addDataStory(base64Image, description, latitude, longitude);
      alert("Cerita berhasil ditambahkan!");

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          window.location.hash = "#/home";
        });
      } else {
        window.location.hash = "#/home";
      }
    } catch (error) {
      alert(`Gagal submit cerita: ${error.message}`);
    }
  }
}
