// Adding data here so as to have a clean and easy code
const express = require("express");

//Data import
const {booksdata} = require("../data/booksdata.json");

//Local Router
const router = express.Router;


//exporting
module.exports = router;

/* 
*Route: /booksdata
*Method: GET
*Desciption: Get all the books
*Parameters: None
*Access: Public
*/

router.get("/", (req,res)=> {
    res.status(200).json({success: true,message: "Users displayed successfully",data: booksdata});
})

/* 
*Route: /booksdata/id
*Method: GET 
*Desciption: Get book by id
*Parameters: Id
*Access: Public
*/

router.get("/:id", (req,res)=>{
    const{id} = req.params;
    const isbook = booksdata.find((each) => each.id == id);

    if (!isbook){
        res.status(401).json({message: "Error! Book does not Exist", success: false})
    }
    return res.status(200).json({data: booksdata, success: true});
})

/* 
*Route: /booksdata
*Method: GET 
*Desciption: Get all issuedbook
*Parameters: None
*Access: Public
*/
router.get("/", (req,res) => {
    
})






router.listen(PORT, (req,res)=>{
    console.log("Server working properly ")
})


books.get("/",(req,res)=>{
    const {id} = req.params;
    
})