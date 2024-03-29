import crudModule from '@/store/modules/crud';
import userService from '@/service/user.service';

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
