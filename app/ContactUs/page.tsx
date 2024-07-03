"use client";

import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('model');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    const formData = {
      selectedRole,
      name: nameRef.current!.value,
      address: addressRef.current!.value,
      mobileNumber: mobileNumberRef.current!.value,
      email: emailRef.current!.value,
      businessName: selectedRole === 'advertiser' ? businessNameRef.current?.value : '',
      age: selectedRole === 'model' ? ageRef.current?.value : '',
      files: imageFiles
    };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Form sent successfully");
        // Clear the form
        nameRef.current!.value = '';
        addressRef.current!.value = '';
        mobileNumberRef.current!.value = '';
        emailRef.current!.value = '';
        if (businessNameRef.current) businessNameRef.current.value = '';
        if (ageRef.current) ageRef.current.value = '';
        setImageFiles([]);
      } else {
        console.error("Failed to send email");
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <>
                    <input
                      type="number"
                      ref={ageRef}
                      required
                      placeholder="Age"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Attach Image Files</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        multiple
                        onChange={handleImageChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
              <button
                type="submit"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white ${
                  isSubmitting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Skyway Film Production</h2>
        <p className="text-gray-700 mb-4">
          Skyway Film Production is a premier film production company known for creating high-quality films and
          commercials. With a team of experienced professionals, we bring stories to life with creativity and
          innovation.
        </p>
        <p className="text-gray-700 mb-4">
          Our services include pre-production, production, and post-production. We handle everything from scriptwriting,
          casting, and location scouting to filming, editing, and visual effects. Our commitment to excellence ensures
          that every project meets the highest standards.
        </p>
        <p className="text-gray-700 mb-4">
          At Skyway Film Production, we are passionate about storytelling. Our portfolio includes award-winning films,
          engaging commercials, and captivating documentaries. We work closely with our clients to understand their
          vision and bring it to life on screen.
        </p>
        <p className="text-gray-700 mb-4">
          Whether you are a brand looking to create a compelling advertisement or a filmmaker with a unique story to
          tell, Skyway Film Production is here to help. Contact us today to discuss your project and see how we can
          collaborate to create something truly special.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
