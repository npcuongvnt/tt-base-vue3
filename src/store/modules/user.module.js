import crudModule from '@/store/modules/crud.module';
import UserService from '@/service/user.service';

const crud = new crudModule(UserService);

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
