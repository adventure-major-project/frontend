'use client';

import { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Sign-in
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Sign-in Error:', error);
    }
  };

  // Fetch Profile Data
  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          headers: { Authorization: `Bearer ${await user.getIdToken()}` }
        });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Google Sign-out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
        {!user ? (
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        ) : (
          <div className="text-center">
            <Image
              src={user.photoURL || '/default-avatar.png'}
              alt="Profile Picture"
              width={100}
              height={100}
              className="mx-auto rounded-full border-4 border-gray-700"
            />
            <h2 className="text-2xl font-semibold mt-3">{user.displayName}</h2>
            <p className="text-gray-400">{user.email}</p>
            {loading ? (
              <p className="mt-4 text-gray-400">Loading profile...</p>
            ) : profile ? (
              <div className="mt-4 text-left">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
                <p><strong>Joined:</strong> {new Date(profile.joined_at).toLocaleDateString()}</p>
              </div>
            ) : (
              <p className="mt-4 text-red-400">Profile data not available.</p>
            )}
            <button
              onClick={handleSignOut}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
