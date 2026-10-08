'use client';
import { useEffect, useState } from 'react';
import { supabase, CATS } from '../../lib/supabase';
import Card from '../../components/Card';
export default function Products() {
  const [ps, setPs] = useState([]); const [q, setQ] = useState(''); const [cat, setCat] = useState('All'); const [load, setLoad] = useState(true);
  useEffect(() => { const c = new URLSearchParams(location.search).get('cat'); if (c) setCat(c);
    supabase.from('products').select('*').order('created_at').then(r => { setPs(r.data || []); setLoad(false); }); }, []);
  const list = ps.filter(p => (cat === 'All' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  return (<><h1>Products</h1>
    <div className="bar"><input placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} />
      {['All', ...CATS].map(c => <button key={c} className={'pill' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
    {load ? <p>Loading...</p> : list.length ? <div className="grid">{list.map(p => <Card key={p.id} p={p} />)}</div> : <p>No products found.</p>}</>);
}
