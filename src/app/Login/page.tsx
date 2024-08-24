"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Admin credentials (could be stored in an environment variable for security)
      const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'supersecretpassword';

      if (username === adminUsername && password === adminPassword) {
        // Admin login logic
        localStorage.setItem('token', 'admin-token');
        router.push('/dashboard'); // Redirect to admin dashboard
        return;
      }

      // Regular user login logic
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and redirect to the dashboard
        localStorage.setItem('token', data.data.accessToken);
        router.push('/dashboard');
      } else {
        setError(data.result.responseDescription);
      }
    } catch (err) {
      setError('Credentials Dont Exists');
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              
            </a>
            <div className="text-center mb-6">
              <img
                src="1s.png" // Replace with the path to your logo
                alt="Logo"
                className="mx-auto h-16 w-auto" // Adjust size as needed
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              NavNeet TopTech Round 1
            </h1>

            <p className="mt-4 text-xl leading-relaxed text-gray-600">
              Sign in to your account to checkout Study-Materials,Test,Progress.....
            </p>

            <div className="mt-8">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div>
                  <label htmlFor="username" className="block px-2 text-sm font-medium text-gray-700">
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="   Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1  py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-0 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="   Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-0 sm:text-sm"
                  />
                </div>
                {error && (
                  <div className="text-red-600">
                    <p>{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
