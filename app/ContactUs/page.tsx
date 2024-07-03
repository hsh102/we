"use client"
import React, { useState, useRef } from 'react';

const ContactUs: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('model');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const businessNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('selectedRole', selectedRole);
    formData.append('name', nameRef.current!.value);
    formData.append('address', addressRef.current!.value);
    formData.append('mobileNumber', mobileNumberRef.current!.value);
    formData.append('email', emailRef.current!.value);

    if (selectedRole === 'advertiser' && businessNameRef.current) {
      formData.append('businessName', businessNameRef.current.value);
    } else if (selectedRole === 'model' && ageRef.current) {
      formData.append('age', ageRef.current.value);
      for (const file of imageFiles) {
        formData.append('files', file);
      }
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('An error occurred while saving the data');
      }
    } catch (error) {
      console.error('An error occurred while sending the request');
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value="01583292-ed67-4792-8643-3f46b8d4052e" />
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="model"
                    checked={selectedRole === 'model'}
                    onChange={handleRoleChange}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">I am a Model</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="advertiser"
                    checked={selectedRole === 'advertiser'}
                    onChange={handleRoleChange}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">I am an Advertiser</span>
                </label>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  ref={nameRef}
                  required
                  placeholder="Name"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  ref={addressRef}
                  required
                  placeholder="Address"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="tel"
                  ref={mobileNumberRef}
                  required
                  placeholder="Mobile Number"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="Email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {selectedRole === 'advertiser' && (
                  <input
                    type="text"
                    ref={businessNameRef}
                    required
                    placeholder="Business Name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
                {selectedRole === 'model' && (
                  <div>
                    <input
                      type="hidden"
                      data-fileupload="true"
                      data-maxsize="2"
                      data-images-only="true"
                      name="attachment"
                      id="attachment"
                      required
                      accept="image/jpeg,image/png"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label className="block text-sm font-medium text-gray-700">Attach Image Files</label>
                    <input
                      type="file"
                      data-fileupload="true"
                      data-maxsize="2"
                      data-images-only="true"
                      name="attachment"
                      id="attachment"
                      required
                      accept="image/jpeg,image/png"
                      multiple
                      onChange={handleImageChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
                {selectedRole === 'model' && (
                  <input
                    type="number"
                    ref={ageRef}
                    required
                    placeholder="Age"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
