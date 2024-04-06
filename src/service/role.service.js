import baseService from './base.service';

class roleService extends baseService {
    constructor() {
        super();

        this.controllerName = 'user';
    }
}

export default new roleService();
