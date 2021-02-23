import { Request, Response, Router } from 'express';
import  { CompanyController } from "../controllers/CompanyController";
import  { ProductController } from "../controllers/ProductController";

class ProductRoutes{
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();   
    }

    public async create(req:Request, res:Response): Promise<any>{
        const productCntrl =  ProductController.getInstance();
        const response = await productCntrl.create(req, res);
        res.json(response);
    }

    public async getAll(req:Request, res:Response): Promise<any>{
        const productCntrl =  ProductController.getInstance();
        const products = await productCntrl.getAll();
        res.json(products);
    }

    public async get(req:Request, res:Response): Promise<any>{
        const productCntrl =  ProductController.getInstance();
        const products = await productCntrl.get( req );
        res.json(products);
    }

    public async update(req:Request, res:Response): Promise<any>{
        const productCntrl =  ProductController.getInstance();
        const product = await productCntrl.update(req, res);
        res.json(product);
    }

    public async remove(req:Request, res:Response): Promise<any>{
        const productCntrl =  ProductController.getInstance();
        const response = await productCntrl.remove(req);
        res.json(response);
    }

    routes(){
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.get);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.remove);
    }
}
const products = new ProductRoutes();
products.routes();

export default products.router;