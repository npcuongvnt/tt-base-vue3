import crudModule from '@/store/modules/crud.module';
import ExampleService from '@/service/example.service';

const crud = new crudModule(ExampleService);

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
