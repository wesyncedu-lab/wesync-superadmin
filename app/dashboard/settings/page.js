"use client";

import { FiCreditCard, FiSettings } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <FiSettings className="text-blue-600" /> Settings
      </h1>

      {/* Profile Section */}
      <section className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-bold mb-6">Super Admin Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-gray-50 mt-1"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg bg-gray-50 mt-1"
              placeholder="admin@wesync.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg bg-gray-50 mt-1"
              placeholder="********"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg bg-gray-50 mt-1"
              placeholder="********"
            />
          </div>
        </div>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Save Changes
        </button>
      </section>

      
      {/* System Settings */}
      <section className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-bold mb-6">System Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Enable Notifications</h3>
              <p className="text-gray-500 text-sm">Send alerts for new school signups</p>
            </div>
            <input type="checkbox" className="toggle toggle-primary" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Maintenance Mode</h3>
              <p className="text-gray-500 text-sm">Temporarily disable dashboard access</p>
            </div>
            <input type="checkbox" className="toggle toggle-primary" />
          </div>
        </div>
      </section>

      {/* Payment Settings Shortcut */}
      <section className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-xl font-bold mb-6">Payment Integrations</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiCreditCard className="text-blue-600 text-xl" />
            <div>
              <h3 className="font-semibold">Razorpay / Stripe</h3>
              <p className="text-gray-500 text-sm">
                Manage subscription payment gateways
              </p>
            </div>
          </div>

          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Configure
          </button>
        </div>
      </section>
    </div>
  );
}
