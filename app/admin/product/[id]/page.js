'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, CATS, upload } from '../../../../lib/supabase';
export default function ProductForm() {
  const { id } = useParams(); const router = useRouter(); const isNew = id === 'new';
  const [f, setF] = useState({ name: '', price: '', category: 'Furniture', description: '', specs: '', image_url: '' });
  const [file, setFile] = useState(null); const [prev, setPrev] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => { supabase.auth.getSession().then(async ({ data }) => { if (!data.session) return router.push('/admin/login');
    if (!isNew) { const r = await supabase.from('products').select('*').eq('id', id).single(); if (r.data) { setF(r.data); setPrev(r.data.image_url); } } }); }, []);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  function pick(fl) { if (!fl) return; if (!/image\/(jpeg|png)/.test(fl.type)) return setErr('Only JPG/PNG images are allowed.'); setErr(''); setFile(fl); setPrev(URL.createObjectURL(fl)); }
  async function save(e) { e.preventDefault();
    if (!f.name.trim() || !(Number(f.price) > 0) || !f.description?.trim()) return setErr('Name, price (> 0) and description are required.');
    if (!file && !f.image_url) return setErr('Please upload a product image.');
    setBusy(true);
    try { const image_url = file ? await upload('product-images', file) : f.image_url;
      const row = { name: f.name.trim(), price: Number(f.price), category: f.category, description: f.description, specs: f.specs, image_url };
      const { error } = isNew ? await supabase.from('products').insert(row) : await supabase.from('products').update(row).eq('id', id);
      if (error) throw error; router.push('/admin');
    } catch (x) { setErr(x.message); setBusy(false); } }
  return (<form className="box" onSubmit={save}><h1>{isNew ? 'Add Product' : 'Edit Product'}</h1>
    <label>Product Name</label><input value={f.name} onChange={set('name')} />
    <label>Price (SGD)</label><input type="number" min="0" value={f.price} onChange={set('price')} />
    <label>Category</label><select value={f.category} onChange={set('category')}>{CATS.map(c => <option key={c}>{c}</option>)}</select>
    <label>Description</label><textarea rows={3} value={f.description || ''} onChange={set('description')} />
    <label>Specifications (one per line)</label><textarea rows={3} value={f.specs || ''} onChange={set('specs')} />
    <label>Product Image</label>
    <div className="drop" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); pick(e.dataTransfer.files[0]); }} onClick={() => document.getElementById('fi').click()}>
      Drag &amp; drop an image or click to upload<br />{prev && <img src={prev} alt="preview" />}</div>
    <input id="fi" type="file" hidden accept="image/png,image/jpeg" onChange={e => pick(e.target.files[0])} />
    <p className="err">{err}</p><button className="btn" disabled={busy} style={{ width: '100%' }}>{busy ? 'Saving...' : 'Save Product'}</button></form>);
}
