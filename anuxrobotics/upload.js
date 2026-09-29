import { put } from '@vercel/blob';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const file = fs.readFileSync('./public/211375.mp4');
const blob = await put('211375.mp4', file, { access: 'public' });
console.log(blob.url);