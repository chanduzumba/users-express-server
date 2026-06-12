import express from 'express' //import express for server creation

//create an instance of express app
const app = new express() 

//listen to port 5100 create a server
app.listen(5100, () => {
    console.log('Server running at port 5100')
})