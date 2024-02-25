import baseService from './BaseService';

class exampleService extends baseService {
    constructor() {
        super();

        this.controllerName = 'example';
    }
}

export default new exampleService();
