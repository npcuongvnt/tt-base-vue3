

import state from "./moduleContextState";
import actions from "./moduleContextActions";
import getters from "./moduleContextGetters";
import mutations from "./moduleContextMutations";

export default {
    debug: process.env.NODE_ENV !== 'production',
    state: state,
    namespaced: true,
    getters: getters,
    mutations: mutations,
    actions: actions,
};