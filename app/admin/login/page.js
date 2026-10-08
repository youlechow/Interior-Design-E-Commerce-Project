'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
export default function Login() {
  const router = useRouter(); const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState('');
  async function go(e) { e.preventDefault(); if (!email || !pw) return setErr('Email and password are required.');
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw }); if (error) setErr(error.message); else router.push('/admin'); }
  return (<form className="box" onSubmit={go}><h1>Admin Login</h1><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    <label>Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} /><p className="err">{err}</p><button className="btn" style={{ width: '100%' }}>Login</button></form>);
}
