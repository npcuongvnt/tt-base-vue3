import BaseService from './base.service';

class ExampleService extends BaseService {
    constructor() {
        this.controllerName = 'example';
        super();
    }
}

export default new ExampleService();
