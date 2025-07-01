// import { useState, useEffect, createContext, useContext } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// interface User {
//   id: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
// }

// interface AuthContextProps {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   resendConfirmation: (email: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps>({
//   user: null,
//   loading: true,
//   signIn: async () => {},
//   signUp: async () => {},
//   signInWithGoogle: async () => {},
//   signOut: async () => {},
//   resetPassword: async () => {},
//   resendConfirmation: async () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUser = async () => {
//       setLoading(true);
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
        
//         if (session) {
//           const { data: userData, error } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('id', session.user.id)
//             .single();
            
//           if (error && error.code !== 'PGRST116') {
//             console.error('Error fetching profile:', error);
//           }
          
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             firstName: userData?.first_name,
//             lastName: userData?.last_name,
//           });
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error('Error loading user:', error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     getUser();
    
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (event === 'SIGNED_IN' && session) {
//           const { data: userData, error } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('id', session.user.id)
//             .single();
            
//           if (error && error.code !== 'PGRST116') {
//             console.error('Error fetching user profile:', error);
//           }
          
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             firstName: userData?.first_name,
//             lastName: userData?.last_name,
//           });
//         } else if (event === 'SIGNED_OUT') {
//           setUser(null);
//         }
//       }
//     );
    
//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.signInWithPassword({ email, password });
      
//       if (error) {
//         if (error.message === 'Email not confirmed') {
//           toast.error('Please check your email and click the confirmation link before logging in.');
//           throw new Error('Please verify your email before logging in');
//         }
//         throw error;
//       }
      
//       navigate('/onboarding');
//       toast.success('Signed in successfully');
//     } catch (error: any) {
//       console.error('Auth error:', error);
//       if (error.message !== 'Please verify your email before logging in') {
//         toast.error(error.message || 'Error signing in');
//       }
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase.auth.signUp({ 
//         email, 
//         password,
//         options: {
//           data: {
//             first_name: firstName,
//             last_name: lastName,
//           }
//         }
//       });
      
//       if (error) throw error;
      
//       if (data.user) {
//         // Try to create profile entry, but don't fail if table doesn't exist
//         try {
//           const { error: profileError } = await supabase.from('profiles').upsert({
//             id: data.user.id,
//             first_name: firstName,
//             last_name: lastName,
//             email,
//           });
          
//           if (profileError) {
//             console.log('Profile table not found or error creating profile:', profileError);
//           }
//         } catch (profileError) {
//           console.log('Profile creation failed (table may not exist):', profileError);
//         }
        
//         toast.success('Account created successfully! Please check your email for verification before logging in.');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Error creating account');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/dashboard`
//         }
//       });
      
//       if (error) {
//         if (error.message.includes('provider is not enabled')) {
//           toast.error('Google sign-in is not configured. Please contact support or use email/password.');
//           throw new Error('Google authentication not available');
//         }
//         throw error;
//       }
//     } catch (error: any) {
//       console.error('Google auth error:', error);
//       if (error.message !== 'Google authentication not available') {
//         toast.error(error.message || 'Error signing in with Google');
//       }
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendConfirmation = async (email: string) => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.resend({
//         type: 'signup',
//         email: email,
//       });
      
//       if (error) throw error;
      
//       toast.success('Confirmation email sent! Please check your inbox.');
//     } catch (error: any) {
//       toast.error(error.message || 'Error sending confirmation email');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signOut = async () => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       navigate('/');
//       toast.success('Signed out successfully');
//     } catch (error: any) {
//       toast.error(error.message || 'Error signing out');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async (email: string) => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/reset-password`,
//       });
      
//       if (error) throw error;
      
//       toast.success('Password reset email sent');
//     } catch (error: any) {
//       toast.error(error.message || 'Error resetting password');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword, resendConfirmation }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);






// // hooks/useAuth.tsx (Revised for 'users' table)
// import { useState, useEffect, createContext, useContext } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// interface User {
//   id: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
// }

// interface AuthContextProps {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   resendConfirmation: (email: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps>({
//   user: null,
//   loading: false,
//   signIn: async () => {},
//   signUp: async () => {},
//   signInWithGoogle: async () => {},
//   signOut: async () => {},
//   resetPassword: async () => {},
//   resendConfirmation: async () => {},
// });
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false); // This is authLoading
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('AuthContext useEffect: Initializing auth listener');
//     const getUser = async () => {
//       console.log('getUser: Attempting to get session...');
//       try {
//         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
//         if (sessionError) {
//           console.error('getUser: Error getting session:', sessionError);
//         }

//         if (session) {
//           console.log('getUser: Session found, fetching user data for ID:', session.user.id);
//           const { data: userData, error: userError } = await supabase
//             .from('users') // Changed from 'profiles' to 'users'
//             .select('*')
//             .eq('id', session.user.id)
//             .single();
            
//           if (userError && userError.code !== 'PGRST116') { // PGRST116 means no rows found
//             console.error('getUser: Error fetching user data from "users" table:', userError);
//           } else if (userError?.code === 'PGRST116') {
//             console.log('getUser: No additional user data found for user:', session.user.id, ' (PGRST116)');
//           }
          
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             firstName: userData?.first_name, // Assuming 'first_name' column in your 'users' table
//             lastName: userData?.last_name,   // Assuming 'last_name' column in your 'users' table
//           });
//           console.log('getUser: User set:', { id: session.user.id, email: session.user.email });
//         } else {
//           setUser(null);
//           console.log('getUser: No active session found.');
//         }
//       } catch (error) {
//         console.error('getUser: Unexpected error during initial session check:', error); // More specific error log
//         setUser(null);
//       } 
//     };
    
//     getUser();
    
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log('onAuthStateChange Event:', event, 'Session:', session ? 'exists' : 'null');
//         console.log('onAuthStateChange: Current loading state at start:', loading); // Check loading state

//         if (event === 'SIGNED_IN' && session) {
//           console.log('onAuthStateChange: SIGNED_IN event. Session ID:', session.user.id);
//           console.log('onAuthStateChange: Attempting to fetch user data...'); // NEW LOG
//           let userData = null;
//           try {
//             const { data, error } = await supabase
//               .from('users')
//               .select('*')
//               .eq('id', session.user.id)
//               .single();
            
//             if (error && error.code !== 'PGRST116') {
//               console.error('onAuthStateChange: !!! ERROR FETCHING USER DATA FROM "users" TABLE !!!', error); // ADDED FOR DEBUGGING
//               // If user data doesn't exist, try to create it for Google sign-in
//               if (session.user.app_metadata.provider === 'google' && !data) {
//                  console.log('onAuthStateChange: Attempting to create user data for Google user:', session.user.email);
//                  const { data: userInsertData, error: userInsertError } = await supabase.from('users').upsert({
//                    id: session.user.id,
//                    email: session.user.email,
//                    first_name: session.user.user_metadata.full_name?.split(' ')[0] || null,
//                    last_name: session.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || null,
//                  }).select().single();

//                  if (userInsertError) {
//                    console.error('onAuthStateChange: Error creating user data after Google sign-in (onAuthStateChange):', userInsertError);
//                  } else {
//                    userData = userInsertData;
//                    toast.success('User data created for Google user.');
//                    console.log('onAuthStateChange: User data created/upserted:', userData); // NEW LOG
//                  }
//               }
//             } else {
//               userData = data;
//               console.log('onAuthStateChange: User data fetched successfully:', userData); // NEW LOG
//             }
//           } catch (userCatchError) {
//             console.error('onAuthStateChange: !!! UNEXPECTED CATCH ERROR DURING USER DATA FETCH/CREATE !!!', userCatchError); // ADDED FOR DEBUGGING
//           }
          
//           console.log('onAuthStateChange: Setting user state...'); // NEW LOG
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             firstName: userData?.first_name || session.user.user_metadata.full_name?.split(' ')[0] || '',
//             lastName: userData?.last_name || session.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '',
//           });
          
//           console.log('onAuthStateChange: User state updated. Attempting to set loading to false...'); // NEW LOG
//           setLoading(false); 
//           console.log('onAuthStateChange: Loading set to false. Attempting to navigate to /dashboard...'); // NEW LOG
//           navigate('/onboarding'); 
//           console.log('onAuthStateChange: Navigation call completed.'); // NEW LOG

//         } else if (event === 'SIGNED_OUT') {
//           console.log('onAuthStateChange: SIGNED_OUT event.');
//           setUser(null);
//           setLoading(false); 
//           console.log('onAuthStateChange: Navigating to /');
//           navigate('/'); 
//         } else if (event === 'INITIAL_SESSION') {
//           console.log('onAuthStateChange: INITIAL_SESSION event.');
//           setLoading(false); 
//         } else if (event === 'USER_UPDATED') {
//             console.log('onAuthStateChange: USER_UPDATED event.');
//             // Potentially re-fetch user data if needed, or update user state
//         }
//       }
//     );
    
//     return () => {
//       console.log('AuthContext useEffect: Cleaning up auth listener');
//       authListener.subscription.unsubscribe();
//     };
//   }, [navigate]); 

//   const signIn = async (email: string, password: string) => {
//     console.log('signIn function called for:', email);
//     setLoading(true); 
//     try {
//       const { error } = await supabase.auth.signInWithPassword({ email, password });
      
//       if (error) {
//         console.error('signIn: Supabase error:', error);
//         if (error.message === 'Email not confirmed') {
//           toast.error('Please check your email and click the confirmation link before logging in.');
//           throw new Error('Email not confirmed'); 
//         }
//         throw error;
//       }
//       console.log('signIn: Supabase signInWithPassword call successful.');
//     } catch (error: any) {
//       console.error('signIn: Caught error:', error);
//       if (error.message !== 'Email not confirmed') { 
//         toast.error(error.message || 'Error signing in');
//       }
//       setLoading(false); 
//       throw error; 
//     }
//   };

//   const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
//     console.log('signUp function called for:', email);
//     setLoading(true); 
//     try {
//       const { data, error } = await supabase.auth.signUp({ 
//         email, 
//         password,
//         options: {
//           data: {
//             first_name: firstName,
//             last_name: lastName,
//           }
//         }
//       });
      
//       if (error) {
//         console.error('signUp: Supabase error:', error);
//         if (error.message.includes('User already registered')) {
//           throw new Error('User already exists. Please sign in instead.');
//         }
//         throw error;
//       }
      
//       if (data.user) {
//         console.log('signUp: User created in Supabase Auth:', data.user.id);
//         const { error: userError } = await supabase.from('users').upsert({ // Changed from 'profiles' to 'users'
//           id: data.user.id,
//           first_name: firstName,
//           last_name: lastName,
//           email,
//         });
        
//         if (userError) {
//           console.error('signUp: Error creating user data in "users" table:', userError);
//           toast.error('Account created, but failed to save user data. Please contact support.');
//         } else {
//           console.log('signUp: User data created for user:', data.user.id);
//         }
//       }
//     } catch (error: any) {
//       console.error('signUp: Caught error:', error);
//       toast.error(error.message || 'Error creating account');
//       throw error; 
//     } finally {
//       setLoading(false); 
//     }
//   };

//   const signInWithGoogle = async () => {
//     console.log('signInWithGoogle function called.');
//     setLoading(true); 
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/dashboard`, 
//           queryParams: {
//             prompt: 'select_account'
//           }
//         }
//       });
      
//       if (error) {
//         console.error('signInWithGoogle: Supabase error:', error);
//         if (error.message.includes('provider is not enabled')) {
//           toast.error('Google sign-in is not configured. Please contact support or use email/password.');
//           throw new Error('Google authentication not available');
//         }
//         throw error;
//       }
//       console.log('signInWithGoogle: OAuth initiated successfully.');
//     } catch (error: any) {
//       console.error('signInWithGoogle: Caught error:', error);
//       if (error.message !== 'Google authentication not available') {
//         toast.error(error.message || 'Error signing in with Google');
//       }
//       setLoading(false); 
//       throw error;
//     }
//   };

//   const resendConfirmation = async (email: string) => {
//     console.log('resendConfirmation function called for:', email);
//     setLoading(true); 
//     try {
//       const { error } = await supabase.auth.resend({
//         type: 'signup',
//         email: email,
//       });
      
//       if (error) {
//         console.error('resendConfirmation: Supabase error:', error);
//         throw error;
//       }
      
//       toast.success('Confirmation email sent! Please check your inbox.');
//       console.log('resendConfirmation: Email sent successfully.');
//     } catch (error: any) {
//       console.error('resendConfirmation: Caught error:', error);
//       toast.error(error.message || 'Error sending confirmation email');
//       throw error;
//     } finally {
//       setLoading(false); 
//     }
//   };

//   const signOut = async () => {
//     console.log('signOut function called.');
//     setLoading(true); 
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         console.error('signOut: Supabase error:', error);
//         throw error;
//       }
//       console.log('signOut: Supabase signOut call successful.');
//     } catch (error: any) {
//       console.error('signOut: Caught error:', error);
//       toast.error(error.message || 'Error signing out');
//     }
//   };

//   const resetPassword = async (email: string) => {
//     console.log('resetPassword function called for:', email);
//     setLoading(true); 
//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/reset-password`,
//       });
      
//       if (error) {
//         console.error('resetPassword: Supabase error:', error);
//         throw error;
//       }
      
//       toast.success('Password reset email sent');
//       console.log('resetPassword: Email sent successfully.');
//     } catch (error: any) {
//       console.error('resetPassword: Caught error:', error);
//       toast.error(error.message || 'Error resetting password');
//       throw error;
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword, resendConfirmation }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext)



// import { useState, useEffect, createContext, useContext } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// interface User {
//   id: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
// }

// interface AuthContextProps {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
//   resetPassword: (email: string) => Promise<void>;
//   resendConfirmation: (email: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps>({
//   user: null,
//   loading: false,
//   signIn: async () => {},
//   signUp: async () => {},
//   signInWithGoogle: async () => {},
//   signOut: async () => {},
//   resetPassword: async () => {},
//   resendConfirmation: async () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
        
//         if (session) {
//           // Try to get profile data, but don't fail if table doesn't exist
//           let userData = null;
//           try {
//             const { data, error } = await supabase
//               .from('profiles')
//               .select('*')
//               .eq('auth_id', session.user.id)
//               .single();
              
//             if (error && error.code !== 'PGRST116') {
//               console.log('Profile table may not exist:', error);
//             } else {
//               userData = data;
//             }
//           } catch (profileError) {
//             console.log('Profile lookup failed (table may not exist):', profileError);
//           }
          
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             firstName: userData?.first_name || session.user.user_metadata?.first_name,
//             lastName: userData?.last_name || session.user.user_metadata?.last_name,
//           });
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error('Error loading user:', error);
//         setUser(null);
//       }
//     };
    
//     getUser();
    
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         console.log('Auth state changed:', event, session?.user?.email);
        
//         if (event === 'SIGNED_IN' && session) {
//           // Try to get profile data
//           let userData = null;
//           try {
//             const { data, error } = await supabase
//               .from('profiles')
//               .select('*')
//               .eq('auth_id', session.user.id)
//               .single();
              
//             if (!error) {
//               userData = data;
//             }
//           } catch (profileError) {
//             console.log('Profile lookup failed:', profileError);
//           }
          
//           setUser({
//             id: session.user.id,
//             email: session.user.email || '',
//             firstName: userData?.first_name || session.user.user_metadata?.first_name,
//             lastName: userData?.last_name || session.user.user_metadata?.last_name,
//           });
          
//           // Navigate to dashboard after successful login
//           navigate('/onboarding');
//           toast.success('Signed in successfully');
//         } else if (event === 'SIGNED_OUT') {
//           setUser(null);
//         }
//       }
//     );
    
//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, [navigate]);

//   const signIn = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       console.log('Attempting to sign in with:', email);
      
//       const { data, error } = await supabase.auth.signInWithPassword({ 
//         email: email.trim().toLowerCase(), 
//         password 
//       });
      
//       if (error) {
//         console.error('Sign in error:', error);
        
//         if (error.message.includes('Email not confirmed') || error.message.includes('email not confirmed')) {
//           toast.error('Please check your email and click the confirmation link before logging in.');
//           throw new Error('Please verify your email before logging in');
//         }
        
//         if (error.message.includes('Invalid login credentials')) {
//           toast.error('Invalid email or password. Please check your credentials.');
//           throw new Error('Invalid credentials');
//         }
        
//         throw error;
//       }
      
//       if (data.session) {
//         console.log('Sign in successful');
//         // Navigation will be handled by the auth state change listener
//       }
//     } catch (error: any) {
//       console.error('Auth error:', error);
//       if (!error.message.includes('verify your email') && !error.message.includes('Invalid credentials')) {
//         toast.error(error.message || 'Error signing in');
//       }
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
//     try {
//       setLoading(true);
//       console.log('Attempting to sign up with:', email);
      
//       const normalizedEmail = email.trim().toLowerCase();
      
//       const { data, error } = await supabase.auth.signUp({ 
//         email: normalizedEmail, 
//         password,
//         options: {
//           data: {
//             first_name: firstName.trim(),
//             last_name: lastName.trim(),
//           }
//         }
//       });
      
//       if (error) {
//         console.error('Sign up error:', error);
        
//         if (error.message.includes('User already registered')) {
//           toast.error('You already have an account with this email. Please sign in instead.');
//           throw new Error('Account already exists');
//         }
        
//         throw error;
//       }
      
//       if (data.user) {
//         console.log('Sign up successful for user:', data.user.id);
        
//         // Try to create profile entry
//         try {
//           const { error: profileError } = await supabase.from('profiles').upsert({
//             id: data.user.id,
//             first_name: firstName.trim(),
//             last_name: lastName.trim(),
//             email: normalizedEmail,
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString(),
//           });
          
//           if (profileError) {
//             console.log('Profile creation error (table may not exist):', profileError);
//           } else {
//             console.log('Profile created successfully');
//           }
//         } catch (profileError) {
//           console.log('Profile creation failed (table may not exist):', profileError);
//         }
        
//         toast.success('Account created successfully! Please check your email for verification before logging in.');
//       }
//     } catch (error: any) {
//       console.error('Sign up error:', error);
//       if (!error.message.includes('Account already exists')) {
//         toast.error(error.message || 'Error creating account');
//       }
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       setLoading(true);
//       console.log('Attempting Google OAuth');
      
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/onboarding`,
//           queryParams: {
//             prompt: 'select_account',
//             access_type: 'offline'
//           }
//         }
//       });
      
//       if (error) {
//         console.error('Google OAuth error:', error);
        
//         if (error.message.includes('provider is not enabled')) {
//           toast.error('Google sign-in is not configured. Please contact support or use email/password.');
//           throw new Error('Google authentication not available');
//         }
        
//         throw error;
//       }
      
//       console.log('Google OAuth initiated successfully');
//     } catch (error: any) {
//       console.error('Google auth error:', error);
//       if (!error.message.includes('Google authentication not available')) {
//         toast.error(error.message || 'Error signing in with Google');
//       }
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendConfirmation = async (email: string) => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.resend({
//         type: 'signup',
//         email: email.trim().toLowerCase(),
//       });
      
//       if (error) throw error;
      
//       toast.success('Confirmation email sent! Please check your inbox.');
//     } catch (error: any) {
//       toast.error(error.message || 'Error sending confirmation email');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signOut = async () => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       navigate('/');
//       toast.success('Signed out successfully');
//     } catch (error: any) {
//       toast.error(error.message || 'Error signing out');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async (email: string) => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
//         redirectTo: `${window.location.origin}/reset-password`,
//       });
      
//       if (error) throw error;
      
//       toast.success('Password reset email sent');
//     } catch (error: any) {
//       toast.error(error.message || 'Error resetting password');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword, resendConfirmation }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  resendConfirmation: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data: { session } } = await supabase.auth.getSession();

  //     if (session) {
  //       setUser({
  //         id: session.user.id,
  //         email: session.user.email || '',
  //         firstName: session.user.user_metadata?.first_name,
  //         lastName: session.user.user_metadata?.last_name,
  //       });
  //     } else {
  //       setUser(null);
  //     }
  //   };

  //   getUser();

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       if (event === 'SIGNED_IN' && session) {
  //         const authUser = session.user;

  //         // Check if profile exists
  //         const { data: existingProfile, error: fetchError } = await supabase
  //           .from('profiles')
  //           .select('*')
  //           .eq('auth_id', authUser.id)
  //           .single();

  //         if (fetchError && fetchError.code !== 'PGRST116') {
  //           console.warn('Error checking profile:', fetchError.message);
  //         }

  //         if (!existingProfile) {
  //           // Create or update profile
  //           const { error: upsertError } = await supabase
  //             .from('profiles')
  //             .upsert({
  //               auth_id: authUser.id,
  //               email: authUser.email,
  //               first_name: authUser.user_metadata?.first_name || '',
  //               last_name: authUser.user_metadata?.last_name || '',
  //               created_at: new Date().toISOString(),
  //               updated_at: new Date().toISOString(),
  //             }, { onConflict: 'auth_id' });

  //           if (upsertError) {
  //             console.error('Failed to create/update profile:', upsertError.message);
  //           }
  //         }

  //         setUser({
  //           id: authUser.id,
  //           email: authUser.email || '',
  //           firstName: authUser.user_metadata?.first_name,
  //           lastName: authUser.user_metadata?.last_name,
  //         });

  //         navigate('/onboarding');
  //         toast.success('Signed in successfully');
  //       }

  //       if (event === 'SIGNED_OUT') {
  //         setUser(null);
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, [navigate]);


  useEffect(() => {
  const getUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      const authUser = session.user;

      // Fetch profile from Supabase profiles table
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_id", authUser.id)
        .single();

      if (error) {
        console.error("Failed to load profile:", error.message);
      }

      setUser({
        id: authUser.id,
        email: profile?.email || authUser.email || "", // PRIORITY: profile.email
        firstName: profile?.first_name,
        lastName: profile?.last_name,
      });
    } else {
      setUser(null);
    }
  };

  getUser();

  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      if (session) {
        await getUser(); // Re-fetch profile on login
      } else {
        setUser(null);
      }
    }
  );

  return () => {
    authListener.subscription.unsubscribe();
  };
}, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Error signing in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

//   const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
//     setLoading(true);
//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email: email.trim().toLowerCase(),
//         password,
//         options: {
//           data: {
//             first_name: firstName,
//             last_name: lastName,
//           },
//         },
//       });

//       if (error) throw error;

//       if (data.user) {
//         // Insert invitation profile (if not already handled by your invite form)
//       const { error: profileError } = await supabase.from('profiles').upsert({
//   id: data.user.id,
//   auth_id: data.user.id,
//   name: `${firstName.trim()} ${lastName.trim()}`,
//   data: {},
//   idata: {},
// });


//         if (profileError) {
//           console.warn('Profile insert warning:', profileError.message);
//         }

//         toast.success('Account created! Please check your email for verification.');
//       }
//     } catch (err: any) {
//       toast.error(err.message || 'Error signing up');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    setLoading(true);

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          name: fullName,
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      const userId = data.user.id;

      // Check for invite token in URL
      const urlParams = new URLSearchParams(window.location.search);
      const inviteToken = urlParams.get('token');

      if (inviteToken) {
        // Update invited profile
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            auth_id: userId,
            email: data.user.email,
            first_name: firstName,
            last_name: lastName,
            idata: {
              status: 'accepted',
              accepted_at: new Date().toISOString(),
            },
            updated_at: new Date().toISOString(),
          })
          .eq('auth_id', inviteToken);

        if (updateError) {
          console.error('Failed to update invited profile:', updateError.message);
          toast.error('Failed to accept invitation');
        }
      } else {
        // Normal signup — insert a new profile
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              auth_id: userId,
              email: data.user.email,
              first_name: firstName,
              last_name: lastName,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              idata: {},
              data: {},
            }
          ]);

        if (insertError) {
          console.error('Failed to create profile:', insertError.message);
        }
      }
    }

    toast.success('Account created. Please check your email to confirm.');
  } catch (error: any) {
    toast.error(error.message || 'Signup failed');
    throw error;
  } finally {
    setLoading(false);
  }
};

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Google sign-in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
      toast.success('Signed out successfully');
    } catch (err: any) {
      toast.error(err.message || 'Error signing out');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent');
    } catch (err: any) {
      toast.error(err.message || 'Error resetting password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      });
      if (error) throw error;
      toast.success('Confirmation email sent');
    } catch (err: any) {
      toast.error(err.message || 'Error resending confirmation');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      resetPassword,
      resendConfirmation,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
