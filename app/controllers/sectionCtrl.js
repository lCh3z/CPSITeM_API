const db = require('../db');
const { SectionMdl, Responses } = require('../models');

// FIXME Todos los metodos deben estar documentados
// FIXME En todos los casos de error, el codigo 500 no es adecuado

class sectionCtrl{
  constructor(){
    this.getAll = this.getAll.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res, next) {
    try {
      // FIXME Toda la logica para definir los parametros para filtros, paginado y ordenado se puede meter en un middleware
      let page = parseInt(req.param('page'));
      let per_page = parseInt(req.param('per_page'));
      if (!page) {
        page = 0;
      }
      if (!per_page) {
        per_page = 20;
      }
      const start = page * per_page;

      let find = parseInt(req.param('find'));
      let f_col = parseInt(req.param('f_col'));
      const filters = null;
      if (find && f_col) {
        filters = [];
        filters.push(
          {
            attr: f_col,
            oper: 'LIKE',
            val: find,
          },
        );
      }

      let order = null;
      let ord = parseInt(req.param('order'));
      let ord_by = parseInt(req.param('ord_by'));
      let des = parseInt(req.param('desc'));
      if (ord && ord_by) {
        order = {};
        order.by =  ord_by;
        if (des) {
          order.desc = true;
        } else {
          order.desc = false;
        }
      }

      let data = await SectionMdl.select(
        '_Section_',
        [
          '*',
        ],
        filters,
        order,
        {
          start,
          quant: per_page,
        },
      );

      if (data.length === 0) {
        res.status(500).send(Responses.notFound('Section'));
      } else {
        const total = await SectionMdl.count(
          '_Section_',
          '',
          '',
        );

        res.status(200).send({
          data,
          per_page,
          page,
          total,
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      let data = await SectionMdl.select(
        '_Section_',
        [
          '*',
        ],
        [
          {
            attr: 'id',
            oper: '=',
            val: Number(req.param('id')),
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

      [data] = data;

      if (!data) {
        res.status(500).send(Responses.notFound('Section'));
      }
      res.status(201).send({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const Section = new SectionMdl(req.body)
      let result = await Section.save(req.body.conf_section);
      if (result) {
        return res.status(201).send(Responses.created('Section'));
      } else {
        return res.status(500).send(Responses.cantCreate('Section'));
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next){
    try {
      const Section = new SectionMdl(req.body);
      Section.id =  Number(req.param('id'));
      const result = await Section.update(req.body.conf_section);

      if(!result){
        res.status(500).send(Responses.cantRegister('Section'));
      }
      res.status(201).send(Responses.updated('Section'));
  } catch (e) {
    next(e);
  }
}

  async delete(req, res, next) {
    try {
      const Section = new SectionMdl({
        id: Number(req.param('id')),
      });

      const result = await Section.delete();

      if(!result){
        res.status(500).send(Responses.cantDelete('Section'));
      }
      res.status(201).send(Responses.deleted('Section'));
    } catch (e) {
      next(e);
    }
  }

  async getConfSection() {
    const result = await db.select(
      '_ConfSection_',
      [
        'id_section',
      ],
      [
        {
          attr: 'id_section',
          oper: '=',
          val: this.id_section,
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

  }
}

module.exports = new sectionCtrl();
