import { createStore, createLogger } from 'vuex';
import auth from './modules/auth.module';
import context from './modules/context.module';
import user from './modules/user.module';
import role from './modules/role.module';
import product from './modules/product.module';
import example from './modules/example.module';

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
