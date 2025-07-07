import { StoryIDB } from "../../../utils/idb";
import savedView from "./savedView";

class SavedPresenter {
  async render() {
    return savedView.render();
  }

  async afterRender() {
    const stories = await StoryIDB.getAll();
    savedView.showStories(stories);

    this._bindAllButtons();
  }
  _bindAllButtons() {
    // savedView.bindAddButton(() => {
    //   window.location.hash = "/add";
    // });

    savedView.bindDetailButtons((id) => {
      window.location.hash = `/detail/${id}`;
    });

    savedView.bindDeleteButtons(async (id) => {
      await StoryIDB.delete(id);
      const updated = await StoryIDB.getAll();
      savedView.showStories(updated);
      this._bindAllButtons(); // re-bind
    });
  }
}

export default SavedPresenter;
