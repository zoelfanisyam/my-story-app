// import { getAllStories } from "../../../data/api";
// import getDataView from "./getDataView";

// export default class getDataPresenter {
//   async render() {
//     return getDataView.render();
//   }

//   async afterRender() {
//     try {
//       const result = await getAllStories();
//       const stories = result.listStory;
//       getDataView.showStories(stories);

//       getDataView.bindAddButton(() => {
//         if (document.startViewTransition) {
//           document.startViewTransition(() => {
//             window.location.hash = "/add";
//           });
//         } else {
//           window.location.hash = "/add";
//         }
//       });

//       getDataView.bindDetailButtons((id) => {
//         if (document.startViewTransition) {
//           document.startViewTransition(() => {
//             window.location.hash = `/detail/${id}`;
//           });
//         } else {
//           window.location.hash = `/detail/${id}`;
//         }
//       });
//     } catch (error) {
//       getDataView.showError(error.message);
//     }
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
      // ✅ 1. Ambil data dari API
      const result = await getAllStories();
      const storiesFromAPI = result.listStory;

      // ✅ 2. Simpan data ke IndexedDB
      await StoryIDB.clear(); // optional: hapus data lama
      await Promise.all(storiesFromAPI.map((story) => StoryIDB.put(story)));
    } catch (error) {
      console.warn("Gagal fetch API, ambil dari cache:", error.message);
    }

    // ✅ 3. Ambil data dari IndexedDB untuk ditampilkan
    const cachedStories = await StoryIDB.getAll();
    getDataView.showStories(cachedStories);

    // 🧩 Bind tombol-tombol setelah render
    this._bindAllButtons();
  }

  _bindAllButtons() {
    getDataView.bindAddButton(() => {
      window.location.hash = "/add";
    });

    getDataView.bindDetailButtons((id) => {
      window.location.hash = `/detail/${id}`;
    });

    getDataView.bindDeleteButtons(async (id) => {
      await StoryIDB.delete(id);
      const updated = await StoryIDB.getAll();
      getDataView.showStories(updated);
      this._bindAllButtons(); // re-bind
    });
  }
}
