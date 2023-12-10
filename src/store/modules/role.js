import crudModule from '@/store/crud.module';
import userService from '@/service/UserService';

const crud = new crudModule(userService);

export default {
    namespaced: true,

    state: {
        ...crud.state
    },
    getters: {
        ...crud.getters
    },
    actions: {
        ...crud.actions
    },
    mutations: {
        ...crud.mutations
    }
};
