import { useEffect, useState } from "react";

export default function Component() {
  const [img, setImg] = useState("");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "TRUSTLENS_AUTH_SUCCESS") {
        console.log("Received data from middleware:", event.data.data);
        if(event.data.data.basic.profilePhoto) {
            setImg(event.data.data.basic.profilePhoto);
        }
        // You can now do something with `event.data.data`, e.g. update state or call backend
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const openPopup = () => {
    const width = 650;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      "http://localhost:3000/middleware",
      "TrustlensAuthPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable=no,toolbar=no,menubar=no,scrollbars=no,status=no`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to your account and continue your journey
            </p>
          </div>

          {/* Trustlens Sign In Section */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">Sign in with your trusted identity</p>
              <button
                onClick={openPopup}
                className="w-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Sign in with Trustlens</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Traditional Sign In Form */}
            <div className="space-y-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">Email Address</div>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">Password</div>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </div>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
            </div>

            {/* Profile Image Display */}
            {img && (
              <div className="text-center space-y-3 p-4 bg-green-50 rounded-2xl border border-green-200">
                <p className="text-sm text-green-600 font-medium">✓ Successfully authenticated with Trustlens</p>
                <img 
                  src={img} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full mx-auto shadow-lg border-4 border-white"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-white/60 rounded-full px-4 py-2 backdrop-blur-sm">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secured by Trustlens Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}