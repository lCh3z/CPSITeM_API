const db = require('../db');
const { SectionMdl, Responses } = require('../models');

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
      const page = parseInt(req.param('page'));
      const per_page = parseInt(req.param('per_page'));
      const start = page * per_page;

      let data = await SectionMdl.select(
        '_Section_',
        [
          '*',
        ],
        null,
        null,
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

  async update(req, res){
    try {
      const Section = new SectionMdl(req.body);
      Section.id = Number(req.param('id'));

      const result = await Section.update(req.body.conf_section);

      if(!result){
        res.status(500).send(Responses.cantRegister('Section'));
      }
      res.status(201).send(Responses.updated('Section'));
  } catch (e) {
    next(e);
  }
}

  async delete(req, res) {
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
