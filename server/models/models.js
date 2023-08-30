const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique:true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Reportdocum = sequelize.define('report', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.STRING},
    filerep: {type: DataTypes.STRING}
})

const ReportInfo = sequelize.define('reportinfo', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, unique:true, allowNull:false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const UserReport = sequelize.define('user_report',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Reportdocum.hasMany(ReportInfo, {as: 'info'})
ReportInfo.belongsTo(Reportdocum)

User.hasMany(UserReport)
UserReport.belongsTo(User)

Reportdocum.hasOne(UserReport)
UserReport.belongsTo(Reportdocum)

module.exports = {
    User,
    Reportdocum,
    UserReport,
    ReportInfo
}