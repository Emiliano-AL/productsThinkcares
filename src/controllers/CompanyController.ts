import Company from "../models/Company"


export default class CompanyController{

    constructor(){}
    
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
        const cat = new Company({name})
        await cat.save()
        return cat
    }
}