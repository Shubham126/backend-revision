//asyncHandler in promise block 

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler};

// Higher order function example

// const asyncHandler = () => {}                               // we all know this type of function
// const asyncHandler = (func) => () => {}                     // this is a higher order function
// const asyncHandler = (func) => {async() => {}}
// const asyncHandler = (func) => async() => {}

// asyncHandler in try catch block

// const asyncHandler = (fn) => async(requestAnimationFrame, resizeBy, next) => {
//     try{
//         await fn (req, res, next)
//     } catch (error){
//         res.status(error.code || 500).json({
//             success: false,
//             message:error.message
//         })
//     }
// }