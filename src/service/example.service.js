import baseService from './base.service';

class exampleService extends baseService {
    constructor() {
        super();

        this.controllerName = 'example';
    }
}

export default new exampleService();
