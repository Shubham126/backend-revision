import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //get user details form frontend
    //validations - not empty
    //check if user already exists: username, email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    // remove password and refresh token fields from response
    // check for user creation
    // return res

   const {  fullname, email, username, password } = req.body
   console.log("email:", email);


//    if(fullname == ""){
//     throw new apiError(400, " fullname is required")
//    } 


// we can check everythig one by one using the if blocks but in Javascript 
// we have a .some() method to make this easier

      if([fullname, email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
      }

      const existedUser = User.findOne({
        $or: [{username}, {email}]
      })

      if(existedUser){
        throw new ApiError(409, "user with email or username already exists")
      }

      const avatarLocalPath = req.files?.avatar[0]?.path
      const coverImaggeLocalPath = req.files?.coverImage[0]?.path

      if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
      }

      const avatar = await uploadOnCloudinary(avatarLocalPath)
      const coverImage = await uploadOnCloudinary(coverImaggeLocalPath)

      if(!avatar){
        throw new ApiError(500, "Could not upload avatar, please try again")
      }

      const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
      })

      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      )

      if(!createdUser){
        throw new ApiError(500, "Something went wrong whole regestring the user ")
      }

      return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
      )


})

export {registerUser}