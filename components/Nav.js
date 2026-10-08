'use client';
import Link from 'next/link';
import { useCart } from '../lib/cart';
export default function Nav() {
  const { count } = useCart();
  return (<header className="nav"><Link href="/" className="logo">◆ Haven &amp; Co.</Link>
    <nav><Link href="/">Home</Link><Link href="/products">Products</Link><a href="/#about">About</a><a href="#contact">Contact</a>
    <Link href="/cart" className="cartlink">🛒 Cart ({count})</Link></nav></header>);
}
