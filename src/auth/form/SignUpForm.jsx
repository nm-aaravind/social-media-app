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
      <Box component="div" className="flex drop-shadow-form flex-col h-fit sm:w-[min(65%,600px)] lg:w-[min(50%,600px)] xl:w-[min(50%,600px)] items-center m-auto md:bg-purple-500/40 rounded-md">
        <Typography variant='h2' component='h1' color='purple' paddingY='20px' >
          <Link to={'/'}>Heyo</Link>
        </Typography>
        
        <Typography variant='h3' component='h2' color='purple' marginY='35px'>Sign Up</Typography>
        <form method='post' onSubmit={handleSubmit(formSubmit)} className='flex flex-col w-3/4 m-auto self-center'>
          <Paper elevation={1} sx={{ marginBottom: "45px" }}>
            <TextField {...register('name', {
              required: {
                value: true,
                message: "Name required"
              },
              maxLength: {
                value: 70,
                message: "70 characters max"
              }
            })} name='name' id="name" label="Name" autoComplete='off' variant="filled" color='secondary' fullWidth autoFocus inputProps={{ style: { fontSize: 22 } }}
              InputLabelProps={{ style: { fontSize: 20, color: 'purple' } }} />
          </Paper>
          {errors.name && <Typography variant='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"}>{errors.name?.message}</Typography>}
          <Paper elevation={1} sx={{ marginBottom: "40px" }}>
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
            })} name='username' id="username" label="Username" autoComplete='off' variant="filled" color='secondary' fullWidth inputProps={{ style: { fontSize: 23, margin: 'auto' } }}
              InputLabelProps={{ style: { fontSize: 20, color: 'purple' } }} />
          </Paper>
          {errors.username && <Typography variant='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"}>{errors.username?.message}</Typography>}
          <Paper elevation={1} sx={{ marginBottom: "40px" }}>
            <TextField {...register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email id"
              },
              required: {
                value: true,
                message: "Email id required"
              }
            })} name='email' id="email" label="Email Id" autoComplete='off' variant="filled" color='secondary' fullWidth inputProps={{ style: { fontSize: 23, margin: 'auto' } }}
              InputLabelProps={{ style: { fontSize: 20, color: 'purple' } }} />
          </Paper>
          {errors.email && <Typography variant='p' fontFamily={"Varela Round"} color='red' marginTop={"-32px"} marginBottom={"8px"} >{errors.email?.message}</Typography>}
          <Paper elevation={1} sx={{ marginBottom: "45px" }}>
            <FormControl variant="filled" color='secondary' fullWidth>
              <InputLabel htmlFor="outlined-adornment-password" sx={{ fontSize: 20, color: 'purple' }}>Password</InputLabel>
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
                inputProps={{ style: { fontSize: 23, margin: 'auto' } }} // font size of input text
              />
            </FormControl>
          </Paper>
          {errors.password && <Typography variant='p' fontFamily={"Varela Round"} color='red' marginTop={"-35px"} marginBottom={"11px"}>{errors.password?.message}</Typography>}
          <Button type='submit' variant="contained" color='secondary' sx={{ fontSize: '18px', height: '48px' }}>Sign Up</Button>
        </form>
        <Typography component='p' fontSize='23px' marginY={'40px'}>
          Already have an account? <Link className='font-semibold text-[#9c27b0] underline-offset-4 underline' to={'/signin'}>Sign In</Link>
        </Typography>
      </Box>
    </>
  )

}

export default SignUpForm