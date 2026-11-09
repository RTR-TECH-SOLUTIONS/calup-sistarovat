// Planul calupului, scris la build ca fișier static (vezi src/lib/plan.ts).
import type { APIRoute } from 'astro';
import { planCalup } from '../lib/plan';

export const GET: APIRoute = () =>
  new Response(planCalup().svg, { headers: { 'Content-Type': 'image/svg+xml' } });
