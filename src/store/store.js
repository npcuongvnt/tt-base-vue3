import { createStore, createLogger } from 'vuex';
import contextUser from './modules/contextUser.js';
import user from './modules/user.js';
import role from './modules/role.js';
import product from './modules/product.js';
import createPersistedState from 'vuex-persistedstate';

import context from './modules/context/moduleContext.js';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        context,
        contextUser,
        user,
        role,
        product
    },
    strict: debug,
    plugins: [
        createPersistedState({
            key: 'omege_vuex',
            paths: ['context'],
            getState: (key) => {
                let temp = localStorage.getItem(key);
                if(temp && typeof temp == 'string'){
                    let state = JSON.parse(temp);
                    if(state){
                        let context = state.context;
                        if(context && context.Token){
                            try {
                                context.TokenExprired = new Date(context.TokenExprired);
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }
                    return state;
                }
                return null;
            }
        })
    ]
});
