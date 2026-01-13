'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Github,
  Chrome,
  ArrowRight,
  Loader,
  AlertCircle,
  CheckCircle,
  Shield,
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Fair';
    if (strength < 5) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return 'text-red-600';
    if (strength < 4) return 'text-yellow-600';
    if (strength < 5) return 'text-blue-600';
    return 'text-green-600';
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Mock signup API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real app, handle user registration here
      console.log('Signup data:', formData);

      // Redirect to onboarding or dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: 'google' | 'github') => {
    console.log(`Sign up with ${provider}`);
    // In real app, implement OAuth flow
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-600">
          Start protecting your projects from scope creep
        </p>
      </div>

      {/* Social Signup Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignup('google')}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignup('github')}
        >
          <Github className="mr-2 h-4 w-4" />
          Sign up with GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Or continue with email</span>
        </div>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3">
            <div className="flex">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`pl-10 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`pl-10 pr-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {formData.password && (
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-200 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    passwordStrength < 2
                      ? 'bg-red-500 w-1/5'
                      : passwordStrength < 4
                      ? 'bg-yellow-500 w-2/5'
                      : passwordStrength < 5
                      ? 'bg-blue-500 w-4/5'
                      : 'bg-green-500 w-full'
                  }`}
                />
              </div>
              <span className={`text-xs ${getPasswordStrengthColor(passwordStrength)}`}>
                {getPasswordStrengthLabel(passwordStrength)}
              </span>
            </div>
          )}
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Passwords match</span>
            </div>
          )}
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
              className={errors.acceptTerms ? 'border-red-500' : ''}
            />
            <Label htmlFor="acceptTerms" className="text-sm leading-5">
              I agree to the{' '}
              <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Security Features */}
      <div className="mt-8 rounded-lg bg-blue-50 p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Your data is secure
            </h3>
            <ul className="space-y-1 text-xs text-blue-700">
              <li>• Enterprise-grade encryption</li>
              <li>• SOC 2 Type II compliant</li>
              <li>• GDPR & CCPA compliant</li>
              <li>• 99.9% uptime SLA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}