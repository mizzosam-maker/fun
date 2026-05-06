"use client";

export default function SuspendedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full text-center">
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Service Temporarily Unavailable
        </h1>

        <p className="text-gray-500 mb-6">
          This service has been suspended.
        </p>

        {/*<button
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white"
        >
          Retry
        </button>*/}

      </div>
    </div>
  );
}