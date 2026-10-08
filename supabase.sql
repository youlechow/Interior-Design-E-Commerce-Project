create table products(id uuid primary key default gen_random_uuid(),name text not null,description text,specs text,price numeric not null,category text not null,image_url text,created_at timestamptz default now());
create table orders(id uuid primary key default gen_random_uuid(),order_number text unique not null,customer_name text not null,phone text not null,email text not null,address text not null,total_amount numeric not null,payment_proof text,status text default 'pending_payment',created_at timestamptz default now());
create table order_items(id uuid primary key default gen_random_uuid(),order_id uuid references orders on delete cascade,product_id uuid references products on delete set null,quantity int not null,unit_price numeric not null,subtotal numeric not null);
alter table products enable row level security;alter table orders enable row level security;alter table order_items enable row level security;
create policy p_read on products for select using(true);
create policy p_admin on products for all to authenticated using(true) with check(true);
create policy o_ins on orders for insert to anon,authenticated with check(true);
create policy o_sel on orders for select to anon,authenticated using(true);
create policy o_upd on orders for update to anon,authenticated using(true);
create policy oi_ins on order_items for insert to anon,authenticated with check(true);
create policy oi_sel on order_items for select to authenticated using(true);
insert into storage.buckets(id,name,public) values('product-images','product-images',true),('payment-proofs','payment-proofs',true) on conflict do nothing;
create policy img_admin on storage.objects for all to authenticated using(bucket_id='product-images') with check(bucket_id='product-images');
create policy proof_ins on storage.objects for insert to anon,authenticated with check(bucket_id='payment-proofs');
insert into products(name,description,specs,price,category,image_url) values
('Modern Lounge Chair','Sculpted oak lounge chair with soft linen cushion.','Material: Oak, Linen\nSize: 80x75x82 cm',520,'Furniture','https://picsum.photos/seed/chair/800/600'),
('Scandinavian Dining Table','Six-seater dining table with a clean matte finish.','Material: Ash wood\nSize: 180x90x75 cm',1280,'Furniture','https://picsum.photos/seed/table/800/600'),
('Oak Coffee Table','Round coffee table with solid oak legs.','Material: Oak\nSize: 90x90x40 cm',380,'Furniture','https://picsum.photos/seed/coffee/800/600'),
('Minimal Pendant Light','Opal glass pendant for warm, soft lighting.','Material: Glass, Brass\nDiameter: 35 cm',160,'Lighting','https://picsum.photos/seed/pendant/800/600'),
('Modern Floor Lamp','Slim arc floor lamp with dimmable bulb.','Material: Steel\nHeight: 170 cm',240,'Lighting','https://picsum.photos/seed/lamp/800/600'),
('Wall Lamp','Adjustable wall sconce for bedside or hallway.','Material: Metal\nSize: 20x30 cm',95,'Lighting','https://picsum.photos/seed/wall/800/600'),
('Ceramic Vase','Hand-glazed ceramic vase in earthy tones.','Material: Ceramic\nHeight: 32 cm',68,'Decoration','https://picsum.photos/seed/vase/800/600'),
('Abstract Wall Art','Framed abstract canvas print.','Size: 80x60 cm\nFrame: Black oak',150,'Decoration','https://picsum.photos/seed/art/800/600'),
('Decorative Mirror','Arched mirror with a slim brass frame.','Material: Brass\nSize: 60x120 cm',210,'Decoration','https://picsum.photos/seed/mirror/800/600');
