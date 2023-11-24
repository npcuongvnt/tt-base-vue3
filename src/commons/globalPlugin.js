export function pluginInstall(app){
    app.config.globalProperties.$om = app.config.globalProperties.$om ? app.config.globalProperties.$om : {};
    app.mixin({
        mounted(){
            const me = this;
            if(me.$el && !me.$el.getVueInstance){
                me.$el.getVueInstance = () => {
                    return this;
                }
            }
        }
    });
}