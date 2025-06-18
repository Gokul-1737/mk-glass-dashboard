
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/GlassCard';
import { toast } from 'sonner';

const Login = () => {
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.userId === 'mkshopping@gmail.com' && credentials.password === 'mkshopping123') {
      localStorage.setItem('mk_shopping_auth', 'authenticated');
      toast.success('Login successful! Welcome to MK Shopping Portal');
      
      // Add login success animation delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      toast.error('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center animate-pulse"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <GlassCard className="w-full max-w-md p-8 animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-8 animate-slide-in-top">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              MK Shopping
            </h1>
            <p className="text-white/70">Product Management Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4 animate-slide-in-left">
              <div>
                <Label htmlFor="userId" className="text-white/80">User ID</Label>
                <Input
                  id="userId"
                  type="email"
                  placeholder="mkshopping@gmail.com"
                  value={credentials.userId}
                  onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="mkshopping123"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-3 animate-slide-in-right">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Create Account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-white/5 rounded-lg animate-fade-in">
            <p className="text-xs text-white/60 text-center">
              Demo: mkshopping@gmail.com / mkshopping123
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
