// app/privacy/page.tsx

import { ShieldCheck, Lock, Database, Bell, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <ShieldCheck className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Privacy Policy
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Your privacy matters to us. This Privacy Policy explains what
            information we collect, how we use it, and the choices you have
            regarding your personal information while using our boxing learning
            platform.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Effective Date: January 1, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-3xl shadow-sm border p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">
            Our Commitment
          </h2>

          <p className="text-slate-600 leading-8">
            We are committed to protecting your privacy and ensuring your
            personal information is handled responsibly. We collect only the
            information necessary to provide and improve your experience while
            using our boxing tutorials, training programs, comics, quizzes, and
            other learning resources.
          </p>
        </div>

        {/* Sections */}

        <div className="space-y-8">

          {/* Information */}
          <div className="bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-3 mb-5">
              <Database className="text-red-600" />
              <h2 className="text-2xl font-bold">
                Information We Collect
              </h2>
            </div>

            <ul className="space-y-3 text-slate-600 leading-7 list-disc pl-6">
              <li>Name and profile information.</li>
              <li>Email address.</li>
              <li>Training progress and completed lessons.</li>
              <li>Quiz scores and achievements.</li>
              <li>Device information and app usage analytics.</li>
              <li>Crash reports used to improve stability.</li>
              <li>Subscription information (if applicable).</li>
            </ul>
          </div>

          {/* Usage */}
          <div className="bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-3 mb-5">
              <Lock className="text-red-600" />
              <h2 className="text-2xl font-bold">
                How We Use Your Information
              </h2>
            </div>

            <ul className="space-y-3 text-slate-600 leading-7 list-disc pl-6">
              <li>Provide access to boxing lessons.</li>
              <li>Track your learning progress.</li>
              <li>Personalize recommendations.</li>
              <li>Improve training content.</li>
              <li>Respond to customer support requests.</li>
              <li>Send important service notifications.</li>
              <li>Maintain platform security.</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl border p-8">
            <h2 className="text-2xl font-bold mb-4">
              Cookies & Analytics
            </h2>

            <p className="text-slate-600 leading-8">
              Our website may use cookies and analytics technologies to improve
              performance, remember preferences, and understand how users
              interact with our platform. These technologies help us make the
              experience better over time.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl border p-8">
            <h2 className="text-2xl font-bold mb-4">
              Data Security
            </h2>

            <p className="text-slate-600 leading-8">
              We implement industry-standard security measures to protect your
              personal information against unauthorized access, disclosure,
              alteration, or destruction. While no online service is completely
              secure, we continuously work to safeguard your data.
            </p>
          </div>

          {/* Third Party */}
          <div className="bg-white rounded-2xl border p-8">
            <h2 className="text-2xl font-bold mb-4">
              Third-Party Services
            </h2>

            <p className="text-slate-600 leading-8">
              We may use trusted third-party providers for authentication,
              analytics, cloud storage, notifications, payment processing, and
              other essential services. These providers only receive the
              information necessary to perform their services and are expected
              to protect your information.
            </p>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-3 mb-5">
              <Bell className="text-red-600" />
              <h2 className="text-2xl font-bold">
                Notifications
              </h2>
            </div>

            <p className="text-slate-600 leading-8">
              We may send notifications about new lessons, training reminders,
              achievements, account activity, and important updates. You can
              disable non-essential notifications from your device settings.
            </p>
          </div>

          {/* Rights */}
          <div className="bg-white rounded-2xl border p-8">
            <h2 className="text-2xl font-bold mb-4">
              Your Rights
            </h2>

            <ul className="space-y-3 text-slate-600 leading-7 list-disc pl-6">
              <li>Access your personal information.</li>
              <li>Update inaccurate information.</li>
              <li>Request deletion of your account.</li>
              <li>Withdraw consent where applicable.</li>
              <li>Contact us with privacy-related concerns.</li>
            </ul>
          </div>

          {/* Changes */}
          <div className="bg-white rounded-2xl border p-8">
            <h2 className="text-2xl font-bold mb-4">
              Changes to This Policy
            </h2>

            <p className="text-slate-600 leading-8">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page along with the updated effective date.
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-3xl bg-red-600 text-white p-10 text-center mt-12">
            <Mail className="mx-auto mb-4 w-10 h-10" />

            <h2 className="text-3xl font-bold mb-4">
              Contact Us
            </h2>

            <p className="text-red-100 max-w-xl mx-auto leading-8">
              If you have any questions about this Privacy Policy or how your
              information is handled, please contact our support team.
            </p>

            <a
              href="mailto:support@yourboxingapp.com"
              className="inline-block mt-8 bg-white text-red-600 font-semibold px-8 py-3 rounded-xl hover:bg-red-50 transition"
            >
              support@yourboxingapp.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}