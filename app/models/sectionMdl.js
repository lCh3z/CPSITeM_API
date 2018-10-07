const db = require('../db');

class SectionMdl{
  constructor(
    {
      id,
      type,
      status,
      date,
      updated,
    }
  ){
    this.id = id;
    this.type = type;
    this.status = status;
    this.date = date;
    this.updated = updated;
  }

  static async select(table, columns, filters, order, limit) {
    try {
      const data = await db.select(table, columns, filters, order, limit);
      const response = [];
      for (const res in data) {
        const Section = new SectionMdl(data[res])
        Section.conf_section = await Section.getConfSection();
        response.push(Section);
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async count(table, filters) {
    try {
      const data = await db.count(table, filters);
      return data[0].count;
    } catch (e) {
      throw e;
    }
  }

  async exists() {
    try {
      if (this.id !== undefined) {
        const result = await db.select(
          '_Section_',
          [
            'id',
          ],
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        return result;
      }
      return [];
    } catch (e) {
      throw e;
    }
  }

  async save(conf_section) {
    const exists = await this.exists();
    if (this.id !== undefined && exists.length) {
      return this.update();
    }
    try {
      console.log(conf_section[0].title);
      console.log(this.id);
      if (await db.create('_Section_', this)) {
        const id = await db.select(
          '_Section_',
          [
            'id',
          ],
          [
            {
              attr: 'type',
              oper: '=',
              val: this.type,
            },{
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
        this.id = id[id.length-1].id;
        console.log('ID: ', this.id);
        await this.saveConfSection(conf_section);
        return id[0].id;
      }
    } catch (e) {
      throw e;
    }
  }

  async update(conf_section) {
    try {
      const id = await db.select(
        '_Section_',
        [
          'id',
        ],
        [
          {
            attr: 'id',
            oper: '=',
            val: this.id,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
        null,
        null,
      );
      console.log('id', id[0].id);
      // if (id[0].id === this.id) {
      //   delete this.id;
      // }
      if (this.id !== undefined && await db.update(
        '_Section_',
        this,
        [
          {
            attr: 'id',
            oper: '=',
            val: this.id,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
      )) {
        await this.saveConfSection(conf_section);
        return this.id;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      const exists = await this.exists();
      if (exists.length) {
        if (await db.delete(
          '_Section_',
          exists[0],
          [
            {
              attr: 'id',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        )) return true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  async getConfSection() {
    let conf_section = []
    try {
      conf_section = await db.select(
        '_ConfSection_',
        [
          '*',
        ],
        [
          {
            attr: 'id_section',
            oper: '=',
            val: this.id,
          },
          {
            logic: 'and',
            attr: 'status',
            oper: '!=',
            val: 0,
          },
        ],
        null,
        null,
      );
    } catch (e) {
      throw e;
    }
    return conf_section;
  }

  async saveConfSection(conf_section){
    let confSection = [];
    try{
      confSection = await db.select(
        '_ConfSection_',
        [
          '*',
        ],
        [
          {
            attr : 'id_section',
            oper: '=',
            val: this.id,
          },
        ],
        null,
        null,
      );

      console.log('CONFSECTION: ' , confSection);
      console.log('conf_section: ', conf_section);
    }catch(e){
      throw e;
    }

    try {
      conf_section[0].id_section = this.id;
      if (await db.create('_ConfSection_', conf_section[0])) {
        await db.update(
          '_ConfSection_',
           conf_section[0],
          [
            {
              attr: 'id_section',
              oper: '=',
              val: this.id,
            },
            {
              logic: 'and',
              attr: 'photo',
              oper: '!=',
              val: conf_section[0].photo,
            },
            {
              logic: 'and',
              attr: 'status',
              oper: '!=',
              val: 0,
            },
          ],
        );
      }
    } catch (e) {
      throw e;
    }

  }

}

module.exports = SectionMdl;
