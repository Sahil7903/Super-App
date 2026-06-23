import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side banner (hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-10 left-10 p-8">
          <h1 className="text-white text-5xl font-extrabold tracking-wider mb-4 font-sans max-w-md leading-tight">
            Discover new things on<br/>Superapp
          </h1>
        </div>
      </div>
      
      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
