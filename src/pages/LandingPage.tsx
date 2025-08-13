import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Code, 
  ChevronRight, 
  Check, 
  Star, 
  Zap, 
  Globe, 
  Lock, 
  Eye,
  ArrowRight,
  Play,
  Menu,
  X,
  Sparkles,
  Award,
  TrendingUp,
  Database,
  Fingerprint,
  Bot,
  AlertTriangle,
  Server,
  Layers,
  Settings,
  BookOpen,
  MessageSquare
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-cycle features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AI-Powered Privacy",
      description: "Intelligent consent management with real-time policy analysis and automated privacy controls"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Blockchain Security",
      description: "Immutable identity verification with tamper-proof data handling and cryptographic assurance"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Smart Detection",
      description: "Advanced anomaly detection for unauthorized access attempts and suspicious activities"
    }
  ];

  const coreFeatures = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Sovereignty",
      description: "Complete control over your personal data with granular access permissions"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Threat Detection",
      description: "Real-time monitoring and alerts for potential security breaches"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Enterprise Ready",
      description: "Scalable infrastructure built to handle millions of authentication requests"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Multi-Layer Security",
      description: "Defense in depth with encryption, tokenization, and secure enclaves"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Developer APIs",
      description: "Comprehensive REST APIs with detailed documentation and SDKs"
    }
  ];

  const benefits = [
    "Zero-knowledge architecture ensures your data stays private",
    "GDPR, CCPA, and SOC 2 compliant by design",
    "Sub-second authentication response times",
    "End-to-end encryption for all data transmissions",
    "Open-source transparency with community auditing"
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-purple-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                TrustLens
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">How It Works</a>
              <a href="#security" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Security</a>
              <a href="#docs" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">Documentation</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">How It Works</a>
              <a href="#security" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">Security</a>
              <a href="#docs" className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors">Documentation</a>
              <div className="pt-2 border-t border-gray-200">
                <Link to="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
                <Link to="/register" className="block px-3 py-2 bg-purple-600 text-white rounded-lg mt-2 text-center hover:bg-purple-700 transition-colors">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Announcement Banner */}
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-2 mb-8 border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800">
              Introducing AI-Powered Privacy Controls
            </span>
            <ArrowRight className="w-4 h-4 text-purple-600 ml-2" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">Privacy-First</span>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              Authentication Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Empower users with complete control over their digital identity while providing developers 
            with enterprise-grade authentication infrastructure that respects privacy by design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center"
            >
              Start Building Today
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow border border-gray-200">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-medium">View Documentation</span>
            </button>
          </div>

          {/* Key Benefits */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Zero-Knowledge Architecture</h3>
                <p className="text-gray-600 text-sm">Your data never leaves your control with client-side encryption and decentralized storage.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast Integration</h3>
                <p className="text-gray-600 text-sm">Get up and running in minutes with comprehensive APIs and detailed documentation.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                <p className="text-gray-600 text-sm">Built to meet the highest security standards with continuous monitoring and updates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Features Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on cutting-edge technologies to deliver uncompromising security and performance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    index === currentFeature
                      ? 'bg-white border-purple-300 shadow-xl scale-105'
                      : 'bg-white/70 border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl transition-colors flex-shrink-0 ${
                      index === currentFeature ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">TrustLens Control Panel</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Security Status</span>
                      </div>
                      <div className="text-sm font-semibold text-green-600">Active</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Authentication APIs</span>
                      </div>
                      <div className="text-sm font-semibold text-blue-600">Ready</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium">Privacy Controls</span>
                      </div>
                      <div className="text-sm font-semibold text-purple-600">Enabled</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                      All systems operational • Last updated: Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Authentication
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive security features designed for both developers and end users
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Users vs Developers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're protecting your privacy or building the next big thing
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Users */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-purple-100 rounded-2xl mr-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Privacy-Conscious Users</h3>
                </div>
                
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Take complete control of your digital identity with transparent, user-friendly 
                  privacy controls that put you in the driver's seat.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/register"
                  className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center w-full justify-center"
                >
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* For Developers */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-2xl mr-4">
                    <Code className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">For Modern Developers</h3>
                </div>
                
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Build privacy-first applications with our comprehensive API suite, 
                  detailed documentation, and enterprise-grade infrastructure.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "RESTful APIs with comprehensive documentation",
                    "SDKs for popular programming languages",
                    "Real-time webhooks and event streaming",
                    "Advanced analytics and user insights",
                    "24/7 technical support and consulting"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/register"
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center w-full justify-center"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build the Future of Authentication?
          </h2>
          <p className="text-xl text-purple-100 mb-12 leading-relaxed">
            Join the privacy revolution and help create a more secure, transparent internet 
            where users control their own data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <a 
              href="#docs"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl text-lg font-medium transition-all inline-flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold">TrustLens</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Building the future of privacy-first authentication. Empowering users and developers 
                with transparent, secure, and intelligent identity management solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#docs" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Open Source</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 TrustLens. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease-in-out infinite;
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }
      `}</style>
    </div>
  );
}