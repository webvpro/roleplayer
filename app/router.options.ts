import type {RouterConfig} from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;

    if (to.hash && to.path == from.path) {
      const el = document.querySelector(to.hash);
      console.log('fired');
      return {top: 24, left: 0, behavior: 'smooth'};
    }

    return {
      top: 12,
      left: 0,
    };
  },
};
