import { Typography, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/userContext'
import { useSignOut } from '../lib/react-query/queries'
function Navbar() {
  const { userDetails, isAuthenticated, setIsAuthenticated } = useContext(UserContext)
  const { mutate: signOut, isSuccess } = useSignOut()
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  const [dropDownState, setDropDownState] = React.useState(false)

  return (
    <section className='w-full bg-purple-500/40'>
      <nav className='p-2 sm:w-[87%] m-auto flex justify-between items-center'>
        <Typography variant='h2' component='h1' color='purple'>
          <Link to={'/'}>Heyo</Link>
        </Typography>
        <button className='dropdown-trigger' onClick={() => setDropDownState((state) => !state)}>
          <img src={userDetails.imageUrl} alt="profile-image" className='w-12 rounded-full ' />
        </button>


        <div className={`dropdown ${dropDownState ? 'active':'inactive'}`}>

          <Typography align='center' className='pt-3' variant='h6' color={'whitesmoke'} component='p' fontFamily={'Varela Round'}>Hey</Typography>

          <Typography align='center' className='p-5 pt-0' variant='h5' color={'purple'} component='p' fontFamily={'Varela Round'}>{userDetails.name}!</Typography>

          <Divider style={{ backgroundColor: 'whitesmoke', height: '4px', width: '100%' }} />

          <Typography textAlign={'center'} color={'purple'} paddingTop={'1.25rem'} paddingBottom={"1.25rem"} variant='h6' component='p' className='cursor-pointer hover:bg-purple-500/40 ' fontFamily={'Varela Round'}><Link to={`profile/${userDetails.accountid}`}>Profile</Link></Typography>

          <button className='font-varela rounded-b-sm text-center text-red-600 w-full hover:bg-purple-500/40 text-lg p-5' onClick={() => signOut()}>Sign Out</button>

        </div>
      </nav>
    </section>
  )
}

export default Navbar