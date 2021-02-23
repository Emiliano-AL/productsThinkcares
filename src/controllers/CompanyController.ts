import { Request, Response, Router } from 'express';
import Company from "../models/Company"


export class CompanyController{

    private constructor() { }
    
    private static instance:CompanyController;
    
    public static getInstance(): CompanyController {
        if (!CompanyController.instance) {
            CompanyController.instance = new CompanyController();
        }

        return CompanyController.instance;
    }
    
    public async getCategorieOrCreateByName(name:string){
        console.log('To search: ', name);
        let cat = await Company.find({name: name})
        if(cat.length > 0){
            return cat[0]
        }else{
            let cate = await this.saveCompany(name)
            return cate
        }
    }
    
    public async saveCompany(name: String){
        const cat = new Company({name});
        await cat.save();
        return cat;
    }
    
    public async create(req:Request, res:Response){
        const newCompany = new Company( req.body );
        await newCompany.save();
        return  { status: res.status, data: newCompany } ;
    }
    
    public async getAll( ): Promise< any >{
        const companies = await Company.find();
        return companies;
    }

    
    public async get(id:string): Promise<any>{
        const companies = await Company.findById(id);
        return companies;
    }

    public async update(req:Request,  res:Response): Promise<any>{
        const { id } = req.params;
        try{
            const company = await Company.findOneAndUpdate({_id: id}, req.body);
            return {status: res.status, data: company};
        }catch(err){
            console.log(err);
            return;
        }
    }
    
    public async remove(req:Request): Promise<any>{
        try{
            await Company.findOneAndRemove({ _id: req.params.id });
            return { response: 'deleted Successfully' };
        }catch(err){
            console.log(err);
            return;
        }
    }
    
    public async search(req:Request):Promise<any>{
        const companies = await Company.find({name: { $regex: '.*' + req.params.term + '.*' } });
        return companies;
    }
}