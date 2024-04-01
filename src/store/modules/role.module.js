import crudModule from '@/store/modules/crud.module';
import roleService from '@/service/role.service';

const crud = new crudModule(roleService);

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
