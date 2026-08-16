import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sandEmail from "../utils/SandEmail.js";

const Register = async (req, res) => {
  const GenerateToken = async (id) => {
    return jwt.sign(
      { id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  };

  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    // Hash password
    const hashpass = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashpass,
    });

    // Generate OTP
    const OTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Email message
    const message = `
Thank you for registration, ${name}.

Welcome to our web application.

Your OTP Code is: ${OTP}
`;

    // Send email
    await sandEmail(
      email,
      "THANKS FOR VISITING Muzenix",
      message
    );

    // Generate JWT
    const Token = await GenerateToken(user._id);

    // Response
    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      name: user.name,
      email: user.email,
      role: user.role,
      Token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
      error: error.message,
    });
  }
};
const Login = async (req, res) => {
try {
      const { email, password } = req.body;
      const user = User.findOne({ email });
      if (!user) {
      return  res.status(400).json({ message: "email all ready exsite " });
      }
      const comparepass = bcrypt.compare(password, user.password);
    
        const options = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          Token: GenrateToken(user._id),
        };
       return res.status(200).json({
          message: "your login successfuy",
          options,
        });
      
} catch (error) {
  return  res.status(500).json({message:"server error data is not found",error})
}
};

const GetALLuser = async (req,res)=>{
  try {
     const alluser = await User.findOne({}).select('-password')
     res.json(alluser)
  } catch (error) {
    res.status(500).json({message:"user is not found"})
  }
   
}
export {Register,Login,GetALLuser};
