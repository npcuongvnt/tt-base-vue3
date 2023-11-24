
export default{
    async login(context, payload){
        context.commit('updateLoading', true);
        var res = await new Promise(r => setTimeout((r) => {
            console.log('login success');
            return {
                Token: "new token",
                TokenTimeout: 86400,
                Token
            };
        }, 2000));
        context.commit('updateLoading', false);
        if(res){
            if(res.Token){
                context.commit('updateToken', res);
            }
            return res;
        }
    }
}