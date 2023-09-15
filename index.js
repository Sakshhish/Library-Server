const express = require("express");

//data import
const {usersdata} = require("./data/usersdata.json");

const app = express();

const PORT = 8081;

app.use(express.json());

// Connecting Routes
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

/* .use() fn
    app.use("url", route_to_be_followed) */

app.use("/usersdata", userRouter);
app.use("/booksdata", bookRouter);

app.get("/", (req, res) => {
    res.status(200).send("Server running successfully");
    console.log(usersdata); 
})




// /*
// 1.
// Route- /users
// description- get all users
// method- GET
// access- public
// parameters- none
// */

// app.get("/usersdata", (req,res) => {
//     res.status(200).json({
//         success: true,
//         data: usersdata,
//     });
// });

// /*
// 2.
// Route- /users/:id
// description- get users by thier id
// method- GET
// access- public
// parameters- Id
// */

// app.get('/usersdata/:id', (req, res) => {
//     const {id} = req.params;
//     const isuser = usersdata.find((each)=> each.id ===id);
//     if (!isuser){
//         return res.status(404).json({
//             message : 'User not found',
//             success : false, 
//         });
//     }
//     else {
//         return res.status(200).json({
//             message : 'Congrats! User found',
//             success : true,
//             data : isuser,
//         });
//     }
// })

// app.get("*", (req, res) => {
//     res.status(401).json({
//         message: "Route doesn't exist"
//     });
// })

// // POST Method
// /*
// 3.
// Route- /users
// description- Create a new user
// method- POST
// access- public
// parameters- none
// */
// app.post("/users", (req, res) => {
//     const { id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
//     // check whether user with same id exists
//     const user = usersdata.find((each) => each.id === id);

//     if (user) {
//         return res.status(401).send('User already exist');
//     }
//     else {
        
//         usersdata.push({
//             id,
//             name,
//             surname,
//             email,
//             subscriptionType,
//             subscriptionDate
//         });
//         res.status(201).json({
//             message : "User added",
//             success : true,
//             data : usersdata,
//         });
//         console.log(usersdata);
//     }
// })

// // PUT Method
// /*
// 4.
// Route- /users/:id
// description- Update user by it's identifier i.e. id
// method- PUT
// access- public
// parameters- id
// */

// app.put("/users/:id", (req, res) => {
//     // requesting id
//     const {id} = req.params;
//     // data to update
//     const {data} = req.body;
//     // if user id is already present
//     const user = usersdata.find((each) => each.id === id);

//     if (!user) {
//         res.status(401).json({
//             success : false,
//             message : "User does not exist!",
//         })
//     }
//     const updateduser = usersdata.map((each) => {
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data,
//             }
//         }
//         return each;
//     })
//     return res.status(200).json({
//         success: true,
//         data: updateduser,
//     })
// })


// // DELETE Method
// /*5.
// Route- /users/:id
// description- Delete user by it's identifier i.e. id
// method- Delete
// access- public
// parameters- id
// */
// app.delete("/user/:id", (req, res)=>{
//     const {id} = req.params;
//     const user = usersdata.find((each)=> each.id === id);
//     if (!user){
//         return res.status(401).json({
//             success: false,
//             "message": "User with the id doesn't exist."
//         })        
//     }
//     const {index} = usersdata.indexOf(user);
//     usersdata.splice(index, 1);
//     return res.status(200).json({
//         success: true,
//         data: usersdata
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    // console.log(usersdata);  
});
