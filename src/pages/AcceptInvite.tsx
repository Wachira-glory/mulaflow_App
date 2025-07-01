// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // or next/router if using Next.js
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_ANON_KEY!
// );

// export default function AcceptInvite() {
//   const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const completeInvite = async () => {
//       const url = window.location.href;
//       const token = new URLSearchParams(window.location.search).get('token');

//       if (!token) {
//         setStatus('error');
//         setMessage('Missing invitation token.');
//         return;
//       }

//       // 1. Finish magic link login
//       const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(url);

//       if (sessionError || !sessionData.user) {
//         setStatus('error');
//         setMessage('Failed to sign in with magic link.');
//         return;
//       }

//       const authUser = sessionData.user;

//       // 2. Match token in profiles table
//       const { data: profile, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', token)
//         .single();

//       if (profileError || !profile) {
//         setStatus('error');
//         setMessage('Invalid or expired invitation token.');
//         return;
//       }

//       // 3. Update profile: link auth_id and mark as accepted
//       const { error: updateError } = await supabase
//         .from('profiles')
//         .update({
//           auth_id: authUser.id,
//           idata: {
//             ...profile.idata,
//             status: 'accepted',
//             accepted_at: new Date().toISOString(),
//           },
//         })
//         .eq('id', token);

//       if (updateError) {
//         setStatus('error');
//         setMessage('Failed to update profile.');
//         return;
//       }

//       // 4. Success!
//       setStatus('success');
//       setMessage('Invite accepted. Redirecting...');

//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2000);
//     };

//     completeInvite();
//   }, []);

//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h2>Accepting Invite...</h2>
//       <p>{message}</p>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export default function AcceptInvite() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const completeInvite = async () => {
      const url = window.location.href;
      const token = new URLSearchParams(window.location.search).get('token');

      if (!token) {
        setStatus('error');
        setMessage('Missing invitation token.');
        return;
      }

      // 1. Complete magic link login
      const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(url);

      if (sessionError || !sessionData?.user) {
        console.error('Session error:', sessionError);
        setStatus('error');
        setMessage('Failed to sign in with magic link.');
        return;
      }

      const authUser = sessionData.user;

      // 2. Look up profile by invite token (which is stored as `profiles.id`)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', token)
        .single();

      if (profileError || !profile) {
        console.error('Profile lookup error:', profileError);
        setStatus('error');
        setMessage('Invalid or expired invitation token.');
        return;
      }

      // 3. Update the profile with auth_id and mark it as accepted
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          auth_id: authUser.id,
          idata: {
            ...profile.idata,
            status: 'accepted',
            accepted_at: new Date().toISOString(),
          },
        })
        .eq('id', token);

      if (updateError) {
        console.error('Profile update error:', updateError);
        setStatus('error');
        setMessage('Failed to update profile.');
        return;
      }

      // 4. Redirect to dashboard after short success message
      setStatus('success');
      setMessage('Invite accepted! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    };

    completeInvite();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Accepting Invite...</h2>
      <p>{message}</p>

      {status === 'loading' && <p>Please wait...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Something went wrong.</p>}
    </div>
  );
}

