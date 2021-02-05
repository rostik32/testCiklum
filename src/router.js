import Calendar from './calendar';
import Event from './event';

const routes = [
  {
    path: '',
    component: Calendar,
  },
  {
    path: 'new-event',
    component: Event,
  },
];

const router = {
  getURL() {
    return window.location.hash.slice(1);
  },

  renderRoute() {
    const url = router.getURL();

    const route = routes.find((r) => r.path === url).component();

    const routerView = document.querySelector('#app');

    routerView.innerHTML = route.HTML;
    route.addListeners();
  },

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute);
    this.renderRoute();
  },
};

export default router;
