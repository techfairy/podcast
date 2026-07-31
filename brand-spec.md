# Живой сигнал — brand spec

Источник: предоставленные тексты бренд-системы, референсы и фотографии студии.

```css
:root {
  --bg: oklch(18.4% 0.008 90);          /* Studio Black #11110F */
  --surface: oklch(95.7% 0.012 95);     /* Warm Paper #F3F0E8 */
  --fg: oklch(20.5% 0.009 90);          /* Ink #171714 */
  --muted: oklch(62.7% 0.008 90);       /* Muted Grey #96968F */
  --border: oklch(100% 0 0 / 0.14);     /* light rule on dark */
  --accent: oklch(94.5% 0.205 118);     /* Signal Lime #D7FF48 */
  --signal: oklch(68.5% 0.205 35);      /* Live Coral #FF684A */

  --font-display: 'Unbounded', 'Arial Narrow', system-ui, sans-serif;
  --font-body: 'Onest', 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace;
}
```

## Layout posture

- Alternating deep Studio Black and Warm Paper sections; dark carries the hero, portfolio, pricing and conversion moments.
- Onest handles navigation, body copy and most headings; Unbounded is a strictly limited signal for a word, price or oversized number.
- Use a 12-column composition inside a 1280px content width, with 40–64px desktop gutters and 20px mobile gutters.
- Use 20–24px radii, thin rules and contrast rather than heavy shadows or glass panels.
- Signal Lime is the sole primary CTA and active-state colour. Coral is only for brief recording/status metadata, never in the same button.
