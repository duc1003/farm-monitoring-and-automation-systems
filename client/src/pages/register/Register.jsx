import { useState } from 'react';
import { User, Lock, Mail, Smartphone, Key } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import './Register.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    password: '',
    email: '',
    confirmPassword: '',
    role: 'user',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // if (!formData.termsAccepted) {
    //   alert("Please accept the terms and conditions");
    //   return;
    // }

    // Registration logic here
    try {
      const res = await axios.post("http://localhost:8888/api/users/register", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      console.log('Registration successful', res.data);
      navigate('/login');
      setError('Registration successful!');
    } catch (error) {
      setError(error.message);
    }
    

  };

  const handleGoogleSignUp = () => {
    // Google Sign-Up logic
    console.log('Google Sign-Up initiated');
  };

  return (
    <div className="register-container">
      {/* Left Image Section */}
      <div className="register-container__image">
        <div className="register-container__image-logo">
          <Key color="white" size={40} />
        </div>
        <h2 className="register-container__image-title">Create Account</h2>
        <p className="register-container__image-subtitle">
          Join our platform and unlock a world of business insights and opportunities
        </p>
      </div>

      {/* Right Registration Form Section */}
      <div className="register-container__form">
        <div className="register-container__form-wrapper">
          <div className="register-container__form-header">
            <h1>Sign Up</h1>
            <p>Create a new account to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="register-container__form-input">
              <label htmlFor="fullname">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="text" 
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name" 
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="register-container__form-input">
              <label htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* <div className="register-container__form-input">
              <label htmlFor="phone">Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                />
              </div>
            </div> */}

            <div className="register-container__form-input">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  placeholder="Create a strong password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="register-container__form-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input 
                  type="password" 
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="pl-10"
                />
              </div>
            </div>
            {error && <p className="register-container__error">{error}</p>}
            {/* <div className="register-container__form-terms">
              <input 
                type="checkbox" 
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div> */}

            <button 
              type="submit" 
              className="register-container__form-submit"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="register-container__form-divider">
              <span>or sign up with</span>
            </div>

            {/* Google Sign-Up Button */}
            <button 
              type="button"
              className="register-container__form-google-btn"
              onClick={handleGoogleSignUp}
            >
              <FcGoogle size={24} />
              <span>Sign up with Google</span>
            </button>

            <div className="register-container__form-login">
              Already have an account? <a href="#">Log In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;