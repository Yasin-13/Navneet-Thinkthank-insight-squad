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
      const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'supersecretpassword';

      if (username === adminUsername && password === adminPassword) {
        localStorage.setItem('token', 'admin-token');
        router.push('/dashboard');
        return;
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.accessToken);
        router.push('/dashboard');
      } else {
        setError(data.result.responseDescription);
      }
    } catch (err) {
      setError('Credentials Don’t Exist');
    }
  };

  return (
    <section>
      <div className="grid md:h-screen md:grid-cols-2">
        {/* Left Component */}
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="max-w-lg px-5 py-16 text-center md:px-10 md:py-24 lg:py-32 border border-gray-300 rounded- shadow-md">
            <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl"><span className='text-green-600'>NavNeet</span> TopTech Round-1</h2>
            <span className="flex items-center">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 py-4 text-lg text-green-600 font-bold px-6">Login</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <form
              className="mx-auto mb-4 max-w-sm pb-4"
              name="wf-form-password"
              method="get"
              onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            >
              <div className="relative">
                <img
                  alt=""
                  src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                  className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                />
                <input
                  type="text"
                  className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="relative mb-4">
                <img
                  alt=""
                  src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg"
                  className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                />
                <input
                  type="password"
                  className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-center">
                  <p>{error}</p>
                </div>
              )}
              <button
                type="submit"
                className="flex items-center justify-center bg-green-600 px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(34,_197,_94)_-8px_8px] hover:[box-shadow:rgb(34,_197,_94)_-8px_8px\]"
              >
                <p className="mr-6 font-bold">Login</p>
                <svg className="h-4 w-4 flex-none" fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                  <title>Arrow Right</title>
                  <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* Right Component */}
        <div className="flex flex-col items-center justify-center bg-[#f2f2f7]">
          <div className="max-w-lg px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-green-600 [box-shadow:rgb(171,_196,_245)_-8px_8px]">
              <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f5ec37c8c32b17d1c725_Vector-9.svg" alt="" className="inline-block" />
            </div>
            <p className="mb-8 text-3xl font-semibold text-[#647084] md:mb-12 lg:mb-16">We now accept the fact that learning is a lifelong process of keeping abreast of change. And the most pressing task is to teach people how to learn.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
