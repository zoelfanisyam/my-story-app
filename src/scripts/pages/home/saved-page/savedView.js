const savedView = {
  render() {
    document.querySelector("header").style.display = "block";
    document.querySelector("footer").style.display = "block";
    return `
      <section id="main-content" class="container-homepage">
        <h1>Catatan Tersimpan</h1>
        <div id="storyList">Loading stories...</div>
      </section>
    `;
  },

  showStories(stories) {
    const storyListElement = document.getElementById("storyList");

    if (!stories || stories.length === 0) {
      storyListElement.innerHTML = "<p>No stories found.</p>";
      return;
    }

    const storyCards = stories
      .map(
        (story) => `
        <div class="story-card" data-id="${story.id}">
          <img src="${story.photoUrl}" alt="${story.name}" width="100" />
          <h2>${story.name}</h2>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
          <button class="view-detail-button" data-id="${
            story.id
          }">Lihat Detail</button>
          <button class="delete-story-button" data-id="${
            story.id
          }">Hapus</button>
        </div>
      `
      )
      .join("");

    storyListElement.innerHTML = storyCards;
  },

  showError(errorMessage) {
    const storyListElement = document.getElementById("storyList");
    storyListElement.innerHTML = `<p style="color:red;">❌ ${errorMessage}</p>`;
  },

  bindDetailButtons(callback) {
    document.querySelectorAll(".view-detail-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        callback(id);
      });
    });
  },

  bindDeleteButtons(callback) {
    document.querySelectorAll(".delete-story-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const confirmDelete = confirm("Yakin ingin menghapus story ini?");
        if (confirmDelete) {
          callback(id);
        }
      });
    });
  },
};

export default savedView;
