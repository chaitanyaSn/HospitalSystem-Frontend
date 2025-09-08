import { 
  IconHeartbeat, 
  IconLayoutGrid, 
  IconStethoscope,
  IconManFilled, 
  IconSettings, 
  IconCalendarSearch, 
  IconVaccine 
} from '@tabler/icons-react'
import React from 'react'
import { Avatar } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const links = [
  { name: 'Dashboard', url: '/doctor/dashboard', icon: <IconLayoutGrid size={20} stroke={1.5}/> },
  { name: 'Patients', url: '/doctor/patient', icon: <IconManFilled size={20} stroke={1.5}/> },
  { name: 'Doctors', url: '/doctor/doctor', icon: <IconStethoscope size={20} stroke={1.5}/> },
  { name: 'Appointments', url: '/doctor/appointment', icon: <IconCalendarSearch size={20} stroke={1.5}/> },
  { name: 'Pharmacy', url: '/doctor/pharmacy', icon: <IconVaccine size={20} stroke={1.5}/> },
  { name: 'Settings', url: '/doctor/settings', icon: <IconSettings size={20} stroke={1.5}/> },
]

const Sidebar = () => {
    const user=useSelector((state:any)=>state.user);
  return (
    <div className='flex'>
      <div className='w-64'>

      </div>

  
    <div className='bg-dark w-64 flex flex-col gap-5 items-center p-4 h-screen fixed' >
      
      {/* Logo */}
      <div className='text-primary-400 flex gap-1 items-center'>
        <IconHeartbeat size={40} stroke={2.5}/>
        <span className='text-3xl font-semibold'>Pulse</span>
      </div>

      {/* Avatar */}
      <div className='flex flex-col gap-2 items-center'>
        <div className='bg-white rounded-full p-1 shadow-xl'>
          <Avatar variant='filled' size="xl" src="avatar.png" alt="it's me" />
        </div>
        <span className='text-2xl font-medium text-light'>{user.name}</span>
        <span className='text-sm font-light text-light'>{user.role}</span>
      </div>

      {/* Links */}
      <div className='w-full mt-20'>
      <div className="flex flex-col gap-2 ">
        {links.map((link) => (
          <NavLink
            to={link.url}
            key={link.name}
            className={({ isActive }) =>
              `flex items-center gap-3 text-lg font-medium px-4 py-3  w-full rounded-lg ${
                isActive 
                  ? 'bg-primary-400 text-white-500 shadow-md'  // active style
                  : ' hover:bg-primary-300' // default style
              }`
            }
          >
            <span className='text-light'>{link.icon}</span>
            <span className='text-white font-bold text-lg'>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
    </div>
      </div>
  )
}

export default Sidebar
