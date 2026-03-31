import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Github, Loader2, Sparkles } from 'lucide-react';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from?: { pathname: string } } | null;
  const from = state?.from?.pathname || '/dashboard';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.session) {
          toast.success("Registration successful.");
          navigate(from, { replace: true });
          return;
        }
        toast.success("Registration successful! Please check your email, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Successfully signed in.");
        navigate(from, { replace: true });
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin + '/dashboard' }
      });
      if (error) throw error;
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row font-sans selection:bg-amber-500/30 text-zinc-50">
      {/* LEFT PANEL / BRANDING */}
      <div className="hidden md:flex flex-1 relative overflow-hidden flex-col justify-center items-center p-12 lg:p-24 border-r border-zinc-800/50 bg-[#0c0c0e]">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(200,136,42,0.15)_0%,rgba(0,0,0,0)_60%)] opacity-50 blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-lg w-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">QuanSynd</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-medium tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The premier platform for AI-native development.
          </h1>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
            Join thousands of developers building the next generation of software with our persistent PTY swarms and quantitative intelligence.
          </p>
          
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0c0c0e] bg-zinc-800 flex items-center justify-center`}>
                <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
              </div>
            ))}
            <div className="pl-6 text-sm text-zinc-500 flex items-center">
              Trusted by 10k+ engineers
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL / FORM */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 relative bg-zinc-950">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-zinc-400 text-sm">
              {isSignUp ? 'Enter your details below to create your account' : 'Enter your email and password to sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-zinc-100 placeholder:text-zinc-600 h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                {!isSignUp && (
                  <a href="#" className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-zinc-900 border-zinc-800 focus-visible:ring-amber-500 text-zinc-100 placeholder:text-zinc-600 h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:text-zinc-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-medium transition-colors mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-950 px-3 text-zinc-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOAuth('github')}
              className="bg-transparent border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white h-11"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOAuth('google')}
              className="bg-transparent border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white h-11"
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-amber-500 hover:text-amber-400 hover:underline transition-all"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
