import { createStore, createLogger } from 'vuex';
import auth from './auth.module';
import context from './context.module';
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
        auth,
        context,
        user,
        role,
        product
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
