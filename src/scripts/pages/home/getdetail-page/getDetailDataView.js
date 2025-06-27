const getDataDetailView = {
  render() {
    document.querySelector("header").style.display = "block";
    document.querySelector("footer").style.display = "block";

    return `
      <section id="main-content" class="container-detail">
        <h1>Detail Cerita</h1>
        <div id="storyDetail">Memuat detail...</div>
        <div id="map" style="height: 300px; margin-top: 1rem;"></div>
      </section>
    `;
  },

  showStoryDetail(story) {
    const detailEl = document.getElementById("storyDetail");
    detailEl.innerHTML = `
      <img src="${story.photoUrl}" alt="${story.name}" width="200" />
      <h2>${story.name}</h2>
      <p>${story.description}</p>
      <small>Dibuat pada: ${new Date(story.createdAt).toLocaleString()}</small>
    `;
  },

  showMap(lat, lon, name, description) {
    const map = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<b>${name}</b><br>${description}`).openPopup();
  },

  showNoLocation() {
    document.getElementById("map").innerHTML = "<p>Lokasi tidak tersedia.</p>";
  },

  showError(message) {
    const detailEl = document.getElementById("storyDetail");
    detailEl.innerHTML = `<p style="color:red;">❌ ${message}</p>`;
  },
};

export default getDataDetailView;
