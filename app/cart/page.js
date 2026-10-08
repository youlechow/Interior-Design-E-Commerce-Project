'use client';
import Link from 'next/link';
import { useCart } from '../../lib/cart';
import { money } from '../../lib/supabase';
export default function Cart() {
  const { items, setQty, remove, total } = useCart();
  if (!items.length) return <div className="center"><h1>Your cart is empty</h1><Link className="btn" href="/products">Continue Shopping</Link></div>;
  return (<><h1>Shopping Cart</h1>
    {items.map(i => <div className="row" key={i.id}><img src={i.image_url} alt="" /><div className="g"><b>{i.name}</b><br />{money(i.price)}</div>
      <div className="qty"><button onClick={() => setQty(i.id, i.qty - 1)}>−</button><b>{i.qty}</b><button onClick={() => setQty(i.id, i.qty + 1)}>+</button></div>
      <b>{money(i.price * i.qty)}</b><button className="btn red" onClick={() => remove(i.id)}>Remove</button></div>)}
    <div className="tot">Grand Total: {money(total)}</div>
    <div style={{ textAlign: 'right' }}><Link className="btn alt" href="/products">Continue Shopping</Link>{' '}<Link className="btn" href="/checkout">Proceed to Checkout</Link></div></>);
}
