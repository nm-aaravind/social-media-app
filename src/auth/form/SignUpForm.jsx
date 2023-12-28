import React , {useContext} from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Paper, FilledInput, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateUser, useSignIn } from '../../lib/react-query/queries';
import UserContext from '../../context/userContext';

function SignUpForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState, reset } = useForm()
  const { errors } = formState;
  const { mutateAsync: signup } = useCreateUser()
  const { mutateAsync: signin } = useSignIn()
  const { checkAuth, isLoading, setIsLoading } = useContext(UserContext)
  const navigate = useNavigate();

  async function formSubmit(data) {
    try {
      const newUser = await signup(data)
      if(!newUser){
        throw Error
      }
      const session = await signin({email: newUser.email, password: data.password})
      if(!session){
        console.log("Cannot create session")
        throw Error
      }
      if(checkAuth()){
        reset()
        navigate('/')
      }
    } catch (error) {
      console.log("Sign in failed")
      console.log(error)
      throw Error
    }

  }
  return (
    <>
      <Box border='1px solid #fff2' bgcolor='primary.light' component="div" className=" flex drop-shadow-form flex-col h-fit sm:w-[min(65%,600px)] lg:w-[min(50%,600px)] xl:w-[min(50%,600px)] items-center m-auto">
        <Typography variant='h3' component='h2' color='whitesmoke' marginY='35px'>Sign Up</Typography>
        <Divider style={{ backgroundColor: '#fff4', height: '1px', width: '100%', marginBottom: '45px' }} />
        <form method='post' onSubmit={handleSubmit(formSubmit)} className='flex flex-col w-3/4 m-auto self-center'>
          <Paper elevation={1} sx={{marginBottom:"40px", backgroundColor: "#494949" }}>
            <TextField {...register('name', {
              required: {
                value: true,
                message: "Name required"
              },
              maxLength: {
                value: 70,
                message: "70 characters max"
              }
            })} name='name' id="name" label="Name" autoComplete='off' variant="filled" color='secondary' fullWidth autoFocus inputProps={{ style: { fontSize: 22, color:'whitesmoke' } }}
              InputLabelProps={{ style: { fontSize: 20, color: '#ebe8e8aa' } }} />
          </Paper>
          {errors.name && <Typography variant='h6' component='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"}>{errors.name?.message}</Typography>}
          <Paper elevation={1} sx={{marginBottom:"40px", backgroundColor: "#494949" }}>
            <TextField {...register('username', {
              required: {
                value: true,
                message: "Username required"
              },
              maxLength: {
                value: 30,
                message: "30 characters max"
              },
              pattern: {
                value: /^[a-zA-Z0-9_]*$/,
                message: "Use only alphabets, numbers and underscores"
              }
            })} name='username' id="username" label="Username" autoComplete='off' variant="filled" color='secondary' fullWidth inputProps={{ style: { fontSize: 23, margin: 'auto', color:'whitesmoke' } }}
              InputLabelProps={{ style: { fontSize: 20, color: '#ebe8e8aa' } }} />
          </Paper>
          {errors.username && <Typography variant='h6' component='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"}>{errors.username?.message}</Typography>}
          <Paper elevation={1} sx={{marginBottom:"40px", backgroundColor: "#494949" }}>
            <TextField {...register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email id"
              },
              required: {
                value: true,
                message: "Email id required"
              }
            })} name='email' id="email" label="Email Id" autoComplete='off' variant="filled" color='secondary' fullWidth inputProps={{ style: { fontSize: 23, margin: 'auto', color:'whitesmoke' } }}
              InputLabelProps={{ style: { fontSize: 20, color: '#ebe8e8aa' } }} />
          </Paper>
          {errors.email && <Typography variant='h6' component='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"} >{errors.email?.message}</Typography>}
          <Paper elevation={1} sx={{marginBottom:"40px", backgroundColor: "#494949" }}>
            <FormControl variant="filled" color='secondary' fullWidth>
              <InputLabel htmlFor="outlined-adornment-password" sx={{ fontSize: 20, color: '#ebe8e8aa' }}>Password</InputLabel>
              <FilledInput
                {...register('password', {
                  required: {
                    value: true,
                    message: "Password required"
                  },
                  maxLength: {
                    value: 50,
                    message: "Should be less than 50 characters"
                  },
                  minLength: {
                    value: 8,
                    message: "Should be more than 8 characters"
                  }
                })}
                name='password'
                autoComplete='off'
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: 'secondary.main' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{ style: { fontSize: 23, margin: 'auto', color:'#ebe8e8' } }} // font size of input text
              />
            </FormControl>
          </Paper>
          {errors.password && <Typography variant='h6' component='p' fontFamily={"Varela Round"} color='red' marginTop={"-35px"} marginBottom={"11px"}>{errors.password?.message}</Typography>}
          <Button type='submit' variant="outlined" color='secondary' sx={{ fontSize: '18px', height: '49px', borderRadius: 0, boxShadow: '0px 5px 5px rgba(0,0,0,0.5)' , ":hover": { backgroundColor: 'green', border: 'green', color: 'white' } }} className='drop-shadow-form-field'>Sign Up</Button>
        </form>
        <Typography sx={{color:'#ebe8e8aa'}} component='p' fontSize='23px' marginY={'40px'}>
          Already have an account? <Link className='underline-offset-4 text-white underline' to={'/signin'}>Sign In</Link>
        </Typography>
      </Box>
    </>
  )

}

export default SignUpForm