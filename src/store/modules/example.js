import crudModule from '@/store/modules/crud';
import exampleService from '@/service/ExampleService';

const crud = new crudModule(exampleService);

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
