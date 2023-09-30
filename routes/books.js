// Adding data here so as to have a clean and easy code
const express = require("express");

//Data import
const {booksdata} = require("../data/booksdata.json");

//Local Router
const router = express.Router();

/* 
*Route: /booksdata
*Method: GET
*Desciption: Get all the books
*Parameters: None
*Access: Public
*/

router.get("/", (req,res)=> {
    res.status(200).json({success: true, message: "Books displayed successfully", data: booksdata});
});

/* 
*Route: /booksdata/id
*Method: GET 
*Desciption: Get book by its id
*Parameters: Id
*Access: Public
*/

router.get("/:id", (req,res)=>{
    const{id} = req.params;
    const book = booksdata.find((each) => each.id == id);

    if (!book){
        res.status(404).json({ message: "Error! Book does not Exist", success: false});
    }
    return res.status(200).json({
        data: book,
        // book = will display details of that particular book whose id matches. 
        success: true});
});

/*
3)
*Route: /booksdata/issued
*Method: GET 
*Desciption: Get all issuedbook - Foreign key usage
*Parameters: None
*Access: Public
*/
// router.get("/issued",(req,res)=>{
//     const userwithissuedbook = usersdata.filter((each) => {
//         if(each.issuedbook){
//             return each;
//         }
//     });

//     const issuedbook = [];

//     userwithissuedbook.forEach((each) => {
//         const book = booksdata.find((book) => book.id === each.issuedbook);

//         book.issuedby = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedbook.push(book);
//     });
//     if(issuedbook.length === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No books issued yet."
//         });
//     }return res.status(200).json({success: true, data: issuedbook});
// })

router.get("/issued/by-user", (req, res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each)=>{
        const book = booksdata.find((book)=> book.id === each.issuedBook);


        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0){
        return res.status(404).json({success: false, message: "No books issued yet."});
    }
    return res.status(200).json({success: true, data: issuedBooks})

})

/*
4)
*Route: /booksdata
*Method: PUT
*Desciption: Update book details using it's id
*Parameters: Id
*Access: Public
*/

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // Assuming you send the updated data in the request body
  
    const index = booksdata.findIndex((each) => each.id === id);
    if (index === -1) {
      return res.status(404).send("Book not found");
    }
  
    // Update the book data
    booksdata[index] = { ...booksdata[index], ...updatedData };
  
    return res.status(200).json({ message: "Book updated successfully", success: true });
  });

// router.put("/:id", (req,res) => {
//     const {id} = req.params;
//     const book = booksdata.find((each) => each.id === id);
//     if(!book){
//         res.status(400).send("!Book doesn't found!");
//     }
//     const updatedbook = booksdata.map((each) => {
//         if (each.id === id) {
//             return {
//                 ...each,
//                 ...data,
//             }
//         }
//         return each;
//     })    
// })

/*
5)
*Route: /booksdata
*Method: POST
*Desciption: Create/Add a new book
*Parameters: None
*Access: Public
*Data: Author, BookName, Genre, Price, Publisher, Id 
*/

router.post("/", (req,res) => {
    const {data} = req.body;        // user will provide new data

    if(!data){
        return res.status(400).json({
            success: false,
            message: "No data provided to add a book."
        })
    }
    const book = booksdata.find((each) => each.id === data.id);

    if (book){
        return res.status(404).json({success: false, message: "Book with given id already exists!"});
    }

    const allbooks = [...booksdata, data]       // combining new & old books 
    return res.status(200).json({success: true, data: allbooks});

})


//exporting
module.exports = router;