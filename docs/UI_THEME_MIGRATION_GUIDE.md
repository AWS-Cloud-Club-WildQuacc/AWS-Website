# WildQuacc UI Theme Migration Guide

**Status:** Implementation specification  
**Audience:** WildQuacc designers and React developers  
**Reference reviewed:** [AWS Student Builder Group - Alpha](https://aws-sbg-alpha.vercel.app/)  
**Reference review date:** July 22, 2026  
**Target application:** React 19, Vite 8, Tailwind CSS 4, React Router 7, and Lucide React

## 1. Purpose and design direction

This guide specifies how to evolve the WildQuacc website into a more cinematic, editorial, and distinctly AWS-themed experience. The result should feel related to the reference site without cloning its brand, mascot, copy, custom typeface, or exact compositions.

The redesign must preserve:

- The WildQuacc name, copy, social links, and club-specific identity.
- The existing `/`, `/about`, `/events`, and `/contact` routes.
- The current event filters, RSVP interactions, FAQ accordion, contact form validation, and responsive routing behavior.
- React 19, Vite, Tailwind CSS 4, React Router, and Lucide React.
- Fast loading, keyboard access, readable text, and reduced-motion support.

The redesign must not add Skillbuilder or Login routes just because they appear on the reference site.

### North-star experience

The first screen should feel like a student cloud community with ambition: dark, spacious, confident, and alive. After the hero, the page should transition into readable editorial sections that explain the club, show proof of activity, and lead visitors toward joining. Orange should function as a controlled signal rather than a background color applied everywhere.

Use the reference for visual principles, not for assets:

1. **Immersion:** a full-viewport hero with controlled ambient motion.
2. **Hierarchy:** very large headlines paired with small uppercase labels.
3. **Rhythm:** alternate dense dark moments with quiet light sections.
4. **Editorial structure:** numbered items, rules, offsets, and generous whitespace instead of grids of identical floating cards.
5. **Purposeful motion:** motion communicates page state, continuity, or interaction.
6. **Brand ownership:** WildQuacc imagery and language remain the memorable elements.

## 2. Audit summary

### 2.1 Reference-site patterns

The reference homepage uses the following sequence:

1. Fixed navigation with a logo, institutional subtitle, anchor links, secondary routes, and mobile menu.
2. Full-screen black hero with a centered logo, small eyebrow label, oversized mixed-style headline, supporting copy, two calls to action, and subdued footer metadata.
3. Blurred animated color field concentrated at the bottom of the hero.
4. Repeating horizontal marquee containing community topics separated by orange dots.
5. Light “Why join” section with four numbered benefits and editorial alignment.
6. Vision, mission, and values presentation with active-state navigation.
7. Upcoming-events preview and empty state.
8. Numbered core-team presentation.
9. Minimal contact call-to-action.
10. Testimonial slider.
11. Dark, multi-column footer with oversized low-contrast brand text.

The Events route carries the same shell, typography, palette, filter treatment, empty states, and footer. The Skillbuilder route extends the system with feature summaries and structured learning-track cards. These additional routes demonstrate system consistency, but their product features are out of scope for WildQuacc.

### 2.2 Reference visual language

| Area | Observed behavior | Principle to adapt |
| --- | --- | --- |
| Palette | Near-black canvas, AWS orange accents, white type, AWS navy, and quiet gray | Use contrast and orange sparingly |
| Typography | Oversized sans-serif combined with a distinctive display treatment | Use mixed open-source type styles, not the custom reference face |
| Navigation | Fixed, initially transparent over the hero, then gains an opaque/blurred surface | Make navigation respond to section contrast and scroll state |
| Hero | Centered identity, large statement, ambient canvas/color motion, restrained CTAs | Make WildQuacc’s identity the visual anchor |
| Sections | Large vertical spacing, thin rules, numbers, asymmetric layouts | Replace repeated generic cards with editorial compositions |
| Motion | Loader, scroll-progress line, marquee, reveals, sliders, and hover movement | Keep only motion that clarifies state or creates continuity |
| Mobile | Single-column hero, stacked CTAs, compact identity, hidden secondary metadata | Preserve impact without horizontal clipping or illegible type |
| Footer | Very dark surface, muted content, orange hover/focus accents | Close the experience with a calm branded region |

### 2.3 Current WildQuacc strengths

- A coherent AWS navy/orange palette already exists in `src/index.css`.
- `MainLayout`, `Navbar`, and `Footer` provide a reusable responsive shell.
- Home already contains a hero, metrics, benefits, event highlight, partnership message, FAQ, and join CTA.
- About already contains club identity and team content.
- Events already has upcoming/past filtering, RSVP feedback, event details, and newsletter UI.
- Contact already has validation, submission feedback, contact methods, hours, and social links.
- The production baseline builds successfully with `npm.cmd run build`.

### 2.4 Current gaps

| Gap | Current effect | Required response |
| --- | --- | --- |
| Repeated gradient page heroes | Every route feels like the same template | Give each route a related but distinct editorial hero |
| Card-heavy layouts | Information has equal visual weight | Use numbers, rules, alternating alignment, and fewer surfaces |
| Limited typographic contrast | Headlines feel functional instead of branded | Introduce a deliberate display/body type system |
| Placeholder “AW” mark | The shell lacks a credible WildQuacc focal point | Replace it with an approved WildQuacc logo asset |
| Broad orange gradients | Orange loses emphasis | Reserve orange for accents, active states, and primary actions |
| Scattered custom CSS classes | Components can drift visually | Centralize semantic tokens and primitives |
| Animation without reduced-motion policy | Some users may experience discomfort | Add a global motion preference strategy |
| Mojibake in source text | Some punctuation and emoji may render incorrectly | Normalize affected files to UTF-8 during implementation |

## 3. Design system specification

### 3.1 Color tokens

Use semantic names in components. Raw hex values should live only in the Tailwind `@theme` block and narrowly scoped visual-effect CSS.

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#08090A` | Immersive hero and darkest backgrounds |
| `canvas-soft` | `#111317` | Elevated dark sections and mobile menu |
| `aws-ink` | `#232F3E` | Main light-theme text and dark navy surfaces |
| `aws-orange` | `#FF9900` | Primary brand accent and focus indicator |
| `aws-orange-strong` | `#E68A00` | Pressed states and small text on white |
| `paper` | `#F7F8F8` | Primary light section background |
| `surface` | `#FFFFFF` | Forms and content surfaces |
| `warm-muted` | `#E8E3DC` | Dividers and warm neutral surfaces |
| `text-dark-muted` | `#667078` | Supporting text on light surfaces |
| `text-light` | `#F7F8F8` | Primary text on dark surfaces |
| `text-light-muted` | `rgba(247,248,248,.68)` | Supporting text on dark surfaces |
| `line-dark` | `rgba(255,255,255,.10)` | Dark-theme borders and rules |
| `line-light` | `rgba(35,47,62,.14)` | Light-theme borders and rules |
| `success` | `#15803D` | Confirmed RSVP and successful submission |
| `danger` | `#B42318` | Validation errors |

Rules:

- Normal body text must meet WCAG AA contrast: 4.5:1 for regular text and 3:1 for large text.
- Do not use `#FF9900` for small body text on white; use `aws-orange-strong` or `aws-ink`.
- Orange should generally occupy less than 15% of a viewport.
- Avoid large orange-to-orange gradients. The ambient hero effect may use orange, red, violet, and blue at low opacity over black.
- Light pages alternate between `paper` and `surface`; dark pages alternate between `canvas` and `aws-ink`.

Recommended Tailwind 4 theme declaration:

```css
@theme {
  --color-canvas: #08090a;
  --color-canvas-soft: #111317;
  --color-aws-ink: #232f3e;
  --color-aws-orange: #ff9900;
  --color-aws-orange-strong: #e68a00;
  --color-paper: #f7f8f8;
  --color-warm-muted: #e8e3dc;
  --color-text-dark-muted: #667078;
  --font-sans: "Inter Variable", Inter, system-ui, sans-serif;
  --font-accent: "Instrument Serif", Georgia, serif;
}
```

### 3.2 Typography

Use two open-source families:

- **Inter Variable:** navigation, UI, body copy, labels, data, and the bold sans-serif part of display headings.
- **Instrument Serif Italic:** one expressive phrase in major display headings. It replaces the *idea* of the reference’s custom display lettering without copying its face.

Self-host WOFF2 files under `public/fonts/` and preload only the Inter variable regular file and the Instrument Serif italic file. Use `font-display: swap`. Do not load fonts from a third-party domain at runtime.

| Style | Desktop | Mobile | Weight/line height |
| --- | --- | --- | --- |
| Hero display | `clamp(4.5rem, 9vw, 9rem)` | Included in clamp | 800–900 / `0.92` |
| Hero accent | `clamp(5rem, 11vw, 11rem)` | Included in clamp | 400 italic / `0.82` |
| Page title | `clamp(3rem, 7vw, 6rem)` | Included in clamp | 800 / `0.95` |
| Section title | `clamp(2.25rem, 4vw, 4.5rem)` | Included in clamp | 750–850 / `1.0` |
| Card/item title | `1.125–1.5rem` | `1.125–1.25rem` | 650–750 / `1.2` |
| Body large | `1.125rem` | `1rem` | 400 / `1.7` |
| Body | `1rem` | `0.9375rem` | 400 / `1.65` |
| Label | `0.6875–0.75rem` | Same | 600 / `1.2`, tracking `0.18em` |

Headline rules:

- Keep display headlines to two or three lines.
- Apply the serif accent to a short phrase, not an entire paragraph.
- Avoid all-caps body copy. Uppercase is reserved for short labels and metadata.
- Limit prose to 62–68 characters per line.
- Hero supporting copy must remain at least `16px` at narrow widths.

### 3.3 Layout, spacing, and grid

- Use a 4px base spacing unit.
- Main content maximum width: `1184px`.
- Wide visual maximum width: `1440px`.
- Reading maximum width: `680px`.
- Horizontal page padding: `20px` mobile, `32px` tablet, `48px` desktop.
- Standard section padding: `72px` mobile, `96px` tablet, `120px` desktop.
- Compact section padding: `48px` mobile, `64px` desktop.
- Major section gap: `48px` mobile, `72px` desktop.
- Component gap: `16px` mobile, `24px` desktop.
- Desktop editorial grid: 12 columns with 24px gutters.
- Tablet grid: 8 columns with 20px gutters.
- Mobile grid: 4 columns with 16px gutters.

Use whitespace and rules before adding a container. A section should not place every child in a rounded card.

### 3.4 Radius, borders, and shadows

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | `4px` | Compact controls and reference-like CTAs |
| `radius-md` | `12px` | Inputs, event surfaces, mobile menu |
| `radius-lg` | `24px` | Feature surface or CTA panel, used sparingly |
| `radius-pill` | `999px` | Labels, filters, and status badges |
| `shadow-soft` | `0 16px 50px rgba(8,9,10,.10)` | Floating light surfaces |
| `shadow-dark` | `0 24px 80px rgba(0,0,0,.28)` | Media over dark backgrounds |

- Default dividers are 1px semantic line colors.
- Never combine a heavy shadow, strong border, and large radius on the same component.
- Editorial content groups should prefer a top rule over a floating card.

### 3.5 Motion

Motion tokens:

```css
--duration-fast: 160ms;
--duration-base: 280ms;
--duration-slow: 600ms;
--ease-standard: cubic-bezier(.2,.8,.2,1);
--ease-enter: cubic-bezier(.16,1,.3,1);
```

Required motion:

- Navbar color/surface transition on scroll: 280ms.
- Link underline and button arrow response: 160–280ms.
- Section reveal: opacity `0 → 1` and translateY `20px → 0`, 600ms, once per element.
- FAQ and mobile menu: height/opacity transition, 280ms.
- Marquee: linear 32–40 seconds per loop, duplicated content track, no visible jump.
- Scroll-progress bar: scaleX driven by document progress without a React state update for every pixel.

Optional motion:

- Canvas-based hero field.
- Testimonial auto-advance.
- Horizontal team carousel.
- Page preloader.
- Elaborate scroll-linked parallax.

Baseline hero motion should be implemented with two or three absolutely positioned, blurred CSS gradient blobs. A canvas may replace it only after the CSS version is shipped and performance-tested.

Reduced-motion behavior:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
  .marquee-track { transform: none !important; }
}
```

When the marquee is frozen, show only one non-duplicated readable topic list. Never hide information solely because motion is disabled.

## 4. Component specifications

### 4.1 Shared shell

#### `SiteNavbar`

Replace the visual implementation of `Navbar` while retaining its routes and link behavior.

Desktop:

- Fixed at the viewport top; height 80px at `lg`, 64px below `lg`.
- Transparent on top of a dark hero with white text.
- After 24px of scroll, use `rgba(8,9,10,.86)`, `backdrop-filter: blur(16px)`, and a subtle bottom border.
- On light internal sections, use a near-opaque `paper` surface with `aws-ink` text. A `data-nav-theme` or section observer may drive this state.
- Left: approved WildQuacc logo, organization name, and optional institution subtitle.
- Right: Home, About, Events, Contact, then a separated “Join the Club” CTA.
- Keep social links in the footer and Contact page rather than crowding desktop navigation.
- Active route uses an orange 2px underline. Hover grows the underline from left to right.

Mobile:

- Logo remains at least 40px square with a short “AWSCC WildQuacc” label.
- Menu button has a 44px minimum target and an explicit accessible name.
- Opening the menu shows a full-height `canvas` overlay below the 64px bar.
- Links are 32–40px display text separated by thin rules; CTA appears last.
- Lock body scroll while open, move focus into the menu, close with Escape, and restore focus to the trigger.

#### `ScrollProgress`

- Fixed 3px bar at the top of the viewport above the navbar.
- `aws-orange` fill on a transparent track.
- Use `transform: scaleX()` with `transform-origin: left`.
- Hide when the page cannot scroll.
- Disable interpolation under reduced motion; progress may update immediately.

#### `SiteFooter`

- `canvas` background with 72px mobile and 96px desktop top padding.
- Oversized low-contrast `AWSCC WILDQUACC` wordmark above a gradient divider.
- Desktop grid: identity spans six columns, navigation three, contact three.
- Mobile: one column in identity → navigation → contact order.
- Social links use Lucide icons or monochrome approved icons in 40px circular controls.
- Hover and focus change border/text to orange without relying on scale alone.
- Keep dynamic year, real social URLs, and real email address.

### 4.2 Layout primitives

Create reusable presentational components rather than reproducing long class strings on every page:

| Component | Contract | Behavior |
| --- | --- | --- |
| `PageHero` | `eyebrow`, `title`, `accent`, `description`, `actions`, `align`, `compact` | Dark editorial hero; `compact` is used on internal routes |
| `Section` | `theme`, `eyebrow`, `title`, `description`, `children`, `className` | Owns semantic background, spacing, and content width |
| `SectionHeader` | `index`, `eyebrow`, `title`, `description`, `align` | Consistent label/title treatment and optional number |
| `Button` | `variant`, `size`, `to` or `href`, `icon`, `children` | Supports primary-light, primary-orange, outline-dark, outline-light, and text variants |
| `EditorialItem` | `index`, `title`, `description`, `icon`, `meta` | Rule-separated numbered content; stacks on mobile |
| `Reveal` | `delay`, `as`, `children` | IntersectionObserver reveal with reduced-motion bypass |
| `Marquee` | `items`, `duration`, `ariaLabel` | Decorative repeated track plus accessible static text |
| `StatusBadge` | `tone`, `children` | Upcoming, past, confirmed, or neutral status |
| `EmptyState` | `icon`, `title`, `description`, `action` | Consistent non-error empty content state |

Implementation notes:

- `Button` must render `Link`, `a`, or `button` according to the provided navigation/action props.
- Do not nest interactive elements.
- `Reveal` should observe once, disconnect after entry, and render visible immediately during server/static rendering or reduced motion.
- All components accept `className` only for layout adjustment, not arbitrary restyling of their visual contract.

### 4.3 Controls and states

#### Buttons

- Minimum height: 44px; minimum horizontal padding: 20px.
- Primary light: white background, canvas text, used on the dark hero.
- Primary orange: orange background, canvas text, used sparingly on light sections.
- Outline dark: transparent with `line-dark`, white text.
- Outline light: transparent with `line-light`, ink text.
- Hover: translateY `-1px`, strengthen border/background, arrow moves 3px.
- Active: return to translateY `0`.
- Disabled: `opacity: .5`, no transform, `cursor: not-allowed`.
- Focus: 2px orange outline with a 3px offset.

#### Forms

- Inputs use 48px minimum height, 12px radius, white or transparent themed background, and persistent visible labels.
- Placeholder text cannot substitute for a label.
- Focus border is orange with a 3px low-opacity orange ring.
- Error state uses `danger`, an icon, and text connected through `aria-describedby`.
- Submission state uses `aria-live="polite"`; the submit button exposes busy state with `aria-busy`.
- Preserve current client-side validation and simulated submission until a real endpoint is defined.

#### Tabs and filters

- Use a semantic tab list only when panels switch in place; otherwise regular buttons are acceptable.
- Active state combines dark fill, text contrast, and an indicator—not color alone.
- The Events upcoming/past control remains sticky only if it does not cover focused content.
- Controls must wrap or horizontally scroll at 320px without clipping.

#### Cards

Use cards only for independently actionable content such as an event or contact method. Benefits, values, and team metadata should use editorial rows or columns with rules.

Card baseline:

- 1px border, 12–24px radius, no shadow at rest.
- Hover: border becomes orange at 35% opacity and content/media moves no more than 4px.
- Focus-within must match hover emphasis.
- Entire-card links require a descriptive accessible name and must not contain competing nested links.

## 5. Page migration maps

### 5.1 Home (`/`)

#### Section order

1. Cinematic hero.
2. Topic marquee.
3. “Why WildQuacc” numbered benefits.
4. Community metrics strip.
5. Featured next event.
6. Partnership editorial block.
7. FAQ.
8. Final join CTA.

#### Hero

Desktop:

- Minimum height: `100svh`; content centered within the safe space below the navbar.
- Approved WildQuacc logo: 88–104px.
- Eyebrow: `AWS Cloud Club — WildQuacc`.
- Headline structure: bold sans-serif “Build the Cloud” plus serif italic orange “Together”. Existing copy may be retained if preferred, but keep the two-style composition.
- Supporting copy remains the current WildQuacc proposition.
- Primary action links to `/contact`; secondary action scrolls to the benefits section.
- Ambient blurred field sits behind the lower 35% of content, never behind small eyebrow text.
- Bottom metadata shows school/organization, current membership year, and “Scroll”.

Mobile:

- Minimum height: `100svh`; padding top accounts for the 64px navbar and safe-area inset.
- Logo: 72–80px.
- Headline clamp must fit 320px without horizontal overflow.
- CTAs stack full-width up to 320px.
- Hide left/right bottom metadata; retain centered membership year.
- Reduce blur strength and number of gradient layers.

#### Marquee

- Use existing club topics such as `AWS`, `Cloud Computing`, `Build & Learn`, `Certifications`, `Community`, `Workshops`, and `WildQuacc`.
- Dark background, white uppercase text, 12px orange separators.
- Treat the animated duplicate as `aria-hidden`; provide one screen-reader-readable label.

#### Benefits and metrics

- Convert the current three feature cards to three rule-separated numbered columns: `01`, `02`, `03`.
- Keep existing benefit copy and Lucide icons only as small supporting marks.
- Place metrics in a dark strip below benefits. Keep count-up behavior but show final values immediately for reduced motion and non-JavaScript fallback.

#### Featured event

- Use a 5/7 desktop split: date/category rail on the left, event information and action on the right.
- Retain title, schedule, venue, description, and link.
- On mobile, date appears above content; metadata wraps in a single column.
- When no event exists, render `EmptyState` instead of leaving a blank section.

#### Partnership, FAQ, and final CTA

- Partnership becomes an `aws-ink` section with a large statement, short body, and one outline-light contact action.
- FAQ uses border-top rows rather than separate rounded boxes. The whole header is the toggle, includes `aria-expanded`, and has a 44px target.
- Final CTA uses `paper` or orange-accented dark treatment, not a full-width orange gradient. Use one primary and one text link at most.

### 5.2 About (`/about`)

#### Section order

1. Compact dark page hero.
2. Club story.
3. Vision, mission, and values.
4. Core team directory.
5. Volunteers and contributors.
6. Join CTA.

#### Page hero and story

- Compact hero height: 60–70svh desktop, auto with at least 520px mobile.
- Large `About WildQuacc` title with a short orange serif accent.
- Story uses a 4/8 desktop split: sticky section number/label on the left and readable copy on the right.
- Preserve existing WildQuacc history and identity copy.
- Mobile removes sticky positioning and stacks label above copy.

#### Vision, mission, and values

- Use three selectable headings on desktop with one expanded content panel; clicking or keyboard selection changes the panel.
- Implement correct tabs semantics: `role="tablist"`, arrow-key navigation, `aria-selected`, and associated tab panels.
- On mobile, render the same content as an accordion so all text remains easy to scan.
- Do not auto-rotate this content.

#### Team and contributors

- Team data remains authoritative and data-driven.
- Desktop core-team layout uses numbered rows or a two-column staggered directory, not uniform floating cards.
- Each member shows number, name, role, and optional image. Images use a fixed aspect ratio and `object-fit: cover`.
- Do not invent profile links or biographies.
- Contributors use a denser list with role/category tags; images are optional.
- Mobile is a single ordered list with 24px row gaps and visible dividers.

### 5.3 Events (`/events`)

#### Section order

1. Compact dark page hero.
2. Upcoming/past control.
3. Selected event collection or empty state.
4. Newsletter CTA.

#### Hero and filters

- Title: `Events`; eyebrow: `Learn, build, connect`.
- Include a subdued current event count, never a fake statistic.
- Place filter controls directly after the hero on a `paper` surface.
- Keep existing upcoming/past state and item counts.
- Desktop controls align left within the container; mobile controls use equal widths.

#### Upcoming events

- Use a two-column editorial list at desktop and one column below 768px.
- Event surface includes category/status, date, title, time, location, description, and RSVP action.
- Date must use a semantic `<time dateTime="…">`.
- RSVP confirmation retains the current local interaction, changes button label and tone, and announces the change through an `aria-live` region.
- Do not imply that a local RSVP is persisted unless backend persistence is added later.

#### Past events

- Keep the existing expandable highlights.
- Use a compact rule-separated archive rather than large cards.
- Toggle must expose `aria-expanded` and control a stable panel ID.
- Event images may be added only when approved, consistently cropped assets exist.

#### Empty state and newsletter

- Empty state includes a calendar icon, clear title, explanatory copy, and social/contact action.
- Newsletter panel uses `aws-ink`, a visible email label, and an inline submit layout on desktop.
- On mobile, input and button stack and span the available width.
- Until newsletter submission is wired, label the action as a prototype in development or omit submission success claims.

### 5.4 Contact (`/contact`)

#### Section order

1. Compact dark page hero.
2. Contact form and contact-details split.
3. Social/community CTA.

#### Main composition

- Desktop uses a 7/5 split: light form surface on the left, dark contact panel on the right.
- Both sides visually align and share the same outer radius only at `lg` and above.
- Form fields preserve all current labels, validation rules, subject options, character count, loading state, and success state.
- Contact panel preserves real email, office hours, Facebook, and LinkedIn details.
- Mobile stacks the form before the contact panel with independent 12px radii.

#### Form and success behavior

- Put first and email fields in two columns only at `sm` and above.
- Move focus to the success heading after submission.
- Success state retains a route back to the form through “Send another message”.
- Do not clear user input before a successful response.
- The current simulated delay remains acceptable for the visual migration, but the guide must not describe it as a real message delivery.

#### Social treatment

- Use one consistent icon set. Prefer Lucide for social/control icons when available; otherwise use approved monochrome SVG assets.
- Avoid raster brand icons of visibly different dimensions.
- External links include clear accessible labels and open in a new tab only where useful.

## 6. Data and component contracts

The project remains JavaScript. The following shapes are documentation contracts and may be expressed as JSDoc typedefs or validated through PropTypes; TypeScript migration is not required.

```js
/** @typedef {{
 *  label: string,
 *  to?: string,
 *  href?: string,
 *  variant?: 'primary-light'|'primary-orange'|'outline-dark'|'outline-light'|'text'
 * }} Action */

/** @typedef {{
 *  eyebrow?: string,
 *  title: string,
 *  accent?: string,
 *  description?: string,
 *  actions?: Action[],
 *  align?: 'left'|'center',
 *  compact?: boolean
 * }} PageHeroProps */

/** @typedef {{
 *  id: string,
 *  title: string,
 *  description: string,
 *  icon?: import('lucide-react').LucideIcon
 * }} Benefit */

/** @typedef {{
 *  id: string,
 *  title: string,
 *  category: string,
 *  status: 'upcoming'|'past',
 *  start: string,
 *  end?: string,
 *  location: string,
 *  description: string,
 *  highlights?: string[]
 * }} ClubEvent */

/** @typedef {{
 *  id: string,
 *  name: string,
 *  role: string,
 *  image?: string,
 *  group: 'core'|'volunteer'|'contributor'
 * }} TeamMember */

/** @typedef {{
 *  question: string,
 *  answer: string
 * }} FAQ */
```

Contract rules:

- IDs are stable and unique within each collection.
- Event `start` and `end` values use ISO 8601 strings; display formatting uses `Intl.DateTimeFormat` with the intended Philippine locale/time zone.
- Decorative images use an empty `alt`; meaningful team/logo images use concise descriptive alternatives.
- Missing optional images must result in a deliberate monogram or neutral visual, never a broken image.
- Content arrays should move into `src/data/` when extracted from page files; no CMS or backend is required for this migration.

## 7. Recommended code organization

```text
src/
  components/
    layout/        SiteNavbar, SiteFooter, ScrollProgress, MobileMenu
    ui/            Button, Section, SectionHeader, Reveal, StatusBadge
    content/       PageHero, EditorialItem, Marquee, EmptyState
    events/        EventCard, EventArchiveItem, EventFilters
    forms/         Field, SelectField, TextareaField
  data/            benefits, events, faqs, team, navigation
  hooks/           useReducedMotion, useScrollProgress, useSectionTheme
  pages/           Home, About, Events, Contact
  styles/          optional effect-specific CSS modules only
```

This is a target organization, not a requirement to move every file at once. Preserve working imports and split components only when their first shared consumer is introduced.

Keep global responsibilities in `src/index.css`:

1. Tailwind import and `@theme` tokens.
2. Font-face declarations.
3. Base document typography and focus behavior.
4. Global reduced-motion rules.
5. Shared keyframes and tiny named utilities.

Do not put page-specific layout rules in `index.css`. Prefer Tailwind utilities or a local component stylesheet for the ambient hero effect.

## 8. Feature priority and rollout

### 8.1 Priority matrix

| Feature | Priority | Impact | Effort | Dependency | Delivery decision |
| --- | --- | --- | --- | --- | --- |
| Semantic design tokens and fonts | P0 | High | Medium | Approved font files | Required first |
| Approved WildQuacc logo | P0 | High | Low–Medium | Club-provided asset | Blocks final brand polish |
| Shared Button/Section/PageHero primitives | P0 | High | Medium | Tokens | Required |
| Adaptive navbar and mobile overlay | P0 | High | Medium | Logo, Button | Required |
| Accessible focus/reduced-motion foundation | P0 | High | Low | Tokens | Required |
| Home cinematic hero with CSS ambient field | P0 | High | Medium | PageHero, logo | Required |
| Editorial benefits and page section redesign | P1 | High | Medium | Section primitives | Required |
| Events and Contact migration | P1 | High | Medium | Controls/forms | Required |
| About tabs/mobile accordion and team directory | P1 | Medium–High | Medium | Team data cleanup | Required |
| Marquee and scroll progress | P1 | Medium | Low–Medium | Reduced motion | Required signature features |
| Reveal animations | P1 | Medium | Low | `Reveal` hook/component | Required but subtle |
| Testimonial slider | P2 | Medium | Medium | Approved testimonials | Optional |
| Canvas hero effect | P2 | Medium | High | CSS baseline and perf budget | Optional enhancement |
| Page preloader | P3 | Low | Medium | Final performance profiling | Omit by default |
| Scroll parallax/horizontal team carousel | P3 | Low–Medium | High | Interaction testing | Omit by default |

### 8.2 Delivery phases

#### Phase 0 — Content and asset readiness

- Obtain approved WildQuacc logo in SVG or transparent PNG, plus favicon variants.
- Confirm organization name, institution subtitle, email, address, office hours, and social URLs.
- Confirm team names/roles and whether every member has an approved image.
- Normalize source files to UTF-8 and fix visible mojibake.
- Capture baseline desktop/mobile screenshots for all routes.

Exit criterion: no placeholder identity or knowingly incorrect public contact detail remains in the implementation backlog.

#### Phase 1 — Foundation and shared shell

- Add font assets, semantic tokens, focus styles, and reduced-motion rules.
- Build shared primitives and the CSS ambient hero background.
- Replace Navbar/Footer visuals, add mobile focus management, and add scroll progress.
- Keep all current routes operational.

Exit criterion: shared shell works at 320, 390, 768, 1024, and 1440px and is keyboard accessible.

#### Phase 2 — Home

- Implement hero, marquee, editorial benefits, metrics, featured event, partnership, FAQ, and final CTA.
- Preserve existing content and interactions.
- Test hero performance before adding further motion.

Exit criterion: Home meets visual, responsive, accessibility, and motion acceptance criteria.

#### Phase 3 — Internal pages

- Migrate About, then Events, then Contact using established primitives.
- Extract repeated data only as each page is migrated.
- Preserve filter, RSVP, accordion, validation, and success interactions.

Exit criterion: all four routes share one coherent system with no regression in existing functions.

#### Phase 4 — Polish and optional enhancements

- Add approved testimonial content if available.
- Consider canvas ambient rendering only if it materially improves the hero.
- Profile, tune, and remove any motion that causes jank or delays interactivity.
- Do not add a preloader unless real loading behavior requires one.

Exit criterion: optional work stays within performance budgets and has a reduced-motion alternative.

## 9. Asset checklist

Required:

- Approved WildQuacc primary logo, preferably SVG.
- Compact logo/mark for mobile navigation and favicon.
- Inter Variable WOFF2 files with license notice.
- Instrument Serif Italic WOFF2 file with license notice.
- Verified team photographs or an approved no-photo fallback.
- Verified social URLs and contact information.

Optional:

- One consistent featured-event image style.
- Approved member testimonial portraits and text.
- A subtle cloud/grid texture owned by WildQuacc.

Do not copy:

- The reference mascot or its logo.
- The reference custom display lettering.
- Reference team photographs, testimonials, copy, or institutional marks.
- Generated gradient screenshots; recreate ambient color through CSS or canvas.

Asset performance rules:

- Prefer SVG for logos/icons and AVIF/WebP for photographs.
- Set explicit image dimensions or aspect ratios to prevent layout shifts.
- Lazy-load below-the-fold images; do not lazy-load the hero logo.
- Keep the initial hero visual payload under 300KB excluding fonts.
- Keep each non-critical photograph below 180KB where visual quality permits.

## 10. Acceptance criteria

### 10.1 Route and content coverage

- [ ] Shared navbar, mobile menu, scroll progress, and footer are specified and implemented consistently.
- [ ] Home contains hero, marquee, benefits, metrics, event, partnership, FAQ, and CTA.
- [ ] About contains story, identity, core team, contributors, and CTA.
- [ ] Events contains filters, upcoming/past states, event interaction, empty state, and newsletter panel.
- [ ] Contact contains form, validation, success state, contact details, hours, and social links.
- [ ] `/`, `/about`, `/events`, and `/contact` load directly and through client-side navigation.
- [ ] No Skillbuilder or Login route is introduced by this visual migration.

### 10.2 Responsive behavior

Test at 320×568, 390×844, 768×1024, 1024×768, and 1440×900, plus content-driven resizing between those widths.

- [ ] No horizontal page scrollbar exists at any test size.
- [ ] Display headlines do not clip at 200% browser zoom.
- [ ] Mobile navigation remains usable with a long organization name.
- [ ] Buttons and form controls have at least 44×44px targets.
- [ ] Hero content is not obscured by the fixed navbar or device safe areas.
- [ ] Section spacing compresses on mobile without collapsing hierarchy.
- [ ] Event controls and cards stack without truncated metadata.
- [ ] Contact fields and panels switch cleanly from split to stacked layout.

### 10.3 Keyboard and assistive technology

- [ ] Every action is reachable and operable by keyboard.
- [ ] Focus order follows visual order.
- [ ] Focus is always visible with at least a 2px indicator.
- [ ] Mobile menu traps focus while open, closes on Escape, and restores trigger focus.
- [ ] Accordion and tabs expose correct names, states, and relationships.
- [ ] RSVP and form result messages are announced without stealing focus unexpectedly.
- [ ] Icons do not duplicate accessible link/button labels.
- [ ] Heading levels form a logical hierarchy with one `h1` per route.

### 10.4 Contrast and readability

- [ ] Normal text reaches at least 4.5:1 contrast.
- [ ] Large text and essential UI boundaries reach at least 3:1.
- [ ] Orange is not the sole indicator of selected, error, or success state.
- [ ] Text over ambient gradients remains readable at every animation frame.
- [ ] Body copy remains at least 15px, with 16px preferred.

### 10.5 Motion and performance

- [ ] `prefers-reduced-motion: reduce` removes marquee, count-up, reveal travel, and ambient movement while preserving content.
- [ ] No animation blocks scrolling or pointer input.
- [ ] Only opacity and transform animate during frequent interactions.
- [ ] Desktop scrolling remains visually smooth on a typical integrated-GPU laptop.
- [ ] Mobile hero uses fewer/lighter blur layers.
- [ ] There is no layout shift when fonts, images, or event content load.
- [ ] Lighthouse targets on a production build: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90.
- [ ] Largest Contentful Paint target: under 2.5s on a representative mobile test.
- [ ] Cumulative Layout Shift target: below 0.1.

### 10.6 Functional regression

- [ ] `npm.cmd run build` completes successfully.
- [ ] ESLint completes with no newly introduced errors.
- [ ] Navigation active states match the current route.
- [ ] Events filter and past-event expansion still work.
- [ ] RSVP confirmation remains understandable and does not claim persistence.
- [ ] FAQ opens and closes correctly.
- [ ] Contact validation, loading, success, and reset states still work.
- [ ] External links and mail links point to verified destinations.

## 11. Implementation definition of done

The theme migration is complete when:

1. Every current route uses the semantic design tokens and shared shell.
2. The Home hero and marquee provide the signature cinematic identity.
3. Internal pages use editorial hierarchy rather than repeating the same card grid.
4. Existing interactions remain functional and accessible.
5. Desktop and mobile acceptance checks pass.
6. Reduced-motion users receive the same information without continuous animation.
7. The production build and lint checks pass.
8. No reference-owned visual asset, custom lettering, or content has been copied.
9. Placeholder “AW”, university address, and generic email content have been replaced with approved WildQuacc information.

## 12. Explicit assumptions

- This is an inspired adaptation, not a close replica.
- Current WildQuacc copy and functionality are authoritative unless club leadership supplies corrections.
- An approved logo will be supplied before final visual QA; until then, implementation may use a clearly labeled temporary mark.
- No backend work is included for RSVP, newsletter, or contact delivery.
- Optional animation never blocks delivery of the accessible CSS-based baseline.
- The reference site may change after the review date; this document records the observed design principles rather than requiring permanent pixel parity.

