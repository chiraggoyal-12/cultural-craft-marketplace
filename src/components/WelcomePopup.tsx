import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import handoraLogo from "@/assets/handora-logo.png";
import popupImage from "@/assets/popup-image.jpeg";

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem("handora-welcome-popup-seen");
    if (!hasSeenPopup) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("handora-welcome-popup-seen", "true");
  };

  const handleRequestOTP = () => {
    // Handle OTP request logic here
    console.log("Requesting OTP for:", countryCode + phoneNumber);
    // For now, just close the popup
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 pt-16 sm:pt-24 smooth-transition">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col sm:flex-row smooth-transition">
        {/* Left Section - Image with Overlay */}
        <div className="relative w-full sm:w-1/2 h-48 sm:h-auto sm:min-h-[400px]">
          <img
            src={popupImage}
            alt="HANDORA Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 smooth-transition z-10"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center mb-2">
              <img
                src={handoraLogo}
                alt="HANDORA"
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
              Login / Sign Up
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Enter your log in details
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4 sm:mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="flex">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border border-gray-300 rounded-l-md px-2 sm:px-3 py-2 sm:py-2.5 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 border border-gray-300 rounded-r-md px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleRequestOTP}
              className="w-full bg-black text-white py-2 sm:py-2.5 px-4 rounded-md font-medium hover:bg-gray-800 smooth-transition mb-3 sm:mb-4 text-sm sm:text-base"
            >
              Request OTP
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              I accept that I have read & understood Privacy Policy and T&Cs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
