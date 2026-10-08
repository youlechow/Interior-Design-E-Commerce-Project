'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase, CATS } from '../lib/supabase';
import Card from '../components/Card';
export default function Home() {
  const [ps, setPs] = useState([]);
  useEffect(() => { supabase.from('products').select('*').order('created_at').limit(4).then(r => setPs(r.data || [])); }, []);
  return (<>
    <section className="hero"><h1>Transform Your Space</h1><p>Curated pieces designed to bring warmth and elegance to your home.</p><Link className="btn" href="/products">Explore Products</Link></section>
    <h2>Featured Products</h2><div className="grid">{ps.map(p => <Card key={p.id} p={p} />)}</div>
    <h2>Categories</h2><div className="cats">{CATS.map(c => <Link key={c} className="cat" href={`/products?cat=${c}`}>{c}</Link>)}</div>
    <h2 id="about">About Us</h2><p>Haven &amp; Co. is an interior design studio with over 10 years of experience. We source quality furniture, lighting and décor to help you create a space you love.</p>
  </>);
}
