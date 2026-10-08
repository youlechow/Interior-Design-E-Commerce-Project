'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, money } from '../../../lib/supabase';
import { useCart } from '../../../lib/cart';
export default function Detail() {
  const { id } = useParams(); const router = useRouter(); const { add } = useCart();
  const [p, setP] = useState(null); const [q, setQ] = useState(1); const [ok, setOk] = useState(false);
  useEffect(() => { supabase.from('products').select('*').eq('id', id).single().then(r => setP(r.data)); }, [id]);
  if (!p) return <p>Loading...</p>;
  return (<div className="detail"><img src={p.image_url} alt={p.name} /><div>
    <h1>{p.name}</h1><small>{p.category}</small><p className="price" style={{ fontSize: '1.5rem' }}>{money(p.price)}</p>
    <p>{p.description}</p><h4>Specifications</h4><p style={{ whiteSpace: 'pre-line' }}>{p.specs}</p>
    <div className="qty"><button onClick={() => setQ(Math.max(1, q - 1))}>−</button><b>{q}</b><button onClick={() => setQ(q + 1)}>+</button></div><br />
    <button className="btn" onClick={() => { add(p, q); setOk(true); }}>Add to Cart</button>{' '}
    {ok && <button className="btn alt" onClick={() => router.push('/cart')}>✓ Added — View Cart</button>}</div></div>);
}
