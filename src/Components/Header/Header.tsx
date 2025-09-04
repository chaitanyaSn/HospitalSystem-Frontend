
import { ActionIcon, Button } from '@mantine/core';
import { IconBellRinging, IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeJwt } from '../../Slices/JwtSlices';
import { removeUser } from '../../Slices/UserSlice';
const Header = () => {
  const jwt=useSelector((state:any)=>state.jwt);
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(removeJwt());
    dispatch(removeUser())
  }
  return (
    <div className='shadow-md bg-light h-16 flex justify-between px-5 items-center'>
      <ActionIcon variant="transparent" size="xl" aria-label="Settings">
      <IconLayoutSidebarLeftCollapse style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
    <div className='flex items-center gap-5'>
      {jwt?<Button onClick={handleLogout}>Logout</Button>:<Link to="/login"><Button>Login</Button></Link>}
      {jwt&&<><ActionIcon variant="outline" size="lg" aria-label="Settings">
      <IconBellRinging style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
    <ProfileMenu/></>}
    </div>

    </div>
  )
}

export default Header
