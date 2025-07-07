import LoginPresenter from "../pages/auth/login/loginPresenter";
import RegisterPresenter from "../pages/auth/register/registerPresenter";
import getDataPresenter from "../pages/home/getall-page/getDataPresenter";
import AddPresenter from "../pages/home/add-data/addPresenter";
import getDetailDataPresenter from "../pages/home/getdetail-page/getDetailDataPresenter";
import SavedPresenter from "../pages/home/saved-page/savedPresenter";

const login = new LoginPresenter();
const register = new RegisterPresenter();
const home = new getDataPresenter();
const getDetail = new getDetailDataPresenter();
const add = new AddPresenter();
const saved = new SavedPresenter();

const routes = {
  "/": {
    render: () => login.render(),
    afterRender: () => login.afterRender(),
  },
  "/register": {
    render: () => register.render(),
    afterRender: () => register.afterRender(),
  },
  "/home": {
    render: () => home.render(),
    afterRender: () => home.afterRender(),
  },
  "/add": {
    render: () => add.render(),
    afterRender: () => add.afterRender(),
  },
  "/detail/:id": {
    render: () => getDetail.render(),
    afterRender: () => getDetail.afterRender(),
  },
  "/saved": {
    render: () => saved.render(),
    afterRender: () => saved.afterRender(),
  },
};

export default routes;
