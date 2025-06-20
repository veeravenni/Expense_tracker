import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link,useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';
import { useState } from 'react';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import {UserContext} from '../../context/UserContext';
import { Upload } from 'lucide-react';


const SignUp=()=>{
  const[profilePic, setProfilePic] = useState(null);
  const[fullName,setFullName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const[error,setError]=useState(null);

  const { updateUser } = React.useContext(UserContext); // Importing user context to update user data

  const navigate=useNavigate();
  //handle signup from Submit 
  const handleSignUp=async(e)=>{
    e.preventDefault();
    //simple validations
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
   
    setError("");

    //sign up api call
    try{

      // Upload profile picture if provided
      if(profilePic)
      {
        const ImgUploadRes=await UploadImage(profilePic);
        profileImageUrl=ImgUploadRes.imageUrl || ""; // Use the uploaded image URL or an empty string if upload fails
      }

      const response =await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
    });
      const { token, user } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user); // Update user context with the registered user data
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while signing up. Please try again.");
      }
    }

  };

  return(
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Create an account</h3>
        <p className="text-xs text-slate-700 mt[5px] mb-6">join us today by entring your details below
        </p>

        <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <Input
             value={fullName}
             onChange={({target})=>setFullName(target.value)}
             label="Fullname"
             placeholder='john'
             type='text'
            />
            <Input
              value={email}
              onChange={({target})=>setEmail(target.value)}
              label="Email"
              placeholder="john@example.com"
              type='email'
            />
            <div className="col-span-2">
             <Input
             value={password}
             onChange={({target})=>setPassword(target.value)}
             label="Password"
             placeholder='Min 8 characters'
             type='password'
             
            />
            
           
            
            </div>

          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button type="submit" className="btn-primary mt-4">
            SIGN UP
          </button>

          <p className="text-xs text-slate-700 mt-4">
            Already have an account?{" "} 
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>


        </form>

      </div>
        
    </AuthLayout>
  )
}
export default SignUp;