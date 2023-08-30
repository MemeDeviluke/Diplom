const {Reportdocum, ReportInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path')

class ReportController {

    async create(req, res, next) {
        try {
        let {data, info} = req.body
        const {filerep} = req.files
        let filename = uuid.v4() + ".txt"
        filerep.mv(path.resolve(__dirname, '..', 'static', filename))
        const report = await Reportdocum.create({data, filerep: filename})

        if(info){
            info = JSON.parse(info)
            info.forEach(i => 
                ReportInfo.create({
                    title: i.title,
                    description: i.description,
                    reportId: report.id   
            }))
        }


        return res.json(report)} 
        
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let reports = await Reportdocum.findAndCountAll({limit, offset})
        return res.json(reports)
    }

    async getOne(req, res) {
        const {id} = req.params
        const report = await Reportdocum.findOne(
            {
                where: {id},
                include: [{model: ReportInfo, as: 'info'}]
            }
        )
        return res.json(report)
    }
}

module.exports = new ReportController()