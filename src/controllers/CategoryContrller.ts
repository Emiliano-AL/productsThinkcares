import Category from "../models/Category"


export default class CategoryController{

    constructor(){}
    
    public async getCategorieOrCreateByName(name:string){
        console.log('To search: ', name);
        let cat = await Category.find({name: name})
        if(cat.length > 0){
            return cat[0]
        }else{
            let cate = await this.saveCategory(name)
            return cate
        }
    }
    
    public async saveCategory(name: String){
        const cat = new Category({name})
        await cat.save()
        return cat
    }
}