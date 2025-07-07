// import { getAllStories } from "../../../data/api";
// import getDataView from "./getDataView";
// import { StoryIDB } from "../../../utils/idb";

// export default class getDataPresenter {
//   async render() {
//     return getDataView.render();
//   }

//   async afterRender() {
//     try {
//       // ✅ 1. Ambil data dari API
//       const result = await getAllStories();
//       const storiesFromAPI = result.listStory;

//       // ✅ 2. Simpan data ke IndexedDB
//       await StoryIDB.clear(); // optional: hapus data lama
//       await Promise.all(storiesFromAPI.map((story) => StoryIDB.put(story)));
//     } catch (error) {
//       console.warn("Gagal fetch API, ambil dari cache:", error.message);
//     }

//     // ✅ 3. Ambil data dari IndexedDB untuk ditampilkan
//     const cachedStories = await StoryIDB.getAll();
//     getDataView.showStories(cachedStories);

//     // 🧩 Bind tombol-tombol setelah render
//     this._bindAllButtons();
//   }

//   _bindAllButtons() {
//     getDataView.bindAddButton(() => {
//       window.location.hash = "/add";
//     });

//     getDataView.bindDetailButtons((id) => {
//       window.location.hash = `/detail/${id}`;
//     });

//     getDataView.bindDeleteButtons(async (id) => {
//       await StoryIDB.delete(id);
//       const updated = await StoryIDB.getAll();
//       getDataView.showStories(updated);
//       this._bindAllButtons(); // re-bind
//     });
//   }
// }

import { getAllStories } from "../../../data/api";
import getDataView from "./getDataView";
import { StoryIDB } from "../../../utils/idb";

export default class getDataPresenter {
  async render() {
    return getDataView.render();
  }

  async afterRender() {
    try {
      // 1. Ambil data dari API
      const result = await getAllStories();
      const stories = result.listStory;

      // 2. Ambil ID story yang sudah disimpan di IndexedDB
      const saved = await StoryIDB.getAll();
      const savedIds = new Set(saved.map((s) => s.id));

      // 3. Tampilkan semua data API ke halaman
      getDataView.showStories(stories, savedIds);

      // 4. Bind tombol "Simpan" ke story yang belum disimpan
      this._bindAllButtons();
      this._bindSaveButtons(stories);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
      getDataView.showError("Gagal mengambil data dari server.");
    }
  }

  _bindAllButtons() {
    getDataView.bindAddButton(() => {
      window.location.hash = "/add";
    });

    getDataView.bindDetailButtons((id) => {
      window.location.hash = `/detail/${id}`;
    });
  }

  _bindSaveButtons(stories) {
    getDataView.bindSaveButtons(async (id) => {
      const story = stories.find((s) => s.id === id);
      if (!story) return;

      await StoryIDB.put(story);

      // Ambil ulang data tersimpan untuk update UI
      const updated = await StoryIDB.getAll();
      const savedIds = new Set(updated.map((s) => s.id));

      getDataView.showStories(stories, savedIds);
      this._bindSaveButtons(stories); // re-bind setelah re-render
    });
  }
}
