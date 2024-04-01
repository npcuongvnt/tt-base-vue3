import api from './api';

import BaseService from './base.service';

class UserService extends BaseService {
    constructor() {
        this.controllerName = 'user';
        super();
    }
}

export default new UserService();
