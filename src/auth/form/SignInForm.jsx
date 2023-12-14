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
    <Box component="div" className="flex flex-col h-fit sm:w-[min(65%,600px)] lg:w-[min(50%,600px)] xl:w-[min(50%,600px)] items-center m-auto md:bg-purple-500/40 rounded-md">
      <Typography variant='h2' component='h1' color='purple' paddingY='20px' >
        <Link to={'/'}>Heyo</Link>
      </Typography>
      <Divider style={{ backgroundColor: 'whitesmoke', height: '5px', width: '100%' }} />
      <Typography variant='h3' component='h2' color='purple' marginY='35px'>Sign In</Typography>
      <form noValidate onSubmit={handleSubmit(formSubmit)} method='post' className='flex flex-col w-3/4 m-auto self-center'>
        <Paper square elevation={1} sx={{marginBottom:"40px"}}>
          <TextField {...register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email id"
              },
              required: {
                value: true,
                message: "Email id required"
              }
            })} name='email' id="outlined-basic" label="Email" autoComplete='off' variant="filled" color='secondary' fullWidth autoFocus inputProps={{ style: { fontSize: 23, margin: 'auto' } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 22, color: 'purple' } }} />
        </Paper>
        {errors.email && <Typography variant='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"} font>{errors.email?.message}</Typography>}
        <Paper square={true} elevation={2}  sx={{marginBottom:"40px"}}>
          <FormControl variant="filled" color='secondary' fullWidth>
            <InputLabel htmlFor="outlined-adornment-password" sx={{ fontSize: 22, color: 'purple' }}>Password</InputLabel>
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
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{ style: { fontSize: 23, margin: 'auto' } }} // font size of input text
            />
          </FormControl>
        </Paper>
        {errors.password && <Typography variant='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"} font>{errors.password?.message}</Typography>}
        <Button type='submit' variant="contained" color='secondary' sx={{ fontSize: '18px', height: '49px' }}>Sign In</Button>
      </form>
      <Typography component='p' fontSize='25px' marginY='40px'>
        New user? <Link className='font-semibold text-[#9c27b0] underline-offset-4 underline' to={'/signup'}>Sign Up</Link>
      </Typography>
    </Box>
    </>
  )
}

export default SignInForm

