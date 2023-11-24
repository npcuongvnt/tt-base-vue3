import store from "../store/store";
import { ModuleContext } from "../store/moduleConst";
import commonFunction from "./commonFunction";

class AuthService{
    isAuthenticated(){
        const context = store.state[ModuleContext];
        if(context?.Token){
            let exprired = context.TokenExprired;
            if(exprired && exprired > new Date()){
                return true;
            }
        }
        return false;
    }

    login(loginUrl){
        commonFunction.mask();
        location.href = ""
    }
}

export default new AuthService();