/**
 * Planul calupului ca SVG: toate parcelele, cele de vânzare pline, în verdele
 * siglei. Se generează la build din aceleași date ca harta (src/pages/plan-calup.svg.ts)
 * și se încarcă pe pagină ca imagine, leneș, ca să nu îngreuneze HTML-ul.
 */
import { citesteCalup } from './date';

type Punct = [number, number];

/** Lățimea planului în unități SVG. La ~6 km de calup, o unitate are cam 3 m. */
const L = 2000;
const M = 16;

/** Ramer–Douglas–Peucker: scoate punctele care nu schimbă forma la scara asta. */
function simplifica(pts: Punct[], tol: number): Punct[] {
  if (pts.length <= 4) return pts;
  const [a, b] = [pts[0], pts.at(-1)!];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  let max = 0;
  let idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) [max, idx] = [d, i];
  }
  if (max <= tol) return [a, b];
  return [...simplifica(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplifica(pts.slice(idx), tol)];
}

export function planCalup() {
  const parcele = citesteCalup('calup4').features;
  const toate = parcele.flatMap((f) => f.geometry.coordinates.flat() as Punct[]);
  const lat0 = toate.reduce((s, p) => s + p[1], 0) / toate.length;
  const kx = Math.cos((lat0 * Math.PI) / 180);
  const xs = toate.map((p) => p[0] * kx);
  const ys = toate.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = L / (x1 - x0);
  const H = Math.round((y1 - y0) * s);

  const cale = (inele: Punct[][]) =>
    inele
      .map((inel) => {
        const pr = inel.map((p): Punct => [Math.round((p[0] * kx - x0) * s + M), Math.round((y1 - p[1]) * s + M)]);
        const unice = pr.filter((p, i) => i === 0 || p[0] !== pr[i - 1][0] || p[1] !== pr[i - 1][1]);
        // Inelul e închis (primul punct = ultimul). RDP pe o linie cu capetele
        // identice ar arunca tot, deci lucrăm pe inelul deschis; Z îl închide.
        const deschis = unice.length > 1 && unice[0].join() === unice.at(-1)!.join() ? unice.slice(0, -1) : unice;
        const simplu = simplifica(deschis, 0.8);
        return simplu.length > 2 ? `M${simplu.map((p) => p.join(' ')).join('L')}Z` : '';
      })
      .join('');

  const rest = parcele.filter((f) => !f.properties.vanzare).map((f) => cale(f.geometry.coordinates as Punct[][]));
  const vanzare = parcele.filter((f) => f.properties.vanzare).map((f) => cale(f.geometry.coordinates as Punct[][]));

  const latime = L + 2 * M;
  const inaltime = H + 2 * M;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${latime} ${inaltime}">` +
    `<path d="${rest.join('')}" fill="#eae5da" stroke="#bdb6a6" stroke-width="0.7" vector-effect="non-scaling-stroke"/>` +
    `<path d="${vanzare.join('')}" fill="#1d5440" stroke="#123047" stroke-width="0.7" vector-effect="non-scaling-stroke"/>` +
    `</svg>`;
  return { svg, latime, inaltime };
}
