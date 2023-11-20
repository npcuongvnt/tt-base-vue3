import { createStore, createLogger } from 'vuex';
import context from './modules/context';
import user from './modules/user';
import role from './modules/role';
import product from './modules/product';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        context,
        user,
        role,
        product
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
