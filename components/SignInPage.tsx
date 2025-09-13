import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Eye, 
  EyeOff,
  ArrowRight,
  Brain,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';

export function SignInPage() {
  const { login, signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    education: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(loginForm.email, loginForm.password);
      if (!success) {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup(
        signupForm.name,
        signupForm.email,
        signupForm.password,
        signupForm.education
      );
      if (!success) {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AuraLearn
                </h1>
                <p className="text-muted-foreground">AI-Powered Learning Hub</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl leading-tight">
                Transform Your Learning Journey with AI
              </h2>
              <p className="text-lg text-muted-foreground">
                Upload materials, get personalized insights, create study plans, and accelerate your learning with our intelligent platform.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm">AI Tutor</h3>
              </div>
              <p className="text-xs text-muted-foreground">Personalized learning assistance</p>
            </div>
            
            <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm">Smart Notes</h3>
              </div>
              <p className="text-xs text-muted-foreground">AI-generated summaries</p>
            </div>
            
            <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <h3 className="text-sm">Study Planner</h3>
              </div>
              <p className="text-xs text-muted-foreground">Optimized schedules</p>
            </div>
            
            <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm">Quick Tools</h3>
              </div>
              <p className="text-xs text-muted-foreground">File processing & more</p>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AuraLearn
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-8 h-8 p-0"
              >
                {theme === 'dark' ? (
                  <div className="w-4 h-4 rounded-full bg-yellow-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-700" />
                )}
              </Button>
            </div>

            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="text-center space-y-2">
                  <h3>Welcome back!</h3>
                  <p className="text-sm text-muted-foreground">Sign in to your AuraLearn account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 text-center">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="text-center space-y-2">
                  <h3>Join AuraLearn</h3>
                  <p className="text-sm text-muted-foreground">Create your account to get started</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-education" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Education Level
                    </Label>
                    <Select 
                      value={signupForm.education} 
                      onValueChange={(value) => setSignupForm({ ...signupForm, education: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School Student</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate Student</SelectItem>
                        <SelectItem value="graduate">Graduate Student</SelectItem>
                        <SelectItem value="phd">PhD Student</SelectItem>
                        <SelectItem value="professional">Working Professional</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 text-center">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}