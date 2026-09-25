# Project: Vishnu Velluva — Personal Website

## Who this is for
Vishnu Velluva — SEO specialist, AI automation expert and web developer based in Kerala. Visitors are small and medium business owners who want to be found on Google and want to stop doing repetitive work by hand.

## What this site must achieve
Two goals, in priority order:
1. PRIMARY — get the visitor to message me on WhatsApp
2. SECONDARY — get the visitor to follow me on LinkedIn
Every section must serve one of these two goals. If a section serves neither, don't build it.

## My real details — use these everywhere
- Name: Vishnu Velluva
- Location: Kerala, India
- WhatsApp: https://wa.me/918592947287?text=Hi%20Vishnu,%20I%20saw%20your%20website
  (always with the pre-filled message "Hi Vishnu, I saw your website")
- Email: vishnuvelluva10@gmail.com
- LinkedIn: https://www.linkedin.com/in/vishnu-velluva/
- Never use placeholder contact details. These are the real ones.

## Tech rules
- Plain HTML, CSS and JavaScript only. No React, no frameworks, no Tailwind CDN, no npm, no build step.
- Exactly three files: index.html, style.css, script.js. Never create extra files.
- Load 'Plus Jakarta Sans' and 'Inter' fonts from Google Fonts. No other external libraries.
- Comment the code clearly throughout. A complete beginner must be able to read it and understand what each block does.

## Design rules

### Canvas and surfaces
- Page canvas: warm off-white #F4F4F2, with a very subtle dotted grid pattern (1px dots, #E2E2DE, 24px spacing) sitting behind everything.
- Content sits on white (#FFFFFF) cards that float above that canvas.
- Two dark sections for contrast: background #111110 with white text.
- Max content width 1200px, centred, 24px side gutters.

### Colour
- Ink: #0F0F0F. Secondary text: #8A8A85.
- Primary accent gradient: linear-gradient(135deg, #FF5500, #FF9500). Used ONLY on the single most important button on the page.
- Highlight pill colour: #E9FF5B (lime) with #0F0F0F text — used for small badges and labels only, never large areas.
- Secondary buttons: solid #111110 with white text, or a 1px #E2E2DE outline with no fill.
- Never purple. Never blue. Never glassmorphism. Never dark mode for the whole page.

### Type
- Headings: 'Plus Jakarta Sans', weight 800, letter-spacing -0.03em, line-height 1.05.
- Body: 'Inter', weight 400, line-height 1.65, colour #8A8A85.
- Hero heading clamp(2.5rem, 6vw, 4.5rem). Section headings clamp(2rem, 4vw, 3rem).
- TWO-TONE HEADINGS: in every section heading, the first clause is #0F0F0F and the trailing clause is #8A8A85. This is the signature move of the whole design.
- Labels and badges: 0.75rem, uppercase, letter-spacing 0.08em.

### Shape and depth
- Cards: 24px radius, 1px #E8E8E4 border, shadow 0 1px 2px rgba(0,0,0,.04), 0 16px 40px -12px rgba(0,0,0,.10).
- Buttons: 12px radius, 14px vertical / 28px horizontal padding.
- Pills and badges: 999px radius, 6px / 14px padding.
- Images and media blocks: 20px radius.
- Floating micro-cards may overlap the edges of larger cards — this overlap is deliberate and gives the page depth.

### Rhythm
- Spacing scale in multiples of 8px only.
- Section vertical padding: 120px desktop, 72px mobile.
- Sections alternate between canvas background and white cards so the eye has a rhythm. Never three identical-looking sections in a row.

### Imagery — no photos needed
- I have no photography. Never use stock photos or external image URLs.
- For every visual block, generate abstract CSS gradient art instead: soft multi-stop radial gradients in warm oranges, ambers, limes and greys, with blur, inside a rounded container. Each one must look different from the others.
- Profile photo slot: a rounded square with a gradient fill and my initials "VV" in large type, which I can swap for a real photo later.

### Motion
- Everything under 400ms, ease-out.
- On hover: cards lift 4px, shadow deepens, accent elements shift slightly.
- Sections fade up 20px as they scroll into view.
- Respect prefers-reduced-motion and disable all of it when set.

### Non-negotiables
- Mobile-first. Everything works perfectly at 375px.
- Never use emojis anywhere in the UI.
- Semantic HTML: header, nav, main, section, footer.
- Every image or decorative block has proper alt text or aria-hidden.
- Tap targets at least 44px tall on mobile.
- External links carry rel="noopener"; LinkedIn links also carry rel="me".
- All animations subtle and under 400ms.
- Never build a form that pretends to send something. If there's no backend behind it, say so and use direct links instead.

## Backend rules
- There is no custom backend and no serverless function. The form talks directly to Supabase from the browser.
- Supabase table: "enquiries" (id, created_at, name, email, phone, service, message).
- Use the Supabase anon key in frontend code. It is public by design and protected by Row Level Security.
- The service_role key must NEVER appear anywhere in this project. Never read it, never print it, never suggest using it.
- Row Level Security is on. Anonymous visitors may INSERT only. There is no SELECT, UPDATE or DELETE policy, so enquiries can never be read from a browser.
- I read my enquiries by logging in to the Supabase dashboard. The website never reads them.
- Validate in the browser for a good experience, and rely on database CHECK constraints as the real limit.
- Never show a fake success. If the insert fails, the visitor must see a real error and be pointed to WhatsApp instead.

## How we work together
- Read this file before answering anything.
- If something in my request is unclear, ask me before writing code.
- When you finish, tell me exactly what to check in the browser.
