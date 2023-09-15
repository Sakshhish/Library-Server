const express = require("express");
const {usersdata} = require("../data/usersdata.json");

const router = express.Router();

/*
1.
Route- /users
Description- Get all users
Method- GET
Access- Public
Parameters- None
*/
router.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        data: usersdata,
    })
})

/*
2.
Route- /users/:id
Description- Get users by their id
Method- GET
Access- Public
Parameters- Id
*/

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const isuser = usersdata.find((each)=> each.id === id);
    
    if (!isuser){
        return res.status(404).json({
            message : "User not Exist",
            success : false
        });
    }
    // else {
    return res.status(200).json({
        message : "Congrats! User found",
        success : true,
        data : isuser
    })
})

// app.get("*", (req, res) => {
//     res.status(401).json({
//         message: "Route doesn't exist"
//     });
// })

// POST Method
/*
3.
Route- /users
description- Create/Add a new user
method- POST
access- Public
parameters- None
*/
router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    // check whether user with same id exists
    const user = usersdata.find((each) => each.id === id);

    if (user) {
        return res.status(401).send('User with the id already exist');
    }
    //else
    usersdata.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json({
        message : "User added",
        success : true,
        data : usersdata,
    })
})

// PUT Method
/*
4.
Route- /users/:id
description- Update user by it's identifier i.e. id
method- PUT
access- public
parameters- id
*/

router.put('/:id', (req, res) => {
    // requesting id
    const {id} = req.params;

    // data to update
    const {data} = req.body;

    // if user id is already present
    const user = usersdata.find((each) => each.id === id);

    if (!user)
    return res.status(401).json({
        success : false,
        message : "User does not exist!"
    });

    const updateduser = usersdata.map((each) => {
        if(each.id === id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updateduser
    })
})


// DELETE Method
/*5.
Route- /users/:id
description- Delete user by it's identifier i.e. id
method- Delete
access- public
parameters- id
*/
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const user = usersdata.find((each)=> each.id === id);

    if (!user){
        return res.status(401).json({success: false,"message": "User with the id doesn't exist."});    
    }
    const {index} = usersdata.indexOf(user);
    usersdata.splice(index, 1);
    return res.status(200).json({
        success: true,
        data: usersdata
    })
})

module.exports = router;
// router.listen(${PORT}, ()=>{
//     console.log(`Server is running at port ${port}`);
//     console.log(usersdata);  
// })