const _ = require("lodash");
const { userModel } = require("../models");
const { userService } = require("../mongoServices");
const { hashPassword, generateJWTToken, comparePassword, multerConfig } = require("../utils");
const {
  validationSchema: { registerSchema ,updateSchema},
} = require("../joiSchema");
const { PORT, HOST } = require("../utils/env");
const { findByIdAndUpdate } = require("../models/user.model");


const register = async (req, res) => {
  // console.log("workinggggg");
  try {
    const field = "profileImg";
    const upload = multerConfig.upload.single(field);
    
    upload(req, res, async (err) => {
      try {
        const { file, body } = req;
        
        if (!file) throw new Error("Please select profile image");

        const { error, value } = registerSchema.validate(body);
        if (error)
          throw new Error(
            `Validation error: ${error.details
              .map(function (elem) {
                return elem.message;
              })
              .join(", ")}`
          );
        
        const checkUser = await userService.userQuery({ email: value.email });
        if (checkUser) throw new Error(`${value.email} Exist.`);

        const imageURL = file.filename;
        // const skills = value.skills.trim().split(',').filter(o => o);
        // console.log("hello", imageURL);
        let userData = {
          fullname: value.fullname,
          mobileno: value.mobileno,
          email: value.email,
          profileImg: imageURL,
          role: value.role,
        };

        userData.password = await hashPassword(value.password);
        const createUser = new userModel(userData);
        createUser.save();
        console.log("createUser",createUser);
        res.status(200).send({
          success: true,
          message: "User Created Successfully",
          data: createUser,
        });
      } catch (error) {
        if (req.file) {
					multerConfig.removeFile(req.file.filename);
				}
        res.status(400).send({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    // Check email Exists or Not
    const checkUser = await userService.userQuery({ email });
    if (!checkUser)
      throw new Error(`${email} Not Found. Please Register with Us!`);

    if (checkUser) {
      const { _id, fullname, mobileno, profileImg, isActive, role } = checkUser;

      if (!isActive) {
        throw new Error("Your Account is Temporary Deactivated.");
      }

      let verifyPassword = await comparePassword(password, checkUser.password);

      if (!verifyPassword) throw new Error("Email or Password is incorrect");

      // Generate JWT
      const token = generateJWTToken(_id);
      const data = {
        token,
        _id,
        fullname,
        email,
        mobileno,
        profileImg: `http://${HOST}:${PORT}/${profileImg}`,
        role
      };
      res.status(200).send({
        success: true,
        data,
        message: `${fullname} Login Successfully`,
      });
    }
  } catch (error) {
    console.log("Error", error)
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { currentUser } = req;
    const {  _id, fullname, email, skills, profileImg } = currentUser;

    const data = {
      _id,
      fullName,
      email,
      skills,
      profileImg: `http://${HOST}:${PORT}/${profileImg}`,
      role
    };
    res.status(200).send({
      success: true,
      data,
      message: `Get profile Successfully`,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log('call')
    const field = "profileImg";
    const upload = multerConfig.upload.single(field);

    upload(req, res, async (err) => {
      try {
        let { file, body, currentUser } = req;
        const {_id} = currentUser;
              
        const { error, value } = updateSchema.validate(body);
        if (error)
          throw new Error(
            `Validation error: ${error.details
              .map(function (elem) {
                return elem.message;
              })
              .join(", ")}`
          );
        
        const checkUser = await userService.userQuery({ email: value.email, _id });
        if (checkUser) throw new Error("Email all exist");
        let oldImg;
        if (file && file.filename) {
          oldImg = currentUser.profileImg;
          value.profileImg = file.filename;
        }
        currentUser = _.merge(currentUser, value)
        delete currentUser.password;
        currentUser.save();
        if(!currentUser) throw new Error("Something went to wrong");
        if (currentUser && oldImg) {
          multerConfig.removeFile(oldImg);
        }
        res.status(200).send({
          success: true,
          message: "User updated Successfully",
          data:currentUser
        });
      } catch (error) {
        if (req.file) {
					multerConfig.removeFile(req.file.filename);
				}
        res.status(400).send({
          success: false,
          message: error.message,
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updatePassword = async (req,res) => {
  const { newPassword,confirmPassword } = req.body;
  const { currentUser } = req;
  try {
    if(!newPassword || !confirmPassword) {
      throw new Error('Please enter both password!')
    }
    if(newPassword !== confirmPassword) {
      throw new Error('Password not match!')
    }
    const hashedPassword = await hashPassword(newPassword);
    const updatedPassword = await userModel.findByIdAndUpdate(currentUser._id,{password: hashedPassword},{new:true});
    console.log(updatedPassword);
    console.log(hashedPassword);
    console.log(newPassword);
    console.log(confirmPassword);

    return res.status(200).json({ status:true, message:'Password Updated Successfully'});
  }
  catch(err) {
    return res.status(400).json({
       status:false,message:err.message
    })
  }
 
} 

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword
};
