import React, { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Actions/userActions';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState({ success: null, error: null });

  useEffect(() => {
    if (state.success) {
      console.log('Login successful, redirecting...');
      console.log('User logged in:', state.success);
      console.log('formdata',formData)
      setTimeout(() => {
        navigate('/todos');
        console.log(state.success);
      }, 2000);
    }
  }, [state.success, navigate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);  // Log the data before sending to the backend
    setIsPending(true); // Set loading state
    const response = await login(state, formData);  // Pass formData directly
    setState(response); // Update the state based on the response
    setIsPending(false); // Reset loading state
  };

  return (
    <>
      <div className='h-screen flex justify-center items-center transform -translate-y-16'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-xl w-full px-8'>
          <div className='flex flex-col gap-2'>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {state.error?.message && (
            <span className="message">{state.error.message}</span>
          )}
          <Button disabled={isPending}>
            {isPending ? 'Logging in' : 'Login '}
          </Button>
          <span className='text-[#63657b] text-center'>
            Don't have an Account?{'  '}
            <Link to='/Register' className='transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline'>
              Register
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
