'use client';
import { createContext, useContext, useEffect, useState } from 'react';
const C = createContext();
export const useCart = () => useContext(C);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem('cart') || '[]')); } catch {} }, []);
  const save = i => { setItems(i); localStorage.setItem('cart', JSON.stringify(i)); };
  const add = (p, q) => { const f = items.find(x => x.id === p.id);
    save(f ? items.map(x => x.id === p.id ? { ...x, qty: x.qty + q } : x) : [...items, { id: p.id, name: p.name, price: p.price, image_url: p.image_url, qty: q }]); };
  const setQty = (id, q) => save(q < 1 ? items.filter(x => x.id !== id) : items.map(x => x.id === id ? { ...x, qty: q } : x));
  const remove = id => save(items.filter(x => x.id !== id));
  const clear = () => save([]);
  const total = items.reduce((s, x) => s + x.price * x.qty, 0);
  const count = items.reduce((s, x) => s + x.qty, 0);
  return <C.Provider value={{ items, add, setQty, remove, clear, total, count }}>{children}</C.Provider>;
}
