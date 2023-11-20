import baseService from './BaseService';

class userService extends baseService {
    constructor() {
        super();

        this.controllerName = 'user';
    }
}

export default new userService();
