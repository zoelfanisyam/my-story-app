const AddView = {
  render() {
    return `
    <section id="main-content" class="main-content">
      <h1>Add Story</h1>
      <form id="story-form">
        <article>
          <label for="description">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Tulis deskripsi di sini..."
            required
          ></textarea>
        </article>

        <div class="container-camera">
          <article>
            <h2>Input Kamera</h2>
            <section class="camera">
              <video
                id="camera-video"
                class="camera-video"
                autoplay
                muted
                playsinline
              >
                Video stream not available.
              </video>
              <canvas
                id="camera-canvas"
                class="camera-canvas"
                style="display: none"
              ></canvas>
            </section>
          </article>

          <article class="camera-tools">
            <select id="camera-list-select" class="camera-select"></select>
            <section class="camera-tools-buttons">
              <button id="camera-start-button" class="camera-button" type="button" aria-label="Aktifkan Kamera">
                <img src="images/camera.png" alt="aktif-camera">
              </button>
              <button id="camera-take-button" class="camera-button" type="button" aria-label="Ambil Foto">
                <img src="images/plus.png" alt="add-gambar">
              </button>
              <button id="camera-clear-button" class="camera-button" type="button" aria-label="Hapus Foto">
                <img src="images/minus.png" alt="minus-gambar">
              </button>
              <button id="camera-stop-button" class="camera-button" type="button" aria-label="Matikan Kamera">
                <img src="images/no-camera.png" alt="nonaktif-camera">
              </button>
            </section>
          </article>

          <article>
            <h2>Output Kamera</h2>
            <ul id="camera-list-output" class="camera-output"></ul>
            <input type="hidden" id="image-base64" name="image" />
          </article>
        </div>

        <article>
          <h2>Koordinat Lokasi</h2>
          <div class="coordinates-group">
            <label for="latitude">Latitude</label>
            <input type="text" id="latitude" name="latitude" readonly />

            <label for="longitude">Longitude</label>
            <input type="text" id="longitude" name="longitude" readonly />
          </div>
        </article>

        <div id="map" style="height: 300px;"></div>

        <button type="submit" class="camera-button">Kirim Cerita</button>
      </form>
    </section>
    `;
  },

  getFormData() {
    return {
      base64Image: document.getElementById("image-base64").value,
      description: document.getElementById("description").value,
      latitude: document.getElementById("latitude").value,
      longitude: document.getElementById("longitude").value,
    };
  },

  setCameraElements() {
    return {
      cameraVideo: document.getElementById("camera-video"),
      cameraCanvas: document.getElementById("camera-canvas"),
      cameraListSelect: document.getElementById("camera-list-select"),
      cameraTakeButton: document.getElementById("camera-take-button"),
      cameraClearButton: document.getElementById("camera-clear-button"),
      cameraStopButton: document.getElementById("camera-stop-button"),
      cameraStartButton: document.getElementById("camera-start-button"),
      cameraOutputList: document.getElementById("camera-list-output"),
      imageBase64: document.getElementById("image-base64"),
    };
  },

  showHeaderFooter() {
    document.querySelector("header").style.display = "block";
    document.querySelector("footer").style.display = "block";
  },

  setupCameraHandlers(presenterInstance) {
    const el = this.setCameraElements();
    const video = el.cameraVideo;
    const canvas = el.cameraCanvas;
    const select = el.cameraListSelect;

    let streaming = false;
    let width = 320;
    let height = 0;

    video.addEventListener("canplay", () => {
      if (!streaming) {
        height = (video.videoHeight * width) / video.videoWidth;
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    });

    el.cameraStartButton.addEventListener("click", async () => {
      await presenterInstance.stopCamera();
      const stream = await presenterInstance.getStream(select.value);
      if (stream) presenterInstance.launchCamera(video, stream);
    });

    el.cameraStopButton.addEventListener("click", () =>
      presenterInstance.stopCamera()
    );

    el.cameraTakeButton.addEventListener("click", () => {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, width, height);
      const imageUrl = canvas.toDataURL("image/png");
      el.imageBase64.value = imageUrl;
      el.cameraOutputList.innerHTML = `<li><img src="${imageUrl}" /></li>`;
    });

    el.cameraClearButton.addEventListener("click", () => {
      el.cameraOutputList.innerHTML = "";
      el.imageBase64.value = "";
    });

    select.addEventListener("change", async () => {
      await presenterInstance.stopCamera();
      const stream = await presenterInstance.getStream(select.value);
      if (stream) presenterInstance.launchCamera(video, stream);
    });

    return () => presenterInstance.populateCameraList(select);
  },

  setupMap() {
    const indonesiaCenter = [-2.548926, 118.0148634];
    const map = L.map("map").setView(indonesiaCenter, 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const popup = L.popup();
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      popup
        .setLatLng(e.latlng)
        .setContent(
          `Latitude: ${lat.toFixed(5)}<br>Longitude: ${lng.toFixed(5)}`
        )
        .openOn(map);

      document.getElementById("latitude").value = lat.toFixed(5);
      document.getElementById("longitude").value = lng.toFixed(5);
    });

    this.mapInstance = map;
  },

  setupFormListener(submitHandler) {
    document
      .getElementById("story-form")
      .addEventListener("submit", submitHandler);
  },
};

export default AddView;
