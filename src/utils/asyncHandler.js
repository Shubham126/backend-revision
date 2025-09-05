//asyncHandler in promise block 

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requesthandler(req, res, next)).catch((err) => next(err))
    }
}

export default asyncHandler;

// Higher order function example

// const asynchandler = () => {}                               // we all know this type of function
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