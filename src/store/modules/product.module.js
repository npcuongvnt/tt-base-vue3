import crudModule from '@/store/modules/crud.module';
import productService from '@/service/demo/product.service';

const crud = new crudModule(productService);

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
