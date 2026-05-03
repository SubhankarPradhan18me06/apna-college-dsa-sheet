import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER } from '../../graphql/mutations';
import { useAuthStore } from '../../store/useAuthStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

const LoginPage: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN);
  const [registerMutation, { loading: registerLoading }] = useMutation(REGISTER);

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const handleLogin = async (data: LoginForm) => {
    setServerError('');
    try {
      const res = await loginMutation({ variables: data });
      setUser(res.data.login.user);
      navigate('/');
    } catch (e: any) {
      setServerError(e.message || 'Login failed');
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    setServerError('');
    try {
      const res = await registerMutation({ variables: { name: data.name, email: data.email, password: data.password } });
      setUser(res.data.register.user);
      navigate('/');
    } catch (e: any) {
      setServerError(e.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 flex transition-colors duration-300">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 bg-gray-50 dark:bg-dark-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-orange-radial pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-gradient">Apna College</h1>
        </div>
        <div className="relative">
          <blockquote className="text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            "First, solve the problem.<br />Then, write the code."
          </blockquote>
          <div className="w-1 h-16 bg-brand-orange rounded-full mb-4" />
          <p className="text-gray-400 max-w-sm">
            Join thousands of developers tracking their algorithmic mastery in a high-performance environment.
          </p>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex -space-x-2">
            {['A', 'B', 'C'].map((l) => (
              <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-amber-500 border-2 border-dark-800 flex items-center justify-center text-xs font-bold">
                {l}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-400"><strong className="text-white">+2K</strong> ACTIVE CODERS</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">Welcome Back</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">Enter your credentials to access your dashboard.</p>

            {/* Tabs */}
            <div className="flex rounded-lg border border-surface-border mb-6 p-1 gap-1">
              {(['login', 'register'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setServerError(''); }}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md uppercase tracking-wider transition-all ${tab === t ? 'bg-brand-orange text-white' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {serverError && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {serverError}
              </div>
            )}

            {/* Login Form */}
            {tab === 'login' && (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">✉</span>
                    <input
                      {...loginForm.register('email')}
                      id="login-email"
                      type="email"
                      placeholder="developer@algotrack.io"
                      className="input-field pl-10"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-400">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                    <button type="button" className="text-xs text-brand-orange hover:underline">Forgot?</button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔒</span>
                    <input
                      {...loginForm.register('password')}
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="input-field pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? '🙈' : '👁'}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-xs text-red-400">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  id="login-submit"
                  disabled={loginLoading}
                  className="btn-primary w-full py-3 text-sm uppercase tracking-widest mt-2 disabled:opacity-60"
                >
                  {loginLoading ? 'Initializing...' : 'Initialize Session →'}
                </button>
              </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    {...registerForm.register('name')}
                    id="register-name"
                    type="text"
                    placeholder="Subhankar Pradhan"
                    className="input-field"
                  />
                  {registerForm.formState.errors.name && (
                    <p className="mt-1 text-xs text-red-400">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    {...registerForm.register('email')}
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    className="input-field"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-400">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                  <input
                    {...registerForm.register('password')}
                    id="register-password"
                    type="password"
                    placeholder="Min. 6 characters"
                    className="input-field"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="mt-1 text-xs text-red-400">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Confirm Password</label>
                  <input
                    {...registerForm.register('confirmPassword')}
                    id="register-confirm-password"
                    type="password"
                    placeholder="Repeat password"
                    className="input-field"
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  id="register-submit"
                  disabled={registerLoading}
                  className="btn-primary w-full py-3 text-sm uppercase tracking-widest mt-2 disabled:opacity-60"
                >
                  {registerLoading ? 'Creating...' : 'Create Account →'}
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-surface-border" />
              <span className="text-xs text-gray-600 uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 h-px bg-surface-border" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button id="github-login" className="btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                <span>⌨</span> GitHub
              </button>
              <button id="google-login" className="btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                <span>G</span> Google
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-gray-600">
              By authenticating, you agree to the Apna College{' '}
              <a href="#" className="text-brand-orange hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
