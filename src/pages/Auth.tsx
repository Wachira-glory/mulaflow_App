// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Logo } from '@/components/ui/logo';
// import { useAuth } from '@/hooks/useAuth';
// import { toast } from 'sonner';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showResendConfirmation, setShowResendConfirmation] = useState(false);
//   const navigate = useNavigate();
//   const { signIn, signUp, signInWithGoogle, resendConfirmation, loading } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (!isLogin && (!firstName || !lastName)) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (!isLogin && !agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       return;
//     }

//     try {
//       if (isLogin) {
//         await signIn(email, password);
//       } else {
//         await signUp(email, password, firstName, lastName);
//         // Show resend confirmation option and switch to login
//         setShowResendConfirmation(true);
//         setIsLogin(true);
//         setPassword('');
//       }
//     } catch (error: any) {
//       if (error.message?.includes('verify your email') || error.message?.includes('Email not confirmed')) {
//         setShowResendConfirmation(true);
//       }
//     }
//   };

//   const handleGoogleAuth = async () => {
//     try {
//       await signInWithGoogle();
//     } catch (error: any) {
//       console.error('Google auth error:', error);
//     }
//   };

//   const handleResendConfirmation = async () => {
//     if (!email) {
//       toast.error('Please enter your email address');
//       return;
//     }
    
//     try {
//       await resendConfirmation(email);
//     } catch (error) {
//       console.error('Resend confirmation error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md">
//           <div className="mb-8 w-[210px] h-[56px]">
//             <Logo />
//           </div>
          
//           <Card className="p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold mb-2">
//                 {isLogin ? 'Login' : 'Create an account'}
//               </h1>
//               <p className="text-gray-600">
//                 {isLogin 
//                   ? 'Enter your email and password below to login'
//                   : 'Enter your email and password below to create your account'
//                 }
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Button
//                 type="button"
//                 onClick={handleGoogleAuth}
//                 variant="outline"
//                 className="w-full flex items-center justify-center space-x-2"
//                 disabled={loading}
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 <span>{isLogin ? 'Continue with Google' : 'Sign up with Google'}</span>
//               </Button>

//               {!isLogin && (
//                 <div className="text-center text-sm text-gray-500">
//                   By clicking 'Sign up with Google' I agree to the{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
//                   , acknowledge Mulaflow's{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
//                   , and consent to receive updates, special offers, and promotional emails. I understand that I can opt out at any time.
//                 </div>
//               )}

//               <div className="text-center text-sm text-gray-500">
//                 or continue with email
//               </div>

//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">First Name</label>
//                     <Input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       placeholder="John"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Last Name</label>
//                     <Input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Doe"
//                       required
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder={isLogin ? "name@example.com" : "Johndoe@gmail.com"}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••••••••"
//                   required
//                 />
//               </div>

//               {!isLogin && (
//                 <div className="flex items-start space-x-2">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={agreeToTerms}
//                     onChange={(e) => setAgreeToTerms(e.target.checked)}
//                     className="mt-1"
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-600">
//                     By clicking continue, you agree to our{' '}
//                     <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
//                     and{' '}
//                     <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
//                   </label>
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//                 disabled={loading}
//               >
//                 {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign up')}
//               </Button>

//               {/* Email confirmation help */}
//               {showResendConfirmation && isLogin && (
//                 <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                   <p className="text-sm text-yellow-800 mb-2">
//                     Haven't received the confirmation email?
//                   </p>
//                   <Button
//                     type="button"
//                     onClick={handleResendConfirmation}
//                     variant="outline"
//                     size="sm"
//                     disabled={loading}
//                   >
//                     Resend Confirmation Email
//                   </Button>
//                 </div>
//               )}
//             </form>

//             {isLogin && (
//               <div className="text-center mt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setShowResendConfirmation(false);
//                   }}
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   Need an account? Sign up
//                 </button>
//               </div>
//             )}
//           </Card>

//           {!isLogin && (
//             <div className="text-center mt-4">
//               <span className="text-sm text-gray-600">Already have an account? </span>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsLogin(true);
//                   setShowResendConfirmation(false);
//                 }}
//                 className="text-blue-600 hover:underline text-sm"
//               >
//                 Login here
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Side - Background */}
//       <div className="flex-1 hidden lg:block relative overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23191970;stop-opacity:1" /><stop offset="100%" style="stop-color:%23000080;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(%23a)"/><g fill="%23FFD700" opacity="0.8"><circle r="2" cx="200" cy="200"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></circle><circle r="1" cx="800" cy="300"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle><circle r="1.5" cx="300" cy="700"><animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/></circle><circle r="1" cx="700" cy="800"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle><circle r="2" cx="100" cy="500"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></circle></g></svg>')`
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/60 to-purple-900/80" />
        
//         {/* Animated stars */}
//         <div className="absolute inset-0">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 3}s`
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Logo } from '@/components/ui/logo';
// import { useAuth } from '@/hooks/useAuth';
// import { toast } from 'sonner';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_ANON_KEY!
// );

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true); // Start with login form
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showResendConfirmation, setShowResendConfirmation] = useState(false);
//   const [formLoading, setFormLoading] = useState(false); // Local loading for form submission
//   const navigate = useNavigate();
//   const { signIn, signUp, signInWithGoogle, resendConfirmation, loading: authLoading } = useAuth(); // Renamed loading from useAuth to authLoading
//   const location = useLocation();

//   useEffect(() => {
//   const completeMagicLinkFlow = async () => {
//     const url = window.location.href;
//     const token = new URLSearchParams(location.search).get('token');

//     if (!token) return; // Skip if not coming from invite

//     try {
//       // 1. Finish magic link login
//       const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(url);

//       if (sessionError || !sessionData?.user) {
//         toast.error('Magic link login failed');
//         return;
//       }

//       const authUser = sessionData.user;

//       // 2. Find profile by token
//       const { data: profile, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', token)
//         .single();

//       if (profileError || !profile) {
//         toast.error('Invalid or expired invitation token');
//         return;
//       }

//       // 3. Update profile with auth_id and accepted info
//       const { error: updateError } = await supabase
//         .from('profiles')
//         .update({
//           auth_id: authUser.id,
//           idata: {
//             ...profile.idata,
//             accepted_at: new Date().toISOString(),
//             status: 'accepted',
//           },
//         })
//         .eq('id', token);

//       if (updateError) {
//         toast.error('Failed to update profile after invite');
//         return;
//       }

//       toast.success('Welcome! Your invite is now active.');
//       navigate('/dashboard'); // Or wherever you want to send them
//     } catch (error) {
//       console.error('Magic link error:', error);
//       toast.error('Something went wrong with your invite.');
//     }
//   };

//   completeMagicLinkFlow();
// }, [location]);

//   // Combine auth hook loading with local form loading for all buttons and inputs
//   const isLoading = authLoading || formLoading; 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormLoading(true); // Start local form loading immediately

//     // Basic client-side validation
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       setFormLoading(false); // Ensure loading is reset
//       return;
//     }

//     if (!isLogin && (!firstName || !lastName)) {
//       toast.error('Please fill in all fields');
//       setFormLoading(false); // Ensure loading is reset
//       return;
//     }

//     if (!isLogin && !agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       setFormLoading(false); // Ensure loading is reset
//       return;
//     }

//     try {
//       if (isLogin) {
//         await signIn(email, password);
//         setShowResendConfirmation(false); // Hide resend after successful login attempt
//       } else {
//         await signUp(email, password, firstName, lastName);
//         // After successful signup, switch to login and clear password
//         setIsLogin(true);
//         setPassword('');
//         setShowResendConfirmation(true); // Show resend confirmation after signup (user needs to confirm email)
//         toast.success('Account created! Please check your email for verification before logging in.');
//       }
//     } catch (error: any) {
//       console.error('Auth submission error:', error); // Log the full error for debugging

//       if (error.message?.includes('Email not confirmed')) {
//         setShowResendConfirmation(true);
//         toast.info('Your email is not confirmed. Please check your inbox or resend the confirmation email.');
//       } else if (error.message?.includes('User already exists. Please sign in instead.')) {
//         toast.info('An account with this email already exists. Please login to your account.');
//         setIsLogin(true); // Switch to login form
//         setPassword(''); // Clear password for login
//         setShowResendConfirmation(false); // Hide resend if switching to login
//       } else {
//         // Generic error handled by useAuth toast, no additional toast here.
//       }
//     } finally {
//       setFormLoading(false); // Ensure local form loading is reset in all cases
//     }
//   };

//   const handleGoogleAuth = async () => {
//     setFormLoading(true); // Set local loading for Google auth
//     try {
//       await signInWithGoogle();
//       // On success, navigate to dashboard is handled by useAuth's onAuthStateChange
//     } catch (error: any) {
//       console.error('Google auth error:', error);
//       // Specific errors are handled by useAuth, so no additional toast needed here.
//     } finally {
//       setFormLoading(false); // Ensure local loading is reset
//     }
//   };

//   const handleResendConfirmation = async () => {
//     if (!email) {
//       toast.error('Please enter your email address to resend confirmation.');
//       return;
//     }
//     setFormLoading(true); // Set local loading for resend
//     try {
//       await resendConfirmation(email);
//     } catch (error) {
//       console.error('Resend confirmation error:', error);
//       // Error handled by useAuth toast
//     } finally {
//       setFormLoading(false); // Ensure local loading is reset
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md">
//           <div className="mb-8">
//             <Logo />
//           </div>
          
//           <Card className="p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold mb-2">
//                 {isLogin ? 'Login' : 'Create an account'}
//               </h1>
//               <p className="text-gray-600">
//                 {isLogin 
//                   ? 'Enter your email and password below to login'
//                   : 'Enter your email and password below to create your account'
//                 }
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Button
//                 type="button"
//                 onClick={handleGoogleAuth}
//                 variant="outline"
//                 className="w-full flex items-center justify-center space-x-2"
//                 disabled={isLoading} // Use combined isLoading
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 <span>
//                   {isLoading ? 'Loading...' : (isLogin ? 'Continue with Google' : 'Sign up with Google')}
//                 </span>
//               </Button>

//               {!isLogin && (
//                 <div className="text-center text-sm text-gray-500">
//                   By clicking 'Sign up with Google' I agree to the{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
//                   , acknowledge Mulaflow's{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
//                   , and consent to receive updates, special offers, and promotional emails. I understand that I can opt out at any time.
//                 </div>
//               )}

//               <div className="text-center text-sm text-gray-500">
//                 or continue with email
//               </div>

//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">First Name</label>
//                     <Input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       placeholder="John"
//                       required
//                       disabled={isLoading} // Use combined isLoading
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Last Name</label>
//                     <Input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Doe"
//                       required
//                       disabled={isLoading} // Use combined isLoading
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder={isLogin ? "name@example.com" : "Johndoe@gmail.com"}
//                   required
//                   disabled={isLoading} // Use combined isLoading
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••••••••"
//                   required
//                   disabled={isLoading} // Use combined isLoading
//                 />
//               </div>

//               {!isLogin && (
//                 <div className="flex items-start space-x-2">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={agreeToTerms}
//                     onChange={(e) => setAgreeToTerms(e.target.checked)}
//                     className="mt-1"
//                     disabled={isLoading} // Use combined isLoading
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-600">
//                     By clicking continue, you agree to our{' '}
//                     <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
//                     and{' '}
//                     <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
//                   </label>
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//                 disabled={isLoading} // Use combined isLoading
//               >
//                 {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign up')}
//               </Button>

//               {/* Email confirmation help */}
//               {showResendConfirmation && (
//                 <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                   <p className="text-sm text-yellow-800 mb-2">
//                     Haven't received the confirmation email?
//                   </p>
//                   <Button
//                     type="button"
//                     onClick={handleResendConfirmation}
//                     variant="outline"
//                     size="sm"
//                     disabled={isLoading} // Use combined isLoading
//                   >
//                     Resend Confirmation Email
//                   </Button>
//                 </div>
//               )}
//             </form>

//             {isLogin ? (
//               <div className="text-center mt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setShowResendConfirmation(false); // Hide if switching to signup
//                     setPassword(''); // Clear password when switching to signup
//                   }}
//                   className="text-blue-600 hover:underline text-sm"
//                   disabled={isLoading} // Use combined isLoading
//                 >
//                   Need an account? Sign up
//                 </button>
//               </div>
//             ) : (
//               <div className="text-center mt-4">
//                 <span className="text-sm text-gray-600">Already have an account? </span>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLogin(true);
//                     setShowResendConfirmation(false); // Hide if switching to login
//                     setPassword(''); // Clear password when switching to login
//                   }}
//                   className="text-blue-600 hover:underline text-sm"
//                   disabled={isLoading} // Use combined isLoading
//                 >
//                   Login here
//                 </button>
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>

//       {/* Right Side - Background */}
//       <div className="flex-1 hidden lg:block relative overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23191970;stop-opacity:1" /><stop offset="100%" style="stop-color:%23000080;stop-opacity:1" /></radialGradient></defs><rect width="100%" height="100%" fill="url(%23a)"/><g fill="%23FFD700" opacity="0.8"><circle r="2" cx="200" cy="200"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></circle><circle r="1" cx="800" cy="300"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle><circle r="1.5" cx="300" cy="700"><animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite"/></circle><circle r="1" cx="700" cy="800"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle><circle r="2" cx="100" cy="500"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></circle></g></svg>')`
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/60 to-purple-900/80" />
        
//         {/* Animated stars */}
//         <div className="absolute inset-0">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 3}s`
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Logo } from '@/components/ui/logo';
// import { useAuth } from '@/hooks/useAuth';
// import { toast } from 'sonner';
// import { supabase } from '@/lib/supabase'; // ✅ use shared client

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showResendConfirmation, setShowResendConfirmation] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const navigate = useNavigate();
//   const { signIn, signUp, signInWithGoogle, resendConfirmation, loading: authLoading } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     const completeMagicLinkFlow = async () => {
//       const url = window.location.href;
//       const token = new URLSearchParams(location.search).get('token');
//       if (!token) return;

//       try {
//         const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(url);
//         if (sessionError || !sessionData?.user) {
//           toast.error('Magic link login failed');
//           return;
//         }

//         const authUser = sessionData.user;

//         const { data: profile, error: profileError } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('auth_id', token)
//           .single();

//         if (profileError || !profile) {
//           toast.error('Invalid or expired invitation token');
//           return;
//         }

//         const { error: updateError } = await supabase
//           .from('profiles')
//           .update({
//             auth_id: authUser.id,
//             idata: {
//               ...profile.idata,
//               accepted_at: new Date().toISOString(),
//               status: 'accepted',
//             },
//           })
//           .eq('auth_id', token);

//         if (updateError) {
//           toast.error('Failed to update profile after invite');
//           return;
//         }

//         toast.success('Welcome! Your invite is now active.');
//         navigate('/dashboard');
//       } catch (error) {
//         console.error('Magic link error:', error);
//         toast.error('Something went wrong with your invite.');
//       }
//     };

//     completeMagicLinkFlow();
//   }, [location, navigate]);

//   const isLoading = authLoading || formLoading;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormLoading(true);

//     if (!email || !password || (!isLogin && (!firstName || !lastName))) {
//       toast.error('Please fill in all fields');
//       setFormLoading(false);
//       return;
//     }

//     if (!isLogin && !agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       setFormLoading(false);
//       return;
//     }

//     try {
//       if (isLogin) {
//         await signIn(email, password);
//         setShowResendConfirmation(false);
//       } else {
//         await signUp(email, password, firstName, lastName);
//         setIsLogin(true);
//         setPassword('');
//         setShowResendConfirmation(true);
//         toast.success('Account created! Please check your email to verify before logging in.');
//       }
//     } catch (error: any) {
//       console.error('Auth error:', error);

//       if (error.message?.includes('Email not confirmed')) {
//         setShowResendConfirmation(true);
//         toast.info('Email not confirmed. Check your inbox or resend confirmation.');
//       } else if (error.message?.includes('User already exists')) {
//         toast.info('An account already exists. Please log in.');
//         setIsLogin(true);
//         setPassword('');
//         setShowResendConfirmation(false);
//       } else {
//         toast.error(error.message || 'An error occurred');
//       }
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleGoogleAuth = async () => {
//     setFormLoading(true);
//     try {
//       await signInWithGoogle();
//     } catch (error: any) {
//       console.error('Google auth error:', error);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleResendConfirmation = async () => {
//     if (!email) {
//       toast.error('Enter your email to resend confirmation.');
//       return;
//     }

//     setFormLoading(true);
//     try {
//       await resendConfirmation(email);
//     } catch (error) {
//       console.error('Resend confirmation error:', error);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="flex-1 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md">
//           <div className="mb-8">
//             <Logo />
//           </div>

//           <Card className="p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold mb-2">
//                 {isLogin ? 'Login' : 'Create an account'}
//               </h1>
//               <p className="text-gray-600">
//                 {isLogin
//                   ? 'Enter your email and password below to login'
//                   : 'Enter your email and password below to create your account'}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Button
//                 type="button"
//                 onClick={handleGoogleAuth}
//                 variant="outline"
//                 className="w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Loading...' : isLogin ? 'Continue with Google' : 'Sign up with Google'}
//               </Button>

//               {!isLogin && (
//                 <div className="text-center text-sm text-gray-500">
//                   By signing up, you agree to our{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
//                 </div>
//               )}

//               <div className="text-center text-sm text-gray-500">or continue with email</div>

//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">First Name</label>
//                     <Input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       placeholder="John"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Last Name</label>
//                     <Input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Doe"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@example.com"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               {!isLogin && (
//                 <div className="flex items-start space-x-2">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={agreeToTerms}
//                     onChange={(e) => setAgreeToTerms(e.target.checked)}
//                     className="mt-1"
//                     disabled={isLoading}
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-600">
//                     I agree to the terms and privacy policy.
//                   </label>
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign up'}
//               </Button>

//               {showResendConfirmation && (
//                 <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                   <p className="text-sm text-yellow-800 mb-2">
//                     Haven't received the confirmation email?
//                   </p>
//                   <Button
//                     type="button"
//                     onClick={handleResendConfirmation}
//                     variant="outline"
//                     size="sm"
//                     disabled={isLoading}
//                   >
//                     Resend Confirmation Email
//                   </Button>
//                 </div>
//               )}
//             </form>

//             <div className="text-center mt-4">
//               {isLogin ? (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setShowResendConfirmation(false);
//                     setPassword('');
//                   }}
//                   className="text-blue-600 hover:underline text-sm"
//                   disabled={isLoading}
//                 >
//                   Need an account? Sign up
//                 </button>
//               ) : (
//                 <>
//                   <span className="text-sm text-gray-600">Already have an account? </span>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsLogin(true);
//                       setShowResendConfirmation(false);
//                       setPassword('');
//                     }}
//                     className="text-blue-600 hover:underline text-sm"
//                     disabled={isLoading}
//                   >
//                     Login here
//                   </button>
//                 </>
//               )}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Logo } from '@/components/ui/logo';
// import { useAuth } from '@/hooks/useAuth';
// import { toast } from 'sonner';
// import { supabase } from '@/lib/supabase';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showResendConfirmation, setShowResendConfirmation] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const navigate = useNavigate();
//   const { signIn, signUp, signInWithGoogle, resendConfirmation, loading: authLoading } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     const completeMagicLinkFlow = async () => {
//       const url = window.location.href;
//       const token = new URLSearchParams(location.search).get('token');
//       if (!token) return;

//       try {
//         const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(url);
//         if (sessionError || !sessionData?.user) {
//           toast.error('Magic link login failed');
//           return;
//         }

//         const authUser = sessionData.user;

//         const { data: profile, error: profileError } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('auth_id', token)
//           .single();

//         if (profileError || !profile) {
//           toast.error('Invalid or expired invitation token');
//           return;
//         }

//         const { error: updateError } = await supabase
//           .from('profiles')
//           .update({
//             auth_id: authUser.id,
//             idata: {
//               ...profile.idata,
//               accepted_at: new Date().toISOString(),
//               status: 'accepted',
//             },
//           })
//           .eq('auth_id', token);

//         if (updateError) {
//           toast.error('Failed to update profile after invite');
//           return;
//         }

//         toast.success('Welcome! Your invite is now active.');
//         navigate('/dashboard');
//       } catch (error) {
//         console.error('Magic link error:', error);
//         toast.error('Something went wrong with your invite.');
//       }
//     };

//     completeMagicLinkFlow();
//   }, [location, navigate]);

//   const isLoading = authLoading || formLoading;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormLoading(true);

//     if (!email || !password || (!isLogin && (!firstName || !lastName))) {
//       toast.error('Please fill in all fields');
//       setFormLoading(false);
//       return;
//     }

//     if (!isLogin && !agreeToTerms) {
//       toast.error('Please agree to the terms and conditions');
//       setFormLoading(false);
//       return;
//     }

//     try {
//       if (isLogin) {
//         await signIn(email, password);
//         setShowResendConfirmation(false);
//       } else {
//         await signUp(email, password, firstName, lastName);
//         setIsLogin(true);
//         setPassword('');
//         setShowResendConfirmation(true);
//         toast.success('Account created! Please check your email to verify before logging in.');
//       }
//     } catch (error: any) {
//       console.error('Auth error:', error);

//       if (error.message?.includes('Email not confirmed')) {
//         setShowResendConfirmation(true);
//         toast.info('Email not confirmed. Check your inbox or resend confirmation.');
//       } else if (error.message?.includes('User already exists')) {
//         toast.info('An account already exists. Please log in.');
//         setIsLogin(true);
//         setPassword('');
//         setShowResendConfirmation(false);
//       } else {
//         toast.error(error.message || 'An error occurred');
//       }
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleGoogleAuth = async () => {
//     setFormLoading(true);
//     try {
//       await signInWithGoogle();
//     } catch (error: any) {
//       console.error('Google auth error:', error);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleResendConfirmation = async () => {
//     if (!email) {
//       toast.error('Enter your email to resend confirmation.');
//       return;
//     }

//     setFormLoading(true);
//     try {
//       await resendConfirmation(email);
//     } catch (error) {
//       console.error('Resend confirmation error:', error);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="flex-1 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md">
//           <div className="mb-8">
//             <Logo />
//           </div>

//           <Card className="p-8">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold mb-2">
//                 {isLogin ? 'Login' : 'Create an account'}
//               </h1>
//               <p className="text-gray-600">
//                 {isLogin
//                   ? 'Enter your email and password below to login'
//                   : 'Enter your email and password below to create your account'}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Button
//                 type="button"
//                 onClick={handleGoogleAuth}
//                 variant="outline"
//                 className="w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Loading...' : isLogin ? 'Continue with Google' : 'Sign up with Google'}
//               </Button>

//               {!isLogin && (
//                 <div className="text-center text-sm text-gray-500">
//                   By signing up, you agree to our{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
//                   <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
//                 </div>
//               )}

//               <div className="text-center text-sm text-gray-500">or continue with email</div>

//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">First Name</label>
//                     <Input
//                       type="text"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       placeholder="John"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Last Name</label>
//                     <Input
//                       type="text"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       placeholder="Doe"
//                       required
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@example.com"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               {!isLogin && (
//                 <div className="flex items-start space-x-2">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={agreeToTerms}
//                     onChange={(e) => setAgreeToTerms(e.target.checked)}
//                     className="mt-1"
//                     disabled={isLoading}
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-600">
//                     I agree to the terms and privacy policy.
//                   </label>
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign up'}
//               </Button>

//               {showResendConfirmation && (
//                 <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                   <p className="text-sm text-yellow-800 mb-2">
//                     Haven't received the confirmation email?
//                   </p>
//                   <Button
//                     type="button"
//                     onClick={handleResendConfirmation}
//                     variant="outline"
//                     size="sm"
//                     disabled={isLoading}
//                   >
//                     Resend Confirmation Email
//                   </Button>
//                 </div>
//               )}
//             </form>

//             <div className="text-center mt-4">
//               {isLogin ? (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setShowResendConfirmation(false);
//                     setPassword('');
//                   }}
//                   className="text-blue-600 hover:underline text-sm"
//                   disabled={isLoading}
//                 >
//                   Need an account? Sign up
//                 </button>
//               ) : (
//                 <>
//                   <span className="text-sm text-gray-600">Already have an account? </span>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsLogin(true);
//                       setShowResendConfirmation(false);
//                       setPassword('');
//                     }}
//                     className="text-blue-600 hover:underline text-sm"
//                     disabled={isLoading}
//                   >
//                     Login here
//                   </button>
//                 </>
//               )}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;



// ✅ Auth.tsx - Handles login, signup, and invite link flow
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isInvitedFlow, setIsInvitedFlow] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlToken = new URLSearchParams(location.search).get('token');
    if (urlToken) {
      setToken(urlToken);
      setIsInvitedFlow(true);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isInvitedFlow && (!firstName || !lastName))) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          },
        },
      });

      if (error) throw error;

      if (isInvitedFlow && token && data.user) {
        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            auth_id: data.user.id,
            email: data.user.email,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            idata: {
              status: 'accepted',
              accepted_at: new Date().toISOString(),
            },
          })
          .eq('auth_id', token);

        if (profileUpdateError) {
          console.error('Profile update error:', profileUpdateError);
          toast.error('Failed to match invite');
          return;
        }
      }

      toast.success('Account created! Check your email.');
      navigate('/onboarding');
    } catch (err: any) {
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          <Card className="p-8">
            <h1 className="text-2xl font-bold mb-4">
              {isInvitedFlow ? 'Accept Invite' : 'Sign Up or Login'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {(!isInvitedFlow) && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              )}

              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : isInvitedFlow ? 'Accept Invite' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-500 text-center">
              You can also <strong>log in</strong> with Google:
              <Button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: { redirectTo: `${window.location.origin}/onboarding` },
                    });
                  } catch (err: any) {
                    toast.error(err.message);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-3 w-full"
              >
                Continue with Google
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
