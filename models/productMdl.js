const db = require('../db');

class ProductMdl{
  constructor(args){
    this.id = args.id;
    this.id_cat = args.id_cat;
    this.name = args.name;
    this.price = args.pice;
    this.status = args.status;
    this.discount = args.discount;
    this.inventory = args.inventory;
    this.description = args.description;
    this.specs = args.specs;
    this.min_quan = args.min_quan;
    this.date = args.date;
  }

  processResult(data){
    const result = [];
    data.forEach((res) => {
      result.push(new ProductMdl(res));
    });
    return result;
  }

  async save(){
    Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
    if(this.id !== undefined && this.processResult(await db.get('_Product_', 'id', [{attr: 'id', oper: '=', val: this.id}])).length !== 0){return this.update();}
    if(await db.create('_Product_', this)){return 0;}
    return 1;
  }

  async update(){
    if(this.id !== undefined && await db.update('_Product_', this, [{attr: 'id', oper: '=', val: this.id}])){return 0;}
    return 1;
  }

  async delete(){
    if(this.id !== undefined && this.processResult(await db.get('_Product_', 'id', [{attr: 'id', oper: '=', val: this.id}])).length !== 0){
      if(this.id !== undefined && await db.delete('_Product_', [{attr: 'id', oper: '=', val: this.id}]) !== undefined){return 0;}
      return 1;
    }
    return 2;
  }
}

module.exports = ProductMdl;
