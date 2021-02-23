import { Request, Response, Router } from 'express';

class IndexRoutes{
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public getIndex(req:Request, res:Response): void {
        res.json('Api: /api/posts');
    }

    routes(): void {
        this.router.get('/', this.getIndex);
    }
}

const routesindex = new IndexRoutes();
routesindex.routes();

export default routesindex.router;