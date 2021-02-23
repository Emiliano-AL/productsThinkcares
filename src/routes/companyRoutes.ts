import { Request, Response, Router } from 'express';
import  { CompanyController } from "../controllers/CompanyController";
import Company from '../models/Company';

class CompanyRoutes{
    router: Router

    constructor(){
        this.router = Router()
        this.routes()
    }

    private async create(req:Request, res:Response): Promise<any>{
        const companyCntrl =  CompanyController.getInstance();
        const response = await companyCntrl.create(req, res);
        res.json(response);
    }

    private async getAll(req:Request, res:Response): Promise<any>{
        const companyCntrl =  CompanyController.getInstance();
        const companies = await companyCntrl.getAll();
        res.json(companies);
    }

    private async get(req:Request, res:Response): Promise<any>{
        const companyCntrl =  CompanyController.getInstance();
        const companies = await companyCntrl.get( req.params.id );
        res.json(companies);
    }

    private async update(req:Request, res:Response): Promise<any>{
        const companyCntrl =  CompanyController.getInstance();
        const company = await companyCntrl.update(req, res);
        res.json(company);
    }

    private async remove(req:Request, res:Response): Promise<any>{
        const companyCntrl =  CompanyController.getInstance();
        const response = await companyCntrl.remove(req);
        res.json(response);
    }

    private async search(req:Request, res:Response):Promise<any>{
        const companyCntrl =  CompanyController.getInstance();
        const companies = await companyCntrl.search(req);
        res.json(companies);
    }

    routes(){
        this.router.get('/', this.getAll);
        this.router.get('/search/:term', this.search);
        this.router.get('/:id', this.get);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.remove);
        this.router.delete('/:id', this.remove);
    }
}

const companies = new CompanyRoutes()
companies.routes()

export default companies.router