import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import { auth } from '../utils/firebase';
import { setCurrentUser } from '../app/slices/userSlice';
import store from '../app/store';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');// can add uid to the username to load specific info?
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.user);

  const handleLogin = async (userid) => {
    await dispatch(setCurrentUser(userid));
  };

  async function toLogin(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log('user', userCredential.user);
        handleLogin(userCredential.user.uid);
        Cookies.set('userId', userCredential.user.uid, { expires: 1 });
        navigate('/login');
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div>
      {console.log('cookies', Cookies.get('userId'))}
      <StickyNavbar />
      <Card className="w-96" style={{margin: 'auto' }}>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
          {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
        </CardBody>
        <CardFooter className="pt-0">

          <Button variant="gradient" fullWidth onClick={ toLogin }>
            Sign in
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&#39;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={() => navigate('/signup')}
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
