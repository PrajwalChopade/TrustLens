import { useEffect, useRef, useState } from "react";
import { Camera, Building2, Calendar, Mail, Phone, User, Users, Shield, Info, AlertCircle, CheckCircle, Eye, Lock, Globe, Clock, ChevronRight, ChevronDown, ChevronUp, BarChart4, FileText, Bell } from "lucide-react";

// Utility functions for device detection
function getOS() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Win")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  return "Unknown OS";
}

function getBrowser() {
  const userAgent = navigator.userAgent;
  if (/chrome|crios/i.test(userAgent)) return "Chrome";
  if (/firefox|fxios/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari";
  if (/edg/i.test(userAgent)) return "Edge";
  if (/opera|opr/i.test(userAgent)) return "Opera";
  return "Unknown Browser";
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    if (/Tablet|iPad/i.test(ua)) {
      return "Tablet";
    }
    return "Mobile";
  }
  return "Desktop";
}

let devEmail = "";

const icons = {
  basic: <Mail className="w-5 h-5 text-blue-500" />,
  personal: <User className="w-5 h-5 text-purple-500" />,
  business: <Building2 className="w-5 h-5 text-green-500" />,
};

// Detailed field descriptions with reasons, security info, etc.
const fieldDescriptions = {
  email: {
    reason: "Account Authentication & Communication",
    description: "Your email address is essential for account verification, security notifications, and important updates about your account activity.",
    security: "Used for secure login and password recovery, encrypted in transit and at rest",
    importance: "High",
    icon: <Mail className="w-5 h-5" />,
    examples: "Used to send verification links, security alerts, and account updates"
  },
  name: {
    reason: "Personalized User Experience",
    description: "Your name helps us personalize your experience and ensures proper account attribution in our systems.",
    security: "Stored securely and never shared with third parties without consent",
    importance: "Medium",
    icon: <User className="w-5 h-5" />,
    examples: "Displayed in your profile, used in communications, and for account verification"
  },
  profilePhoto: {
    reason: "Visual Identity & Personalization",
    description: "A profile photo helps personalize your account and makes it easily recognizable when signing in across devices.",
    security: "Stored securely with industry-standard encryption",
    importance: "Low (Optional)",
    icon: <Camera className="w-5 h-5" />,
    examples: "Displayed on your profile and when signing in to services"
  },
  phoneNumber: {
    reason: "Account Security & Recovery",
    description: "Your phone number provides an additional verification layer for enhanced account security and recovery options.",
    security: "Used only for verification, two-factor authentication, and account recovery",
    importance: "Medium",
    icon: <Phone className="w-5 h-5" />,
    examples: "Used for SMS verification codes and account recovery"
  },
  dateOfBirth: {
    reason: "Age Verification & Compliance",
    description: "Your date of birth helps us verify your age for compliance with age-restricted features and legal requirements.",
    security: "Stored securely and used only for age verification purposes",
    importance: "Medium",
    icon: <Calendar className="w-5 h-5" />,
    examples: "Used to verify eligibility for certain services and for age-appropriate content"
  },
  gender: {
    reason: "Service Personalization",
    description: "Your gender helps us provide more relevant features and content tailored to your preferences.",
    security: "Stored privately and used only for personalization purposes",
    importance: "Low",
    icon: <User className="w-5 h-5" />,
    examples: "Used for personalized recommendations and gender-specific features"
  },
  physicalAddress: {
    reason: "Service Delivery & Compliance",
    description: "Your physical address enables location-based services and ensures compliance with regional regulations.",
    security: "Encrypted and accessed only when needed for specific functionality",
    importance: "Medium",
    icon: <Globe className="w-5 h-5" />,
    examples: "Used for location-based features, shipping, and compliance with local laws"
  },
  mailingAddress: {
    reason: "Communications & Documentation",
    description: "Your mailing address allows us to send important physical correspondence and legal documents when necessary.",
    security: "Stored securely and used only for official communications",
    importance: "Medium",
    icon: <Mail className="w-5 h-5" />,
    examples: "Used for sending physical mail, legal notices, and documentation"
  },
  businessName: {
    reason: "Business Account Management",
    description: "Your business name identifies your organization in our system and is essential for business accounts.",
    security: "Displayed only in business contexts and protected with enterprise-grade security",
    importance: "High for business accounts",
    icon: <Building2 className="w-5 h-5" />,
    examples: "Used for invoicing, business verification, and organizational features"
  },
  businessEmail: {
    reason: "Business Communication Channel",
    description: "Your business email serves as the primary contact point for business-related communications and account management.",
    security: "Protected with enhanced security protocols for business communications",
    importance: "High for business accounts",
    icon: <Mail className="w-5 h-5" />,
    examples: "Used for business notifications, invoicing, and enterprise support"
  },
  businessPhoneNumber: {
    reason: "Business Verification & Support",
    description: "Your business phone enables account verification and provides a direct contact channel for urgent matters.",
    security: "Used only for business verification and support communications",
    importance: "Medium for business accounts",
    icon: <Phone className="w-5 h-5" />,
    examples: "Used for account verification and urgent business communications"
  },
  numberOfEmployees: {
    reason: "Service Optimization",
    description: "This information helps us tailor our business services to match your organization's size and needs.",
    security: "Used only for service customization and never shared externally",
    importance: "Low",
    icon: <Users className="w-5 h-5" />,
    examples: "Used to recommend appropriate features and service tiers"
  },
  dateOfFoundation: {
    reason: "Business Profile Verification",
    description: "This information helps verify your business's legitimacy and history, enhancing trust and security.",
    security: "Used only for business verification purposes",
    importance: "Low",
    icon: <Calendar className="w-5 h-5" />,
    examples: "Used for business verification and account security"
  }
};

// Field labels for better display
const labels = {
  profilePhoto: "Profile Photo",
  email: "Email Address",
  name: "Full Name",
  phoneNumber: "Phone Number",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  physicalAddress: "Physical Address",
  mailingAddress: "Mailing Address",
  businessName: "Business Name",
  businessEmail: "Business Email",
  businessPhoneNumber: "Business Phone Number",
  numberOfEmployees: "Number of Employees",
  dateOfFoundation: "Date of Foundation"
};

// Interface for backend data structure
interface final {
  id: string;
  name: string;
  purpose: string;
  icon: string;
  devEmail: string;
  userEmail: string;
  privacyPolicyUrl: string;
  dataCategories: string[];
  permissions: {
    name: string;
    status: 'Granted' | 'Denied';
  }[];
  timestamp: string;
  country: string;
  ip_address: string;
  browser: string;
  device_type: string;
  operating_system: string;
  successful: boolean;
  risk_level: string;
  location: {
    city: string;
    state: string | null;
    country_code: string;
  };
  app_color: string;
  accessFrequency: string;
}

const defaultFinalState: final = {
  id: '',
  name: '',
  purpose: '',
  icon: '',
  userEmail: '',
  devEmail: '',
  privacyPolicyUrl: '',
  dataCategories: [],
  permissions: [],
  timestamp: '',
  country: '',
  ip_address: '',
  browser: '',
  device_type: '',
  operating_system: '',
  successful: false,
  risk_level: '',
  location: {
    city: '',
    state: null,
    country_code: ''
  },
  app_color: '',
  accessFrequency: ''
};

export default function Middleware({ apiKey }: { apiKey: string }) {
  const [found, setFound] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [test, setTest] = useState("");
  const current = JSON.parse(localStorage.getItem('current') || '{}');
  const [step, setStep] = useState(1);
  const [perms, setPerms] = useState<Record<string, string[]>>({});
  const [isEditing, setIsEditing] = useState(true);
  const [backData, setBackData] = useState<final>(defaultFinalState);
  const [devInfo, setDevInfo] = useState<any>("");
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});

  // Form data state
  const [formData, setFormData] = useState({
    basic: {
      profilePhoto: null,
      accessToReadPost: false,
      email: '',
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

  const inputRef = useRef<HTMLInputElement>(null);
  const click = useRef<HTMLInputElement>(null);

  // Toggle field explanation
  const toggleFieldExpand = (field: string) => {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Fetch permissions and developer info
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/getPerms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "key": apiKey })
      });
      
      if (response.ok) {
        const res = await response.json();
        setPerms(res);
      }

      const response2 = await fetch('http://localhost:5000/getDevProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "key": apiKey })
      });
      
      if (response2.ok) {
        const res2 = await response2.json();
        setDevInfo(res2);
        devEmail = res2.email;
      }
    };
    
    fetchData();
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch('http://localhost:5000/userProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": current.email }),
      });
      
      if (response.ok) {
        const res = await response.json();
        const finalRes = res.user;

        // Format date fields
        if (finalRes.personal?.dateOfBirth) {
          finalRes.personal.dateOfBirth = finalRes.personal.dateOfBirth.slice(0, 10);
        }
        if (finalRes.business?.dateOfFoundation) {
          finalRes.business.dateOfFoundation = finalRes.business.dateOfFoundation.slice(0, 10);
        }

        setFormData({
          basic: finalRes.basic || formData.basic,
          personal: finalRes.personal || formData.personal,
          business: finalRes.business || formData.business
        });
      }
    };
    
    fetchUserProfile();
  }, []);

  // Check if user has signed up before
  useEffect(() => {
    const checkSignedUp = async () => {
      const response1 = await fetch('http://localhost:5000/signedUp', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ "userEmail": current.email, "devEmail": devEmail })
      });

      if (response1.ok) {
        const res1 = await response1.json();
        setFound(res1.found);
      }
    };
    
    if (devEmail && current.email) {
      checkSignedUp();
    }
  }, [devEmail, current]);

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('basic', 'profilePhoto', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate total required fields
  const getTotalRequiredFields = () => {
    let count = 0;
    Object.entries(perms).forEach(([section, fields]) => {
      fields.forEach(field => {
        if (field !== 'profilePhoto') count++; // profilePhoto is optional
      });
    });
    return count;
  };

  // Welcome screen (Step 1)
  function One() {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center opacity-0 animate-fadeIn">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <Shield className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {found ? "Welcome Back" : "Create TrustLens Account"}
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-sm">
          {found 
            ? "Continue with your existing account to securely authenticate" 
            : "Set up your secure digital identity to control your data"
          }
        </p>
        
        <button
          onClick={async () => {
            if (!found) {
              setStep(2);
            } else {
              if (window.opener) {
                let newBackData = {};
                
                const response1 = await fetch('https://ipapi.co/json/', {
                  method: 'GET',
                  headers: { 'Content-type': 'application/json' }
                });
                
                if (response1.ok) {
                  const res1 = await response1.json();
                  newBackData = {
                    id: new Date().toLocaleString().replace(/[ ,]/g, '') + apiKey + current.email,
                    userEmail: current.email,
                    devEmail: devInfo.email,
                    name: devInfo.name,
                    purpose: devInfo.description,
                    icon: devInfo.image,
                    privacyPolicyUrl: devInfo.privacyPolicy,
                    permissions: Object.values(perms).flat().map(((p) => ({ "name": p, "status": "Granted" }))),
                    dataCategories: Object.keys(perms),
                    successful: true,
                    risk_level: "Low",
                    browser: getBrowser(),
                    operating_system: getOS(),
                    device_type: getDeviceType(),
                    country: res1.country_name,
                    ip_address: res1.ip,
                    location: { "city": res1.city, "state": res1.region, "country_code": res1.country_code }
                  };
                  setBackData((bd) => ({ ...bd, ...newBackData }));
                }
                
                const response2 = await fetch('http://localhost:5000/middleware', {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(newBackData)
                });
                
                window.opener.postMessage(
                  {
                    type: "TRUSTLENS_AUTH_SUCCESS",
                    data: formData
                  },
                  "*"
                );
              }
              
              window.opener.postMessage(
                {
                  type: "TRUSTLENS_AUTH_SUCCESS",
                  data: formData
                },
                "*"
              );
              
              window.close();
            }
          }}
          className="flex items-center space-x-3 bg-white shadow-lg rounded-xl p-4 border border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
            {localStorage.getItem("pfp") ? (
              <img 
                src={localStorage.getItem('pfp') || ""} 
                className="w-full h-full rounded-full object-cover" 
                alt="Profile"
              />
            ) : (
              <span className="text-lg font-semibold text-purple-600">
                {localStorage.getItem('name')?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-base font-medium text-gray-800 truncate">
              {localStorage.getItem('name') || "User"}
            </p>
            <p className="text-sm text-gray-500 truncate">{current.email}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        
        <div className="mt-10 text-xs text-gray-500 flex items-center">
          <Lock className="w-3 h-3 mr-1" />
          <span>Secured by TrustLens Authentication</span>
        </div>
      </div>
    );
  }

  // Consent screen (Step 2)
  function Two() {
    useEffect(() => {
      scrollRef.current?.scrollTo(0, 0);
    }, []);

    return (
      <div
        ref={scrollRef}
        className="max-w-4xl mx-auto p-6 opacity-0 animate-fadeIn"
      >
        {/* App Info Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {devInfo?.image ? (
                  <img 
                    src={devInfo.image} 
                    alt={devInfo.name || "App"} 
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">{devInfo?.name || "Application"} Permissions</h1>
                <p className="text-purple-100">
                  {devInfo?.description || "This application is requesting access to your information"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Verified Developer</span>
              </div>
              <div className="text-sm text-gray-500">
                {devInfo?.email}
              </div>
            </div>
            
            {/* Data Request Summary */}
            <div className="mt-6 bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-800">Data Access Request</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    {devInfo?.name || "This application"} is requesting access to {getTotalRequiredFields()} pieces of your personal information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Categories */}
        {Object.entries(perms).map(([section, fields]) => fields.length > 0 ? (
          <div 
            key={section}
            className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden transform translate-y-0 opacity-100 transition-all duration-500 ease-out"
          >
            {/* Section Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 border-b">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${section === 'basic' ? 'bg-blue-100' : 
                   section === 'personal' ? 'bg-purple-100' : 'bg-green-100'}`}>
                  {icons[section]}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 capitalize">{section} Information</h2>
                  <p className="text-sm text-gray-600">
                    {section === "basic"
                      ? "Essential information for account authentication"
                      : section === "personal"
                      ? "Personal details for enhanced service delivery"
                      : "Business information for professional services"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Fields */}
            <div className="p-5 space-y-6">
              {fields.map((field) => (
                <div key={field} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  {/* Field Header */}
                  <div 
                    onClick={() => toggleFieldExpand(field)}
                    className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors
                      ${expandedFields[field] ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                        ${field === 'profilePhoto' ? 'bg-gray-100' : 'bg-blue-100'}`}>
                        {fieldDescriptions[field]?.icon || <Info className="w-5 h-5 text-blue-500" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{labels[field] || field}</h3>
                          {field !== 'profilePhoto' ? (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Required
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Optional
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {fieldDescriptions[field]?.reason || `Used for account functionality`}
                        </p>
                      </div>
                    </div>
                    <div>
                      {expandedFields[field] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {/* Field Details (Expandable) */}
                  {expandedFields[field] && (
                    <div
                      className="overflow-hidden transition-all duration-300 bg-gray-50"
                    >
                      <div className="p-4 space-y-4">
                        {/* Why We Need This */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />
                            Why We Need This
                          </h4>
                          <p className="text-sm text-gray-600">
                            {fieldDescriptions[field]?.description || 
                              "This information is required for the application to function properly."}
                          </p>
                        </div>
                        
                        {/* How It's Used */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <BarChart4 className="w-4 h-4 text-purple-500 mr-2" />
                            How It's Used
                          </h4>
                          <p className="text-sm text-gray-600">
                            {fieldDescriptions[field]?.examples || 
                              "This information is used to provide and improve our services."}
                          </p>
                        </div>
                        
                        {/* Security & Privacy */}
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                            <Lock className="w-4 h-4 text-green-500 mr-2" />
                            Security & Privacy
                          </h4>
                          <p className="text-sm text-gray-600">
                            {fieldDescriptions[field]?.security || 
                              "Your data is encrypted and stored securely following industry best practices."}
                          </p>
                        </div>
                        
                        {/* Field Input */}
                        {field !== "profilePhoto" ? (
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Your {labels[field] || field}:
                            </label>
                            <input
                              id={field}
                              type={
                                field.includes('date') ? 'date' : 
                                field.includes('email') ? 'email' : 
                                field.includes('phone') || field.includes('Phone') ? 'tel' :
                                'text'
                              }
                              value={formData[section][field] || ""}
                              onChange={(e) => handleInputChange(section, field, e.target.value)}
                              placeholder={`Enter your ${labels[field]?.toLowerCase() || field}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              required={field !== 'profilePhoto'}
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center mt-3">
                            <div className="relative">
                              <div 
                                onClick={() => click.current?.click()}
                                className="w-24 h-24 rounded-full bg-purple-100 border-4 border-purple-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-300 transition-colors"
                              >
                                {formData.basic.profilePhoto ? (
                                  <img 
                                    src={formData.basic.profilePhoto} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <Camera className="w-10 h-10 text-purple-400" />
                                )}
                              </div>
                              <button
                                onClick={() => click.current?.click()}
                                className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                              >
                                <Camera className="w-4 h-4" />
                              </button>
                              <input
                                type="file"
                                ref={click}
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null)}
        
        {/* Privacy Policy & Data Handling */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-3">How Your Data is Protected</h3>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Data is encrypted during transmission and storage</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Access is limited to only what the app needs</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>You can revoke access at any time from your dashboard</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>All data access is logged and monitored</span>
                  </div>
                </div>
              </div>
              
              {devInfo?.privacyPolicy && (
                <a 
                  href={devInfo.privacyPolicy}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 text-sm"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  View Full Privacy Policy
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setStep(1)}
            className="px-5 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={async () => {
              // Check if all required fields are filled
              let allRequiredFieldsFilled = true;
              Object.entries(perms).forEach(([section, fields]) => {
                fields.forEach(field => {
                  if (field !== 'profilePhoto' && (!formData[section][field] || formData[section][field].trim() === '')) {
                    allRequiredFieldsFilled = false;
                  }
                });
              });

              if (!allRequiredFieldsFilled) {
                alert("Please fill in all required fields before proceeding.");
                return;
              }

              // Process data and send to parent window
              if (window.opener) {
                let newBackData = {};
                
                const response1 = await fetch('https://ipapi.co/json/', {
                  method: 'GET',
                  headers: { 'Content-type': 'application/json' }
                });
                
                if (response1.ok) {
                  const res1 = await response1.json();
                  newBackData = {
                    id: new Date().toLocaleString().replace(/[ ,]/g, '') + apiKey + current.email,
                    userEmail: current.email,
                    devEmail: devInfo.email,
                    name: devInfo.name,
                    purpose: devInfo.description,
                    icon: devInfo.image,
                    privacyPolicyUrl: devInfo.privacyPolicy,
                    permissions: Object.values(perms).flat().map(((p) => ({ "name": p, "status": "Granted" }))),
                    dataCategories: Object.keys(perms),
                    successful: true,
                    risk_level: "Low",
                    browser: getBrowser(),
                    operating_system: getOS(),
                    device_type: getDeviceType(),
                    country: res1.country_name,
                    ip_address: res1.ip,
                    location: { "city": res1.city, "state": res1.region, "country_code": res1.country_code }
                  };
                  setBackData((bd) => ({ ...bd, ...newBackData }));
                }
                
                const response2 = await fetch('http://localhost:5000/middleware', {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(newBackData)
                });
                
                // Send message to parent window
                window.opener.postMessage(
                  {
                    type: "TRUSTLENS_AUTH_SUCCESS",
                    data: formData
                  },
                  "*"
                );
              }
              
              window.opener.postMessage(
                {
                  type: "TRUSTLENS_AUTH_SUCCESS",
                  data: formData
                },
                "*"
              );
              
              window.close();
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-md flex items-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Grant Access</span>
          </button>
        </div>
        
        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mb-4">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              <span>Encrypted Connection</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              <span>TrustLens Protected</span>
            </div>
            <div className="flex items-center">
              <Bell className="w-3 h-3 mr-1" />
              <span>Access Monitoring</span>
            </div>
          </div>
          <p>© {new Date().getFullYear()} TrustLens Authentication | All Rights Reserved</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {step === 1 ? <One /> : <Two />}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
      `}</style>
    </div>
  );
}