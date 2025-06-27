import { getStoryDetail } from "../../../data/api";
import getDetailDataView from "./getDetailDataView";

export default class getDetailDataPresenter {
  async render() {
    return getDetailDataView.render();
  }

  async afterRender() {
    const hash = window.location.hash;
    const id = hash.split("/")[2];

    try {
      const result = await getStoryDetail(id);
      const story = result.story;

      getDetailDataView.showStoryDetail(story);

      if (story.lat !== undefined && story.lon !== undefined) {
        getDetailDataView.showMap(
          story.lat,
          story.lon,
          story.name,
          story.description
        );
      } else {
        getDetailDataView.showNoLocation();
      }
    } catch (error) {
      getDetailDataView.showError(error.message);
    }
  }
}
