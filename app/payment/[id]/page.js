'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, money, upload } from '../../../lib/supabase';
export default function Payment() {
  const { id } = useParams(); const router = useRouter();
  const [o, setO] = useState(null); const [file, setFile] = useState(null); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => { supabase.from('orders').select('*').eq('id', id).single().then(r => setO(r.data)); }, [id]);
  async function submit() {
    if (!file) return setErr('Please choose your payment screenshot.');
    if (!/image\/(jpeg|png)/.test(file.type)) return setErr('Only JPG or PNG allowed.');
    setBusy(true);
    try { const url = await upload('payment-proofs', file);
      const { error } = await supabase.from('orders').update({ payment_proof: url, status: 'awaiting_verification' }).eq('id', id);
      if (error) throw error; router.push('/order-success/' + id);
    } catch (x) { setErr(x.message); setBusy(false); }
  }
  if (!o) return <p>Loading...</p>;
  return (<div className="box center"><h1>Payment</h1><p>Order <b>{o.order_number}</b></p><p>Scan the QR code with your banking app.</p>
    <img className="qr" src="/netspay-qr.svg" alt="NETSPay QR" /><h2>Amount: {money(o.total_amount)}</h2>
    <p>Upload Payment Proof (JPG/PNG)</p><input type="file" accept="image/png,image/jpeg" onChange={e => setFile(e.target.files[0])} />
    <p className="err">{err}</p><button className="btn" disabled={busy} onClick={submit}>{busy ? 'Uploading...' : 'Submit Payment Proof'}</button></div>);
}
