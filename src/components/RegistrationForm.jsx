import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    checkbox: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const validate = () => {
      let tempErrors = {};
      
      if (!formData.name.trim()) tempErrors.name = 'Name is required';
      else if (!/^[A-Za-z\s]+$/.test(formData.name)) tempErrors.name = 'Name can only contain alphabets';
      
      if (!formData.username.trim()) tempErrors.username = 'Username is required';
      else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) tempErrors.username = 'Username must be alphanumeric without spaces';
      
      if (!formData.email.trim()) tempErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) tempErrors.email = 'Enter a valid email address';
      
      if (!formData.mobile.trim()) tempErrors.mobile = 'Mobile is required';
      else if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = 'Enter exactly 10 digits';
      
      if (!formData.checkbox) tempErrors.checkbox = 'Check this box if you want to proceed';
      
      setErrors(tempErrors);
      setIsSubmitDisabled(
        Object.keys(tempErrors).length > 0 || 
        !formData.name || !formData.username || !formData.email || !formData.mobile || !formData.checkbox
      );
    };
    
    validate();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      setUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile
      });
      navigate('/categories');
    } else {
      // mark all as touched so errors display
      setTouched({ name: true, username: true, email: true, mobile: true, checkbox: true });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-green-500 text-4xl font-extrabold mb-2 font-serif text-center">Super app</h2>
      <p className="text-white mb-8 text-center text-sm font-medium">Create your new account</p>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        
        <div className="flex flex-col">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full bg-zinc-800 text-white rounded p-3 outline-none ${(errors.name && touched.name) ? 'border border-red-500' : 'border border-transparent'} focus:border-green-500 transition-colors`}
          />
          {errors.name && touched.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
        </div>
        
        <div className="flex flex-col">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full bg-zinc-800 text-white rounded p-3 outline-none ${(errors.username && touched.username) ? 'border border-red-500' : 'border border-transparent'} focus:border-green-500 transition-colors`}
          />
          {errors.username && touched.username && <span className="text-red-500 text-xs mt-1">{errors.username}</span>}
        </div>
        
        <div className="flex flex-col">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full bg-zinc-800 text-white rounded p-3 outline-none ${(errors.email && touched.email) ? 'border border-red-500' : 'border border-transparent'} focus:border-green-500 transition-colors`}
          />
          {errors.email && touched.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
        </div>
        
        <div className="flex flex-col">
          <input 
            type="text" 
            name="mobile" 
            placeholder="Mobile" 
            value={formData.mobile} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full bg-zinc-800 text-white rounded p-3 outline-none ${(errors.mobile && touched.mobile) ? 'border border-red-500' : 'border border-transparent'} focus:border-green-500 transition-colors`}
          />
          {errors.mobile && touched.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile}</span>}
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox" 
            name="checkbox" 
            id="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-4 h-4 accent-green-500 rounded cursor-pointer"
          />
          <label htmlFor="checkbox" className="text-zinc-400 text-xs cursor-pointer">
            Share my registration data with Superapp
          </label>
        </div>
        {errors.checkbox && touched.checkbox && <span className="text-red-500 text-xs">{errors.checkbox}</span>}
        
        <button 
          type="submit" 
          disabled={isSubmitDisabled}
          className={`w-full rounded-full py-3 mt-4 text-white font-bold tracking-wide transition-all ${isSubmitDisabled ? 'bg-zinc-600 cursor-not-allowed opacity-50' : 'bg-green-500 hover:bg-green-600'}`}
        >
          SIGN UP
        </button>
        
        <div className="mt-4 text-xs text-zinc-500 space-y-2">
          <p>By clicking on Sign up. you agree to Superapp <span className="text-green-500 cursor-pointer">Terms and Conditions of Use</span></p>
          <p>To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span className="text-green-500 cursor-pointer">Privacy Policy</span></p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
