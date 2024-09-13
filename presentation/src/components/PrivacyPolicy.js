import React from 'react';

function PrivacyPolicy({ isOpen, closeModal }) {
    if (!isOpen) return null; // Don't render anything if the modal is not open

    return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div  
            className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-8">Privacy Policy</h2>
            <div className="space-y-2 text-sm">
              <p>At EyeSeeYou, we are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our website and services.</p>
    
              <h3 className="font-semibold pt-4">1. Information We Collect</h3>
              <p className=''>We collect two types of information from you when you use our services:</p>
              <ul className="list-disc ml-5">
                <li><strong>Personal Information:</strong> Information that identifies you as an individual, such as your name, email address, phone number, and other contact details.</li>
                <li><strong>Non-Personal Information:</strong> Information that does not directly identify you, such as browsing data, device information, and IP address.</li>
              </ul>
    
              <h3 className="font-semibold pt-4">2. How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-5">
                <li>Provide and improve our services.</li>
                <li>Communicate with you about updates, promotions, and support.</li>
                <li>Analyze user behavior to enhance your experience on our website.</li>
                <li>Ensure the security and integrity of our systems.</li>
              </ul>
    
              <h3 className="font-semibold pt-4">3. How We Share Your Information</h3>
              <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following cases:</p>
              <ul className="list-disc ml-5">
                <li><strong>With Your Consent:</strong> We may share your information with third parties when you give us explicit consent.</li>
                <li><strong>Service Providers:</strong> We may share your information with trusted service providers who assist us in operating our website or conducting our business.</li>
                <li><strong>Legal Obligations:</strong> We may release your information when required by law or to protect our rights, property, or safety.</li>
              </ul>
    
              <h3 className="font-semibold pt-4">4. Cookies and Tracking Technologies</h3>
              <p>We use cookies and similar technologies to enhance your experience on our website. Cookies allow us to:</p>
              <ul className="list-disc ml-5">
                <li>Remember your preferences.</li>
                <li>Monitor site traffic and usage patterns.</li>
                <li>Personalize content based on your behavior.</li>
              </ul>
              <p>You can manage your cookie preferences through your browser settings, but this may affect your ability to use certain features on our website.</p>
    
              <h3 className="font-semibold pt-4">5. Data Security</h3>
              <p>We take the security of your personal information seriously. We use industry-standard encryption and secure protocols to protect your data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
            </div>
            <button
              onClick={closeModal}
              className="text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none mt-4"
            >
              Close
            </button>
          </div>
        </div>
      );
    }
export default PrivacyPolicy;