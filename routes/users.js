var express = require('express');
var router = express.Router();
const db=require('../db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/info',async(req,res)=>{
  try{
  let totalCount=await db.query(`SELECT COUNT(*) as count FROM ProductV2`);
  totalCount=parseInt(totalCount[0][0].count);
  let {currentPage,pageSize,orderBy,orderDir,searchBy,searchFields}=req.query;

  if(!currentPage){
    currentPage=1;
  }
  if(!pageSize){
    pageSize=10;
  }
  if(!orderBy){
    orderBy="createdAt"
  }
  if(!orderDir){
    orderDir="DESC"
  }
  if(!searchFields){
    searchFields=[]
  }
  if(!searchBy){
    searchBy="";
  }
  let searchQuery="";
  const searchParams=[];
  const offset=(currentPage-1) * pageSize;
  const totalPage=Math.ceil(totalCount/pageSize);
  let fixedFields="";
  for(let i=0;i<searchFields.length;i++){
    if(i==0){
    }
    else if(i==searchFields.length-1){
    }
    else{
      fixedFields+=searchFields[i]
    }
  }
  searchFields=fixedFields.split(",");

//   searchFields.forEach((field)=>{
//     searchQuery+=`${field} LIKE ? OR `;
//     searchParams.push("%"+searchBy+"%");
// })
// searchQuery=searchQuery.slice(0,-4);
// console.log(searchQuery);

  let product=await  db.query(`SELECT * FROM ProductV2 ORDER BY ${orderBy} ${orderDir} LIMIT ${pageSize} OFFSET ${offset} `)//ORDER BY createdAt=${orderDir}
res.json({
"currentPage": currentPage,
       "pageSize": pageSize,
       "totalPages": totalPage,
       "totalCount": totalCount,
       "data":product

      })
    }catch(err){
      res.json({"err":err,"data":"error occur while fetching"})
    }
})

module.exports = router;
