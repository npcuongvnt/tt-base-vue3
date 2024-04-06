export default class {
    constructor(api) {
        const me = this;

        me.state = {
            loading: false
        };

        me.actions = {
            async paging({ commit }, param) {
                let res = null;

                try {
                    commit('updateLoading', true);
                    res = await api.paging(param);
                } finally {
                    commit('updateLoading', false);
                }

                return res;
            },
            async new({ commit }, param) {
                let res = null;

                try {
                    commit('updateLoading', true);
                    res = await api.new(param);
                } finally {
                    commit('updateLoading', false);
                }

                return res;
            },
            async getById({ commit }, param) {
                let res = null;

                try {
                    commit('updateLoading', true);
                    res = await api.getById(param);
                } finally {
                    commit('updateLoading', false);
                }

                return res;
            },
            async insert({ commit }, param) {
                let res = null;

                try {
                    commit('updateLoading', true);
                    res = await api.insert(param);
                } finally {
                    commit('updateLoading', false);
                }

                return res;
            },
            async update({ commit }, param) {
                let res = null;

                try {
                    commit('updateLoading', true);
                    res = await api.update(param);
                } finally {
                    commit('updateLoading', false);
                }

                return res;
            },
            async delete({ commit }, param) {
                let res = null;

                try {
                    commit('updateLoading', true);
                    res = await api.delete(param);
                } finally {
                    commit('updateLoading', false);
                }

                return res;
            }
        };

        me.mutations = {
            updateLoading(state, loadingStatus) {
                state.loading = loadingStatus;
            }
        };
    }
}
