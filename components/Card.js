import Link from 'next/link';
import { money } from '../lib/supabase';
export default function Card({ p }) {
  return (<div className="card"><img src={p.image_url} alt={p.name} /><div className="cb"><h3>{p.name}</h3><small>{p.category}</small>
    <p className="price">{money(p.price)}</p><Link className="btn" href={`/products/${p.id}`}>View Details</Link></div></div>);
}
