import { Avatar, Button, Divider, TextInput } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const patient = {
  dob: '10-10-2000',
  phone: '9876543210',
  address: 'Nagpur, India',
  bloodGroup: 'O+',
  allergies: 'Peanuts',
  chronicDiseases: 'Asthma',
};

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [edit, setEdit] = useState(false);

  return (
    <div className="p-4 md:p-10 bg-primary-400 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-3xl">
        {/* Header with Avatar and User Info */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Avatar
              src="/"
              variant="filled"
              size={120}
              alt="Profile picture"
              className="bg-primary-100 text-primary-400"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>

            <div className="flex flex-col gap-2 text-center md:text-left">
              <div className="text-2xl font-bold text-primary-400">
                {user.name}
              </div>
              <div className="text-gray-600">{user.email}</div>
              <div className="text-sm text-primary-300 mt-1">
                Patient ID: #PAT-12345
              </div>
            </div>
          </div>

          {edit ? (
            <Button
              variant="filled"
              leftSection={<IconEdit />}
              onClick={() => setEdit(false)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="filled"
              leftSection={<IconEdit />}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          )}
        </div>

        <Divider my="xl" className="border-primary-100" />

        {/* Personal Info */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-primary-400">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date of Birth */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-primary-500">
                Date of Birth
              </div>
              {edit ? (
                <TextInput
                  placeholder="Date of Birth"
                  className="mt-2"
                  defaultValue={patient.dob}
                />
              ) : (
                <div className="text-gray-700 mt-1">{patient.dob}</div>
              )}
            </div>

            {/* Phone */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-primary-500">Phone</div>
              {edit ? (
                <TextInput
                  placeholder="Phone"
                  className="mt-2"
                  defaultValue={patient.phone}
                />
              ) : (
                <div className="text-gray-700 mt-1">{patient.phone}</div>
              )}
            </div>

            {/* Address */}
            <div className="bg-primary-50 p-4 rounded-lg md:col-span-2">
              <div className="text-sm font-medium text-primary-500">Address</div>
              {edit ? (
                <TextInput
                  placeholder="Address"
                  className="mt-2"
                  defaultValue={patient.address}
                />
              ) : (
                <div className="text-gray-700 mt-1">{patient.address}</div>
              )}
            </div>

            {/* Blood Group */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-primary-500">
                Blood Group
              </div>
              {edit ? (
                <TextInput
                  placeholder="Blood Group"
                  className="mt-2"
                  defaultValue={patient.bloodGroup}
                />
              ) : (
                <div className="text-gray-700 mt-1">{patient.bloodGroup}</div>
              )}
            </div>

            {/* Allergies */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-primary-500">
                Allergies
              </div>
              {edit ? (
                <TextInput
                  placeholder="Allergies"
                  className="mt-2"
                  defaultValue={patient.allergies}
                />
              ) : (
                <div className="text-gray-700 mt-1">{patient.allergies}</div>
              )}
            </div>

            {/* Chronic Diseases */}
            <div className="bg-primary-50 p-4 rounded-lg md:col-span-2">
              <div className="text-sm font-medium text-primary-500">
                Chronic Diseases
              </div>
              {edit ? (
                <TextInput
                  placeholder="Chronic Diseases"
                  className="mt-2"
                  defaultValue={patient.chronicDiseases}
                />
              ) : (
                <div className="text-gray-700 mt-1">
                  {patient.chronicDiseases}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-20 rounded-full bg-primary-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
