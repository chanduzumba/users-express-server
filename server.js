import express from 'express' //import express for server creation

//create an instance of express app
const app = new express() 

//listen to port 5100 create a server
app.listen(5100, () => {
    console.log('Server running at port 5100')
})

//middleware to parse incoming JSON data
app.use(express.json())

//application level middleware to logging incoming requests
// application-level middleware to log incoming requests after response finishes
app.use((req, res, next) => {
    // Log once the response has been sent so `res.statusCode` is accurate
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} ${res.statusCode}`)
    })
    next()
})

//create router for handling routes
const router = express.Router()

//app level middleware to use the router
app.use("/", router)

//middleware function to validate req data before sending response
function validateUserData(req, res, next) {
    const { firstName, lastName, hobby } = req.body //get user data from request body
    
    // Check for missing fields (only null or empty string)
    if (firstName === null || firstName === '' || lastName === null || lastName === '' || hobby === null || hobby === '') {
        return res.status(400).json({ message: 'Missing required fields' }) //return 400 if any required field is missing
    }
    
    // Check for invalid data types
    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof hobby !== 'string') {
        return res.status(400).json({ message: 'Invalid data type' }) //return 400 if any field has invalid data type
    }
    next() //call next middleware
}

//dummy data for users
const users = [
    {
        id: "1",
        firstName: "Chandrika",
        lastName: "Prakash",
        hobby: "Coding"
    },
    {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        hobby: "Reading"
    }, 
    {
        id: "3",
        firstName: "Jane",
        lastName: "Doe",
        hobby: "Traveling"
    }
]

//GET /users - get all users
router.get('/users', (req, res) => {
    //return the list of users as JSON response
    res.json( users )
})

//GET /users/:id - get user by id
router.get('/users/:id', (req, res) => {
    const userId = req.params.id //get user id from request parameters
    const user = users.find(u => u.id === userId) //find user by id
    if (user) {
        res.json(user) //return user data as JSON response
    } else {
        res.status(404).json({ message: 'User not found' }) //return 404 if user not found
    }
})

//POST /user - create a new user with validate middleware as second param to process req before sending response
router.post('/user', validateUserData, (req, res) => {
    const { firstName, lastName, hobby } = req.body //get user data from request body
    //create a new user object with a unique id and the provided data
    const newUser = {
        id: (users.length + 1).toString(),
        firstName,
        lastName,
        hobby
    }
    users.push(newUser) //add new user to list
    res.status(201).json(newUser) //return the created user as JSON response
})

//PUT /user/:id - update user by id with validate middleware as second param to process req before sending response
router.put('/user/:id', validateUserData, (req, res) => {
    const userId = req.params.id //get user id from request parameters
    const { firstName, lastName, hobby } = req.body //get updated user data from request body
    const userIndex = users.findIndex(u => u.id === userId) //find index of user by id
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], firstName, lastName, hobby } //update user data
        res.json(users[userIndex]) //return the updated user as JSON response
    } else {
        res.status(404).json({ message: 'User not found' }) //return 404 if user not found
    }
})

//DELETE /user/:id - delete user by id
router.delete('/user/:id', (req, res) => {
    const userId = req.params.id //get user id from request parameters 
    const userIndex = users.findIndex(u => u.id === userId) //find index of user by id
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1) //remove user from list  
        res.json(deletedUser[0]) //return the deleted user as JSON response
    } else {
        res.status(404).json({ message: 'User not found' }) //return 404 if user not found
    }
})
