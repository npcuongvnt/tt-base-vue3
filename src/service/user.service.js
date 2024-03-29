import baseService from './base.service';

class userService extends baseService {
    constructor() {
        super();

        this.controllerName = 'user';
    }
}

export default new userService();
