const {Sequelize}= require('sequelize');
const connectDb=new Sequelize('conqtvms_dev','admin','NoTeDeSt^C10.6?SxwY882}',{
    host:'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com', 
    dialect: 'mysql',
    port:3306
});
connectDb.sync().then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{console.log(err)});

module.exports = connectDb;