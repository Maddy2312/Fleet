import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const Protected = ({ children, role = null }) => {
  const { user, loading } = useSelector(
    (state) => state.auth
  );

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* HEADER */}
        <div className="bg-black py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div>
              <div className="h-10 w-72 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-700 rounded mt-3 animate-pulse"></div>
            </div>

            <div className="h-12 w-40 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* STATS */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>

                <div className="h-10 w-16 bg-gray-300 rounded mt-4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-56 bg-gray-300 rounded animate-pulse mb-8"></div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden shadow"
              >
                <div className="h-60 bg-gray-300 animate-pulse"></div>

                <div className="p-5">
                  <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse mb-4"></div>

                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-8 w-20 bg-gray-300 rounded animate-pulse mt-5"></div>

                  <div className="flex gap-3 mt-5">
                    <div className="flex-1 h-10 bg-blue-200 rounded animate-pulse"></div>

                    <div className="flex-1 h-10 bg-red-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;