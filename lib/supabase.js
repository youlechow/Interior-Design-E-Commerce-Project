import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const money = n => 'SGD ' + Number(n).toLocaleString();
export const CATS = ['Furniture', 'Lighting', 'Decoration'];
export async function upload(bucket, file) {
  const path = Date.now() + '-' + file.name.replace(/[^\w.]/g, '');
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
