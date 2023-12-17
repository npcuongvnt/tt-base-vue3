import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import context from './modules/context';
import user from './modules/user';
import role from './modules/role';
import product from './modules/product';

// const debug = import.meta.env.NODE_ENV !== 'production';
const debug = !import.meta.env.NODE_ENV.PROD;

export default createStore({
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
