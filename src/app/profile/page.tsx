'use client';
import { useState, useRef } from 'react';
import { updateProfile, updateEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase/config';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="text-on-surface-variant">Please sign in to view your profile.</div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      setMessage('Profile updated successfully.');
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image must be less than 5MB.');
      return;
    }

    setUploading(true);
    setMessage('');
    
    try {
      // Create a reference in Firebase Storage
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, file);
      
      // Get the public URL
      const photoURL = await getDownloadURL(avatarRef);
      
      // Update Firebase Auth profile
      await updateProfile(user, { photoURL });
      
      // Force reload to show new avatar everywhere
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      setMessage('Failed to upload profile picture.');
    } finally {
      setUploading(false);
    }
  };

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="flex-grow flex flex-col w-full max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-16 pw-page">
      <h1 className="font-display text-display text-on-surface mb-8">Account Settings</h1>
      
      <div className="bg-surface page-shadow rounded-3xl border border-outline-variant/20 p-8 md:p-12">
        
        {/* Avatar Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12 pb-12 border-b border-outline-variant/20">
          <div className="flex-shrink-0">
            <div 
              onClick={handleAvatarClick}
              className="relative w-32 h-32 rounded-full overflow-hidden bg-primary-container text-on-primary flex items-center justify-center text-4xl font-bold cursor-pointer group border-4 border-surface shadow-lg"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
              </div>
              
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl animate-spin">progress_activity</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <div className="pt-2">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Profile Picture</h2>
            <p className="text-on-surface-variant mb-4">Upload a new avatar. Larger images will be resized automatically.<br/>Maximum upload size is 5MB.</p>
            <button 
              onClick={handleAvatarClick}
              disabled={uploading}
              className="px-6 py-2.5 rounded-full border border-outline hover:bg-surface-container transition-colors font-label-md text-label-md text-on-surface"
            >
              {uploading ? 'Uploading...' : 'Change Picture'}
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSave} className="space-y-6">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Personal Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl ${message.includes('success') ? 'bg-primary/10 text-primary' : 'bg-error-container text-on-error-container'}`}>
              {message}
            </div>
          )}

          <div className="pt-6 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
