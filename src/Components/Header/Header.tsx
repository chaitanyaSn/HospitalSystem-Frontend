
import { ActionIcon, Button } from '@mantine/core';
import { IconBellRinging, IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className='shadow-md bg-light h-16 flex justify-between px-5 items-center'>
      <ActionIcon variant="transparent" size="xl" aria-label="Settings">
      <IconLayoutSidebarLeftCollapse style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
    <div className='flex items-center gap-5'>
      <Link to="/login"><Button>Login</Button></Link>
      <ActionIcon variant="outline" size="lg" aria-label="Settings">
      <IconBellRinging style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
    <ProfileMenu/>
    </div>

    </div>
  )
}

export default Header
