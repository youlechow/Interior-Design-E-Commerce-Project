'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, money } from '../../lib/supabase';
import { useCart } from '../../lib/cart';
export default function Checkout() {
  const { items, total, clear } = useCart(); const router = useRouter();
  const [f, setF] = useState({ name: '', phone: '', email: '', address: '' }); const [e, setE] = useState({}); const [busy, setBusy] = useState(false);
  const set = k => ev => setF({ ...f, [k]: ev.target.value });
  async function submit(ev) {
    ev.preventDefault(); const er = {};
    if (!f.name.trim()) er.name = 'Full name is required';
    if (!/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) er.phone = 'Valid phone number is required';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Valid email is required';
    if (!f.address.trim()) er.address = 'Delivery address is required';
    setE(er); if (Object.keys(er).length || !items.length) return;
    setBusy(true);
    const num = 'ORD' + Date.now().toString().slice(-6);
    const { data: o, error } = await supabase.from('orders').insert({ order_number: num, customer_name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), address: f.address.trim(), total_amount: total }).select().single();
    if (error) { alert('Could not place order: ' + error.message); setBusy(false); return; }
    await supabase.from('order_items').insert(items.map(i => ({ order_id: o.id, product_id: i.id, quantity: i.qty, unit_price: i.price, subtotal: i.price * i.qty })));
    clear(); router.push('/payment/' + o.id);
  }
  if (!items.length) return <p className="center">Your cart is empty.</p>;
  const F = (k, l, t) => <><label>{l}</label>{t ? <textarea rows={3} value={f[k]} onChange={set(k)} /> : <input value={f[k]} onChange={set(k)} />}<span className="err">{e[k]}</span></>;
  return (<form className="box" onSubmit={submit} noValidate><h1>Checkout</h1>
    {F('name', 'Full Name')}{F('phone', 'Phone Number')}{F('email', 'Email Address')}{F('address', 'Delivery Address', 1)}
    <div className="tot">Total: {money(total)}</div><button className="btn" disabled={busy} style={{ width: '100%' }}>{busy ? 'Placing...' : 'Place Order'}</button></form>);
}
