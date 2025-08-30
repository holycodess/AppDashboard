'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function AuthPage() {
  const supabase = createClient()
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to access your dashboard
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(59 130 246)',
                    brandAccent: 'rgb(37 99 235)',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full px-4 py-2 rounded-lg font-medium transition-colors',
                input: 'w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white',
                label: 'text-sm font-medium text-slate-700 dark:text-slate-300',
                message: 'text-sm text-red-600 dark:text-red-400',
                anchor: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium',
                divider: 'text-slate-400 dark:text-slate-500',
              },
            }}
            providers={['google', 'facebook']}
            redirectTo={`${window.location.origin}/auth/callback`}
            view="sign_in"
            showLinks={true}
            theme={theme === 'dark' ? 'dark' : 'default'}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing in...',
                  social_provider_text: 'Sign in with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                  password_input_placeholder: 'Enter your password',
                  email_input_placeholder: 'Enter your email',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign Up',
                  loading_button_label: 'Signing up...',
                  social_provider_text: 'Sign up with {{provider}}',
                  link_text: 'Already have an account? Sign in',
                  confirmation_text: 'Check your email for the confirmation link',
                  password_input_placeholder: 'Create a password',
                  email_input_placeholder: 'Enter your email',
                },
                forgotten_password: {
                  email_label: 'Email address',
                  button_label: 'Send Reset Instructions',
                  loading_button_label: 'Sending...',
                  link_text: 'Back to sign in',
                  confirmation_text: 'Check your email for the password reset link',
                  email_input_placeholder: 'Enter your email',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}