'use client';
import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (!error) router.push('/login');
    else {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <main className="p-4 flex flex-col sm:items-center">
        <h1 className="text-4xl mb-2">Create new account</h1>
        <h3 className="text-2xl font-light text-gray-500 leading-loose">
          Looking forward to have you onboard!
        </h3>
        <form className="flex flex-col gap-5 mt-5 w-full">
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-sky-400 focus:ring-1"
              placeholder="Enter your email address"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-sky-400 focus:ring-1"
              placeholder="Enter your password"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Confirm Password
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-sky-400 focus:ring-1"
              placeholder="Confirm your password"
            />
          </label>
          <label htmlFor="" className="flex gap-2 items-center">
            <input type="checkbox" className="default:ring-2 accent-sky-500" />
            <span className="block text-sm font-medium text-slate-200">
              Send me news & invites for experimental features.
            </span>
          </label>
          <div className="flex w-full gap-2">
            <button
              onClick={handleSignUp}
              disabled={password !== confirmPassword || isLoading}
              type="button"
              className="bg-sky-700 hover:bg-sky-800 py-2 rounded-md grow disabled:cursor-not-allowed"
            >
              Register
            </button>
            <Link
              href="/login"
              className="text-center outline outline-sky-700 py-2 hover:outline-none hover:bg-sky-700 rounded-md grow"
            >
              Already have an account
            </Link>
          </div>
          {error && (
            <div className="border border-red-800 p-2 rounded-md text-red-600">
              {error}
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default Page;
