import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand */}
          <div>
            <h2 className="text-2xl font-bold">YourCompany</h2>
            <p className="text-sm text-gray-400 mt-2">
              Empowering learning and growth through online courses.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/mentor/login" className="hover:text-white">Login as a mentor</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/refunds" className="hover:text-white">Refund Policy</a></li>
            </ul>
            
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="hover:text-blue-500"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="hover:text-blue-600"><i className="fab fa-linkedin text-xl"></i></a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

 