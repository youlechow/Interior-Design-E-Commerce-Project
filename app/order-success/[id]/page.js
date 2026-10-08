'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase, money } from '../../../lib/supabase';
export default function Success() {
  const { id } = useParams(); const [o, setO] = useState(null);
  useEffect(() => { supabase.from('orders').select('*').eq('id', id).single().then(r => setO(r.data)); }, [id]);
  if (!o) return <p>Loading...</p>;
  return (<div className="box center"><h1>✅ Order Received</h1><p>Order ID: <b>{o.order_number}</b></p><p>Amount: <b>{money(o.total_amount)}</b></p>
    <p>Status: <b>{o.status === 'awaiting_verification' ? 'Awaiting Payment Verification' : 'Pending Payment'}</b></p>
    <p>We will email {o.email} once your payment is verified.</p><Link className="btn" href="/products">Continue Shopping</Link></div>);
}
