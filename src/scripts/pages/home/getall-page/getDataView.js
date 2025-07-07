const getDataView = {
  render() {
    return `
      <section id="main-content" class="container-homepage">
        <h1>Semua Cerita</h1>
        <div id="storyList">Loading...</div>
      </section>
    `;
  },

  showStories(stories, savedIds = new Set()) {
    const storyListElement = document.getElementById("storyList");

    if (!stories || stories.length === 0) {
      storyListElement.innerHTML = "<p>Tidak ada story ditemukan.</p>";
      return;
    }

    const storyCards = stories
      .map((story) => {
        const isSaved = savedIds.has(story.id);
        return `
          <div class="story-card" data-id="${story.id}">
            <img src="${story.photoUrl}" alt="${story.name}" width="100" />
            <h2>${story.name}</h2>
            <p>${story.description}</p>
            <small>${new Date(story.createdAt).toLocaleString()}</small>
            <button class="view-detail-button" data-id="${
              story.id
            }">Lihat Detail</button>
            ${
              isSaved
                ? `<span class="saved-indicator">✅ Tersimpan</span>`
                : `<button class="save-story-button" data-id="${story.id}">Simpan</button>`
            }
          </div>
        `;
      })
      .join("");

    const addCard = `
      <div class="story-card add-card" id="addStoryCard">
        <div class="add-icon">+</div>
        <div>Tambah Cerita</div>
      </div>
    `;

    storyListElement.innerHTML = storyCards + addCard;
  },

  bindDetailButtons(callback) {
    document.querySelectorAll(".view-detail-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        callback(id);
      });
    });
  },

  bindAddButton(callback) {
    const addBtn = document.getElementById("addStoryCard");
    if (addBtn) {
      addBtn.addEventListener("click", () => callback());
    }
  },

  bindSaveButtons(callback) {
    document.querySelectorAll(".save-story-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        callback(id);
      });
    });
  },

  showError(message) {
    const storyListElement = document.getElementById("storyList");
    storyListElement.innerHTML = `<p style="color:red;">❌ ${message}</p>`;
  },

  bindDetailButtons(callback) {
    document.querySelectorAll(".view-detail-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        callback(id);
      });
    });
  },

  bindAddButton(callback) {
    const addBtn = document.getElementById("addStoryCard");
    if (addBtn) {
      addBtn.addEventListener("click", () => callback());
    }
  },
};

export default getDataView;
