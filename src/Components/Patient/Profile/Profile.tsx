import {
  Avatar,
  Button,
  Divider,
  TextInput,
  Select,
  LoadingOverlay,
  Input,
} from '@mantine/core';
import {
  IconEdit,
  IconCheck,
  IconCalendar,
  IconPhone,
  IconMapPin,
  IconDroplet,
  IconAlertTriangle,
  IconHeart,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPatient, updatePatient } from '../../../Service/PatientProfileService';
import { useForm } from '@mantine/form';
import { errorNotification, successNotification } from '../../../Util/NotificationUtil';
import { format } from 'date-fns';
import { formatDate } from '../../../Util/DateUtil';

interface PatientProfile {
  id: string;
  name: string;
  email: string;
  dob: Date | null;
  phone: string;
  address: string;
  aadharNumber: string;
  bloodGroup: string;
  allergies: string;
  chronicDiseses: string;
}

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const bloodGroups = [
    { value: 'A_Positive', label: 'A+' },
    { value: 'A_Negative', label: 'A-' },
    { value: 'B_Positive', label: 'B+' },
    { value: 'B_Negative', label: 'B-' },
    { value: 'AB_Positive', label: 'AB+' },
    { value: 'AB_Negative', label: 'AB-' },
    { value: 'O_Positive', label: 'O+' },
    { value: 'O_Negative', label: 'O-' },
  ];

  const form = useForm({
    initialValues: {
      dob: '',
      phone: '',
      address: '',
      aadharNumber: '',
      bloodGroup: '',
      allergies: '',
      chronicDiseses: '',
    },
    validate: {
      phone: (value: string) =>
        value && value.length !== 10 ? 'Phone number must be 10 digits' : null,
      aadharNumber: (value: string) =>
        value && value.length !== 12 ? 'Aadhar number must be 12 digits' : null,
      address: (value: string) =>
        value && value.length < 5 ? 'Address must be at least 5 characters' : null,
      dob: (value: string) =>
        !value ? 'Please select a date of birth' : null,
    },
  });

  useEffect(() => {
    setLoading(true);
    getPatient(user.profileId)
      .then((data) => {
        setProfile(data);
        // Format date for input field (yyyy-MM-dd)
        const formattedDob = data.dob ? format(new Date(data.dob), 'yyyy-MM-dd') : '';
        
        form.setValues({
          dob: formattedDob,
          phone: data.phone || '',
          address: data.address || '',
          aadharNumber: data.aadharNumber || '',
          bloodGroup: data.bloodGroup || '',
          allergies: data.allergies || '',
          chronicDiseses: data.chronicDiseses || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        errorNotification('Failed to load profile');
        setLoading(false);
      });
  }, [user.profileId]);

  const handleSubmit = async (values: any) => {
    setSaving(true);
    // Convert date string back to Date object for formatting to backend
    const formattedValues = {
      ...profile,
      ...values,
      dob: values.dob ? new Date(values.dob) : null,
    };
    
    // Format for backend
    const backendData = {
      ...formattedValues,
      dob: formattedValues.dob ? format(formattedValues.dob, 'yyyy-MM-dd') : null,
    };
    
    console.log('Sending patient data:', backendData);
    updatePatient(backendData)
      .then((data) => {
        setProfile(data);
        setEdit(false);
        successNotification('Profile updated successfully');
        setSaving(false);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(err.response?.data?.errorMessage || 'Failed to update profile');
        setSaving(false);
      });
  };

  const handleCancel = () => {
    if (profile) {
      // Format date for input field (yyyy-MM-dd)
      const formattedDob = profile.dob ? format(new Date(profile.dob), 'yyyy-MM-dd') : '';
      
      form.setValues({
        dob: formattedDob,
        phone: profile.phone || '',
        address: profile.address || '',
        aadharNumber: profile.aadharNumber || '',
        bloodGroup: profile.bloodGroup || '',
        allergies: profile.allergies || '',
        chronicDiseses: profile.chronicDiseses || '',
      });
    }
    setEdit(false);
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-4xl relative">
        <LoadingOverlay visible={loading || saving} />

        {/* Header with Avatar and User Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar
              src="/"
              variant="filled"
              size={120}
              alt="Profile picture"
              className="bg-blue-100 text-blue-600"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <div className="text-2xl font-bold text-gray-800">{user.name}</div>
              <div className="text-gray-600">{user.email}</div>
              <div className="text-sm text-gray-500 mt-1">
                Patient ID: {profile?.id ? `#PAT-${profile.id}` : 'Loading...'}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {edit ? (
              <>
                <Button
                  variant="filled"
                  color="green"
                  leftSection={<IconCheck size={16} />}
                  loading={saving}
                  className="mb-2 md:mb-0"
                  onClick={() => {
                    const formElement = document.getElementById('patient-form') as HTMLFormElement | null;
                    formElement?.requestSubmit();
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  color="gray"
                  disabled={saving}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="filled"
                leftSection={<IconEdit size={16} />}
                onClick={() => setEdit(true)}
                className="mb-2 md:mb-0"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <Divider my="xl" className="border-gray-200" />

        {/* Personal Info */}
        <form id="patient-form" onSubmit={form.onSubmit(handleSubmit)}>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date of Birth */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconCalendar size={16} />
                Date of Birth
              </div>
              {edit ? (
                <Input
                  type="date"
                  value={form.values.dob}
                  onChange={(e) => form.setFieldValue('dob', e.currentTarget.value)}
                  placeholder="Select date of birth"
                  className="mt-2"
                />
              ) : (
                <div className="text-gray-800 mt-1">{formatDate(profile?.dob) || '-'}</div>
              )}
            </div>

            {/* Phone */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconPhone size={16} />
                Phone
              </div>
              {edit ? (
                <TextInput
                  placeholder="Phone"
                  value={form.values.phone}
                  onChange={(e) => form.setFieldValue('phone', e.currentTarget.value)}
                  className="mt-2"
                />
              ) : (
                <div className="text-gray-800 mt-1">{profile?.phone || '-'}</div>
              )}
            </div>

            {/* Aadhar Number */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconMapPin size={16} />
                Aadhar Number
              </div>
              {edit ? (
                <TextInput
                  placeholder="Aadhar Number"
                  value={form.values.aadharNumber}
                  onChange={(e) => form.setFieldValue('aadharNumber', e.currentTarget.value)}
                  className="mt-2"
                />
              ) : (
                <div className="text-gray-800 mt-1">{profile?.aadharNumber || '-'}</div>
              )}
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconMapPin size={16} />
                Address
              </div>
              {edit ? (
                <TextInput
                  value={form.values.address}
                  onChange={(e) => form.setFieldValue('address', e.currentTarget.value)}
                  placeholder="Address"
                  className="mt-2"
                />
              ) : (
                <div className="text-gray-800 mt-1">{profile?.address || '-'}</div>
              )}
            </div>

            {/* Blood Group */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconDroplet size={16} />
                Blood Group
              </div>
              {edit ? (
                <Select
                  placeholder="Select blood group"
                  data={bloodGroups}
                  value={form.values.bloodGroup}
                  onChange={(value) => form.setFieldValue('bloodGroup', value || '')}
                  className="mt-2"
                />
              ) : (
                <div className="text-gray-800 mt-1">{profile?.bloodGroup || '-'}</div>
              )}
            </div>

            {/* Allergies */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconAlertTriangle size={16} />
                Allergies
              </div>
              {edit ? (
                <TextInput
                  placeholder="Allergies (comma separated)"
                  className="mt-2"
                  value={form.values.allergies}
                  onChange={(e) => form.setFieldValue('allergies', e.currentTarget.value)}
                />
              ) : (
                <div className="text-gray-800 mt-1">
                  {profile?.allergies ? (
                    <div className="flex flex-wrap gap-1">
                      {profile.allergies.split(',').map((allergy, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                        >
                          {allergy.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </div>
              )}
            </div>

            {/* Chronic Diseases */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <IconHeart size={16} />
                Chronic Diseases
              </div>
              {edit ? (
                <TextInput
                  placeholder="Chronic Diseases (comma separated)"
                  className="mt-2"
                  value={form.values.chronicDiseses}
                  onChange={(e) => form.setFieldValue('chronicDiseses', e.currentTarget.value)}
                />
              ) : (
                <div className="text-gray-800 mt-1">
                  {profile?.chronicDiseses ? (
                    <div className="flex flex-wrap gap-1">
                      {profile.chronicDiseses.split(',').map((disease, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {disease.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hidden submit button for form submission */}
          <button type="submit" style={{ display: 'none' }} />
        </form>

        {/* Decorative element */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-20 rounded-full bg-blue-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;