import { defineComponent} from 'vue';

class CommonFunction{
    countMask = 0;
    getMainLoading(){
        let el = document.body.querySelector('#omega-loading');
        return el;
    }

    mask(important){
        important && this.countMask++;
        let el = this.getMainLoading();
        if(el){
            el.style.display = 'flex';
        }
    }

    unMask(important){
        important && this.countMask--;
        let el = this.getMainLoading();
        if(el){
            el.style.display = 'none';
        }
    }

}

export default new CommonFunction();

export function initCommonFuntion(app){
    app.config.globalProperties.$om = app.config.globalProperties.$om || {};
    app.config.globalProperties.$om.commonFn = app.config.globalProperties.$om.commonFn || {};
    app.config.globalProperties.$om.commonFn = new CommonFunction();
}