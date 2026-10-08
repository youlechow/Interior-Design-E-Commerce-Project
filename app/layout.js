import './globals.css';
import { CartProvider } from '../lib/cart';
import Nav from '../components/Nav';
export const metadata = { title: 'Haven & Co. Interior', description: 'Curated interior design products' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body><CartProvider><Nav /><main>{children}</main>
    <footer id="contact"><div><b>Haven &amp; Co. Interior</b><p>📍 1 Design Street, Singapore · ☎ +65 6000 0000 · ✉ hello@havenco.com</p>
    <p><a href="/admin/login">Admin</a></p></div></footer></CartProvider></body></html>);
}
