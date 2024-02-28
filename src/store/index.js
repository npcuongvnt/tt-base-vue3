import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import context from './modules/context';
import user from './modules/user';
import role from './modules/role';
import product from './modules/product';
import example from './modules/example';

const debug = import.meta.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        auth,
        context,
        user,
        role,
        product,
        example
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
