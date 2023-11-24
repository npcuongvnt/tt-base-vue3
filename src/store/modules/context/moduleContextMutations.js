export default{

    updateToken(state, payload){
        state.Token = payload.Token;
        state.TokenExprired = new Date().AddSeconds(payload.TokenTimeout);
    },

    updateLogout(state, payload){
        state.Token = null;
        state.TokenExprired = null;
        state.User = {};
        state.Context = {};
    }
}