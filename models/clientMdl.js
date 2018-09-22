class ClientMdl {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.sec_name = args.sec_name;
  }

  save() {
    db.create(this);
  }
}
module.exports =  ClientMdl;
