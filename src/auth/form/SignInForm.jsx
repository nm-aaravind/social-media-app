import React, { useContext } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useSignIn } from '../../lib/react-query/queries';
import { Paper, InputBase, Button, Typography, InputAdornment, Box, FilledInput, Divider, TextField } from '@mui/material';
import UserContext from '../../context/userContext';
import { getEmailFromUsername } from '../../lib/appwrite/apis';

function SignInForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const { register, handleSubmit, formState, reset } = useForm()
  const {errors} = formState;
  const { mutateAsync: signin } = useSignIn()
  const { checkAuth, isLoading, setIsLoading } = useContext(UserContext)
  const navigate = useNavigate()
  
  async function formSubmit(data){
    try {
      const session = await signin({email: data.email, password: data.password})
      console.log(session, "session")
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
    <Box border='1px solid #fff2' bgcolor='primary.light' component="div" className="flex flex-col h-fit sm:w-[min(65%,600px)] lg:w-[min(50%,600px)] xl:w-[min(50%,600px)] items-center m-auto drop-shadow-form">
      <Typography variant='h3' component='h2' color='whitesmoke' marginY='35px'>Sign In</Typography>
      <Divider style={{ backgroundColor: '#fff4', height: '1px', width: '100%', marginBottom: '45px' }} />
      <form noValidate onSubmit={handleSubmit(formSubmit)} method='post' className='flex flex-col w-3/4 m-auto self-center'>
        <Paper square elevation={1} sx={{marginBottom:"40px", backgroundColor: "#494949" }} className='drop-shadow-form-field'>
          <TextField {...register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email id"
              },
              required: {
                value: true,
                message: "Email id required"
              }
            })} name='email' id="outlined-basic" label="Email" autoComplete='off' variant="filled" color='secondary' fullWidth autoFocus inputProps={{ style: { fontSize: 22, margin: 'auto', color: 'whitesmoke' } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 22 ,color: '#ebe8e8aa' } }} />
        </Paper>
        {errors.email && <Typography component='p' variant='h6' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"} font>{errors.email?.message}</Typography>}
        <Paper square={true} elevation={2}  sx={{marginBottom:"40px", backgroundColor: "#494949" }} className='drop-shadow-form-field'>
          <FormControl variant="filled" color='secondary' fullWidth>
            <InputLabel htmlFor="outlined-adornment-password" sx={{ fontSize: 22, color: '#ebe8e8aa' }}>Password</InputLabel>
            <FilledInput
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required"
                }
              })}
              name='password'
              autoComplete='off'
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{color:'#ebe8e8aa'}}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{ style: { fontSize: 23, margin: 'auto', color: 'whitesmoke' } }} // font size of input text
            />
          </FormControl>
        </Paper>
        {errors.password && <Typography variant='h6' component='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"} font>{errors.password?.message}</Typography>}
        <Button type='submit' variant="outlined" color='secondary' sx={{ fontSize: '18px', height: '49px', borderRadius: 0, boxShadow: '0px 5px 5px rgba(0,0,0,0.5)' , ":hover": { backgroundColor: 'green', border: 'green', color: 'white' } }} className='drop-shadow-form-field'>Sign In</Button>
      </form>
      <Typography sx={{color:'#ebe8e8aa'}} component='p' fontSize='25px' marginY='40px'>
        New user? <Link className='text-[#ebe8e8] underline-offset-4 underline' to={'/signup'}>Sign Up</Link>
      </Typography>
    </Box>
    </>
  )
}

export default SignInForm

