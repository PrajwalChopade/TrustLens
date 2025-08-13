import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Edit2, Save, User, Phone, MapPin, Calendar, Mail, Building, Users, Check } from 'lucide-react';
const UserProfileForm = () => {
const nav = useNavigate();

  const [currentSection, setCurrentSection] = useState('basic');
  const [isEditing, setIsEditing] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const current = JSON.parse(localStorage.getItem('current') || '{}');
  const [formData, setFormData] = useState({
    basic: {
      profilePhoto:  null,
      accessToReadPost: false,
      name: ''
    },
    personal: {
      phoneNumber: '',
      physicalAddress: '',
      mailingAddress: '',
      dateOfBirth: '',
      gender: ''
    },
    business: {
      
      businessName: '',
      businessEmail: '',
      businessPhoneNumber: '',
      numberOfEmployees: '',
      dateOfFoundation: ''
    }
  });

  const [hasBusiness, setHasBusiness] = useState(true);
  
  useEffect(() => {
    let fn = async () => {
      const response= await fetch('http://localhost:5000/userProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"email" : current.email}),
    });
    if(response.ok) {
      const res= await response.json();
      const finalRes = res.user;
      if (finalRes) {
        setFormData({
          basic: finalRes.basic || { profilePhoto: null, accessToReadPost: false, name: '' },
          personal: finalRes.personal || { phoneNumber: '', physicalAddress: '', mailingAddress: '', dateOfBirth: '', gender: '' },
          business: finalRes.business || { businessName: '', businessEmail: '', businessPhoneNumber: '', numberOfEmployees: '', dateOfFoundation: '' }
        });
        if(finalRes.basic && finalRes.basic.profilePhoto) {
          setProfileImage(finalRes.basic.profilePhoto)
        }
      }
    } else {
      // If no existing profile, initialize with user's email from session
      setFormData(prev => ({
        ...prev,
        basic: {
          ...prev.basic,
          name: current.name || '' // Pre-populate name if available
        }
      }));
    }
    }
    fn();
  }, [])

  useEffect(() => {console.log(formData)}, [formData])
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    console.log(formData)
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        handleInputChange('basic', 'profilePhoto', e.target.result);
      };
      reader.readAsDataURL(file);
    }  };
  
  const handleSubmit = async () => {
    try {
      // Validation check before sending
      if (!formData.basic.name || formData.basic.name.trim() === '') {
        alert('Please enter your name before saving the profile.');
        return;
      }
      
      // Generate digital ID
      const digitalId = `DID-${formData.basic.name.replace(/\s+/g, '').toUpperCase()}-${Date.now().toString().slice(-6)}`;
      
      // Create data structure with permissions arrays for categorized storage
      const userData = {
        email: current.email || "",
        basic: {
          profilePhoto: formData.basic.profilePhoto,
          accessToReadPost: formData.basic.accessToReadPost,
          name: formData.basic.name
        },
        personal: {
          phoneNumber: formData.personal.phoneNumber,
          physicalAddress: formData.personal.physicalAddress,
          mailingAddress: formData.personal.mailingAddress,
          dateOfBirth: formData.personal.dateOfBirth,
          gender: formData.personal.gender
        },
        business: {
          businessName: formData.business.businessName,
          businessEmail: formData.business.businessEmail,
          businessPhoneNumber: formData.business.businessPhoneNumber,
          numberOfEmployees: formData.business.numberOfEmployees ? parseInt(formData.business.numberOfEmployees) : null,
          dateOfFoundation: formData.business.dateOfFoundation
        },
        permissions: {
          basic: formData.basic.accessToReadPost ? ["read:photos"] : [],
          personal: formData.personal.phoneNumber ? ["read:calendar"] : [],
          business :hasBusiness ? ["read:photos"] : []
        },
        digitalId: digitalId
      };      userData.email = current.email;
      console.log('Sending data to server:', userData);
      console.log('Email check:', userData.email);
      console.log('Basic check:', userData.basic);
      console.log('Basic name check:', userData.basic.name);
      
      const response = await fetch('http://localhost:5000/api/users-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        alert(`Profile saved successfully!\nDigital ID: ${result.digitalId}\nUser ID: ${result.userId}`);
        setIsEditing(false);
        window.location.reload();
      } else {
        // Handle non-200 responses
        let errorMessage = 'Failed to save profile';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.error('Server error response:', errorData);
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      if (errorMessage.includes('fetch')) {
        alert('Could not connect to server. Please make sure your server is running on port 5000.');
      } else {
        alert(`Error saving profile: ${errorMessage}`);
      }
    }
  };

  const handleNext = () => {
    const sectionOrder = ['basic', 'personal', 'business'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const sectionOrder = ['basic', 'personal', 'business'];
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sectionOrder[currentIndex - 1]);
    }
  };

  const sections = [
    { id: 'basic', name: 'Basic Info', icon: User },
    { id: 'personal', name: 'Personal', icon: Phone },
    { id: 'business', name: 'Business', icon: Building }
  ];

  const renderBasicSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center overflow-hidden">
            {profileImage !== null? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-12 h-12 text-purple-400" />
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.basic.name}
            onChange={(e) => handleInputChange('basic', 'name', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={current.email}
            disabled={true}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Your email address"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="accessToReadPost"
            checked={formData.basic.accessToReadPost}
            onChange={(e) => handleInputChange('basic', 'accessToReadPost', e.target.checked)}
            disabled={!isEditing}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="accessToReadPost" className="ml-2 text-sm font-medium text-gray-900">
            Allow access to read posts
          </label>
        </div>
      </div>
    </div>
  );

  const renderPersonalSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.personal.phoneNumber}
          onChange={(e) => handleInputChange('personal', 'phoneNumber', e.target.value)}
          disabled={!isEditing}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
          placeholder="Enter your phone number"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Physical Address</label>
        <textarea
          value={formData.personal.physicalAddress}
          onChange={(e) => handleInputChange('personal', 'physicalAddress', e.target.value)}
          disabled={!isEditing}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
          placeholder="Enter your physical address"
          rows={3}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mailing Address</label>
        <textarea
          value={formData.personal.mailingAddress}
          onChange={(e) => handleInputChange('personal', 'mailingAddress', e.target.value)}
          disabled={!isEditing}
          className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
          placeholder="Enter your mailing address"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={formData.personal.dateOfBirth}
            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={formData.personal.gender}
            onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderBusinessSection = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hasBusiness"
          checked={hasBusiness}
          onChange={(e) => setHasBusiness(!hasBusiness)}
          disabled={!isEditing}
          className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="hasBusiness" className="ml-2 text-sm font-medium text-gray-900">
          Do you have a business?
        </label>
      </div>
      
      {hasBusiness && (
        <div className="space-y-4 pl-6 border-l-2 border-purple-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={formData.business.businessName}
              onChange={(e) => handleInputChange('business', 'businessName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
              placeholder="Enter business name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
            <input
              type="email"
              value={formData.business.businessEmail}
              onChange={(e) => handleInputChange('business', 'businessEmail', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
              placeholder="Enter business email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone Number</label>
            <input
              type="tel"
              value={formData.business.businessPhoneNumber}
              onChange={(e) => handleInputChange('business', 'businessPhoneNumber', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
              placeholder="Enter business phone number"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
              <input
                type="number"
                value={formData.business.numberOfEmployees}
                onChange={(e) => handleInputChange('business', 'numberOfEmployees', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                placeholder="Number of employees"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Founded</label>
              <input
                type="date"
                value={formData.business.dateOfFoundation}
                onChange={(e) => handleInputChange('business', 'dateOfFoundation', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDigitalID = () => (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">Digital ID</h3>
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden mb-2">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-white/60" />
          )}
        </div>
        <h4 className="font-semibold text-lg">{formData.basic.name || 'Name'}</h4>
        <p className="text-purple-200 text-sm">{current.email || 'Email'}</p>
      </div>
      
      <div className="space-y-2 text-sm">
        {formData.personal.phoneNumber && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span>{formData.personal.phoneNumber}</span>
          </div>
        )}
        {formData.personal.physicalAddress && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{formData.personal.physicalAddress}</span>
          </div>
        )}
        {formData.personal.dateOfBirth && (
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(formData.personal.dateOfBirth).toLocaleDateString()}</span>
          </div>
        )}
        {hasBusiness && formData.business.businessName && (
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            <span>{formData.business.businessName}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4">
      <button onClick = {() => {nav("/")}} style = {{margin : '10px', color : '#892FDA', border : '2px solid #892FDA', padding : '5px 10px', borderRadius : '7px', backgroundColor : 'rgba(214, 144, 255, 0.23)', fontWeight : '500'}}>Go Back</button>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">User Profile</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Form Section */}
            <div>
              {/* Section Navigation */}
              <div className="flex space-x-1 bg-purple-100 p-1 rounded-lg mb-6">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id)}
                      className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentSection === section.id
                          ? 'bg-white text-purple-700 shadow-sm'
                          : 'text-purple-600 hover:text-purple-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {section.name}
                    </button>
                  );
                })}
              </div>
              
              {/* Form Content */}
              <div className="bg-gray-50 rounded-lg p-6">
                {currentSection === 'basic' && renderBasicSection()}
                {currentSection === 'personal' && renderPersonalSection()}
                {currentSection === 'business' && renderBusinessSection()}
              </div>
                {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-3">
                  {currentSection !== 'basic' && isEditing && (
                    <button
                      onClick={handlePrevious}
                      className="flex items-center px-4 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      ← Previous
                    </button>
                  )}
                  
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-4 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  
                  {currentSection !== 'business' && isEditing && (
                    <button
                      onClick={handleNext}
                      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Next →
                    </button>
                  )}
                  
                  {currentSection === 'business' && isEditing && (
                    <button
                      onClick={handleSubmit}
                      className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Digital ID Preview */}
            <div>
              <div className="sticky top-6">
                {renderDigitalID()}
                
                {/* Additional ID Information */}
                <div className="mt-6 bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Profile Completion</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Basic Info</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        formData.basic.name ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {formData.basic.name ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Personal Info</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        formData.personal.phoneNumber && formData.personal.dateOfBirth ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {formData.personal.phoneNumber && formData.personal.dateOfBirth ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Business Info</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        hasBusiness && (formData.business.businessName && formData.business.businessEmail) ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hasBusiness && (formData.business.businessName && formData.business.businessEmail) ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;