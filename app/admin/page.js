'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, money } from '../../lib/supabase';
export default function Admin() {
  const router = useRouter(); const [ps, setPs] = useState([]); const [os, setOs] = useState([]);
  const load = async () => { setPs((await supabase.from('products').select('*').order('created_at', { ascending: false })).data || []);
    setOs((await supabase.from('orders').select('*').order('created_at', { ascending: false })).data || []); };
  useEffect(() => { supabase.auth.getSession().then(({ data }) => data.session ? load() : router.push('/admin/login')); }, []);
  async function del(p) { if (!confirm(`Delete "${p.name}"?`)) return; await supabase.from('products').delete().eq('id', p.id); load(); }
  async function verify(o) { await supabase.from('orders').update({ status: 'confirmed' }).eq('id', o.id); load(); }
  return (<><div style={{ display: 'flex', justifyContent: 'space-between' }}><h1>Admin Dashboard</h1>
    <button className="btn alt" onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }}>Logout</button></div>
    <h2>Products</h2><Link className="btn" href="/admin/product/new">+ Add Product</Link><br /><br />
    <div style={{ overflowX: 'auto' }}><table><thead><tr><th></th><th>Name</th><th>Price</th><th>Category</th><th></th></tr></thead><tbody>
      {ps.map(p => <tr key={p.id}><td><img src={p.image_url} alt="" /></td><td>{p.name}</td><td>{money(p.price)}</td><td>{p.category}</td>
        <td><Link className="btn alt" href={`/admin/product/${p.id}`}>Edit</Link> <button className="btn red" onClick={() => del(p)}>Delete</button></td></tr>)}</tbody></table></div>
    <h2>Orders</h2><div style={{ overflowX: 'auto' }}><table><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Proof</th><th></th></tr></thead><tbody>
      {os.map(o => <tr key={o.id}><td>{o.order_number}</td><td>{o.customer_name}<br /><small>{o.phone} · {o.email}<br />{o.address}</small></td><td>{money(o.total_amount)}</td><td>{o.status}</td>
        <td>{o.payment_proof ? <a href={o.payment_proof} target="_blank">View</a> : '-'}</td>
        <td>{o.status === 'awaiting_verification' && <button className="btn" onClick={() => verify(o)}>Confirm</button>}</td></tr>)}</tbody></table></div></>);
}
