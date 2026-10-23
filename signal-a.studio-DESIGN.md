---
version: alpha
name: Signal-a
description: |
  Signal-A Studio's design system embodies refined minimalism with deliberate
  typographic emphasis. The aesthetic prioritizes clarity and precision,
  employing a stark black-and-white palette with monospaced typography as a core
  structural element. The layout breathes through generous whitespace and
  disciplined line breaks, creating an architectural quality that mirrors the
  studio's approach to bespoke digital product design. Every visual
  decision—from the mono-weight font hierarchy to razor-sharp edges—reflects
  intentionality and craftsmanship. The system favors content over ornament,
  allowing photography and curated typography to drive narrative. Time stamps,
  location markers, and project metadata are treated as design elements, not
  afterthoughts, reinforcing the studio's meticulous, detail-focused brand
  voice.
source:
  url: "https://signal-a.studio"
  pagesAnalyzed: 1
  extractedAt: 2026-10-19
  tokensMeasured: true
colors:
  primary: "#000000"
  canvas: "#FFFFFF"
  ink: "#000000"
typography:
  body:
    fontFamily: "Neue Haas Grotesk Text Pro"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0px
    textTransform: uppercase
  code-xs:
    fontFamily: "Gt America Mono"
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1
    letterSpacing: 0px
    textTransform: uppercase
  code-xs-loose:
    fontFamily: "Gt America Mono"
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: 0px
    textTransform: uppercase
  code-xs-2:
    fontFamily: "Gt America Mono"
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: 0px
    textTransform: uppercase
rounded:
  none: 0px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 32px
  xxl: 40px
  xxxl: 60px
  section: 100px
  band: 140px
borderWidths:
  thin: 1px
elevationStrategy: color-blocking
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#FFFFFF"
    surface: "#F7F7F7"
    surfaceRaised: "#EDEDED"
    text: "#000000"
    textMuted: "#595959"
    border: "#E0E0E0"
    accent: "#000000"
    accentFg: "#FFFFFF"
    focusRing: "#000000"
    elevation: shadow
  dark:
    bg: "#0F0F10"
    surface: "#1D1D1E"
    surfaceRaised: "#29292A"
    text: "#F5F5F5"
    textMuted: "#9E9E9E"
    border: "#353536"
    accent: "#858585"
    accentFg: "#0B0B0C"
    focusRing: "#666666"
    elevation: "border+surface"
components:
  link:
    typography: "{typography.code-xs}"
    textColor: "{colors.ink}"
  link-sm:
    typography: "{typography.code-xs}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.canvas}"
states:
  other-focus:
    target: other
    state: focus
    outline: none
  input-focus:
    target: input
    state: focus
    borderColor: "rgb(56, 152, 236)"
  other-hover:
    target: other
    state: hover
    opacity: 1
  link-hover:
    target: link
    state: hover
    textDecoration: underline
  button-hover:
    target: button
    state: hover
    textColor: "{colors.canvas}"
    borderColor: "rgb(116, 116, 116)"
breakpoints:
  - width: 375
    containerWidth: 355
    gridColumns: 2
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 10
    sectionPaddingX: 0
  - width: 768
    containerWidth: 728
    gridColumns: 2
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 11
    sectionPaddingX: 0
  - width: 1024
    containerWidth: 944
    gridColumns: 4
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 12
    sectionPaddingX: 0
  - width: 1280
    containerWidth: 1200
    gridColumns: 4
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 12
    sectionPaddingX: 0
  - width: 1440
    containerWidth: 1360
    gridColumns: 4
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 12
    sectionPaddingX: 0
coverage:
  statesFound: 15
  gradientsFound: 0
  rolesUnassigned: 0
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: true
  semanticRampDeclared: false
---

# Design System Inspired by Signal-A Studio

## 1. Visual Theme & Atmosphere

Signal-A Studio's design system embodies **refined minimalism with deliberate typographic emphasis**. The aesthetic prioritizes clarity and precision, employing a stark black-and-white palette with monospaced typography as a core structural element. The layout breathes through generous whitespace and disciplined line breaks, creating an architectural quality that mirrors the studio's approach to bespoke digital product design. Every visual decision—from the mono-weight font hierarchy to razor-sharp edges—reflects intentionality and craftsmanship. The system favors content over ornament, allowing photography and curated typography to drive narrative. Time stamps, location markers, and project metadata are treated as design elements, not afterthoughts, reinforcing the studio's meticulous, detail-focused brand voice.

**Key Characteristics:**
- Strict black-and-white palette with no shades or tints
- Monospaced typography for navigation and metadata; serif-like proportional fonts for body copy
- Uppercase text as standard; all cap constraints shape visual rhythm
- Sharp corners (0° radius) on interactive elements; no rounded affordances
- Generous vertical and horizontal spacing defining sections
- Metadata (time, location, year) integrated into layout as design elements
- Link underlines appear on hover, revealing interactive affordances subtly
- Flat color-blocking; no shadows or gradients

## 2. Color Palette & Roles

### Primary
- **Brand Ink** (`#000000`): Primary text, headings, brand mark, active states, primary interactive elements, and all body copy. The sole chromatic anchor of the system.

### Neutral Scale
- **Canvas** (`#FFFFFF`): Default page background, content surfaces, and negative space. Provides maximum contrast with Brand Ink.

### Interactive
- **Focus Indicator** (`rgb(56, 152, 236)` / `#3898EC`): Applied to input element borders on focus. The sole non-black/white color in the system, appearing only in focused form states.

## 3. Typography Rules

### Font Family

**Primary:** GT America Mono
Fallback stack: `'GT America Mono', 'Courier New', monospace`
Usage: Navigation links, metadata, timestamps, location labels, code-like structural text.

**Secondary:** Neue Haas Grotesk Text Pro
Fallback stack: `'Neue Haas Grotesk Text Pro', 'Helvetica Neue', sans-serif`
Usage: Body copy, hero statements, project descriptions.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Navigation Link | GT America Mono | 12px | 300 | 1 | 0px | All caps, tight line height |
| Navigation Code | GT America Mono | 12px | 300 | 1.3 | 0px | All caps variant |
| Navigation Code Alt | GT America Mono | 12px | 300 | 1.4 | 0px | All caps, relaxed line height |
| Body | Neue Haas Grotesk Text Pro | 17px | 400 | 1 | 0px | All caps; primary reading text |

### Principles

- **Uppercase constraint:** All typography is uppercase by default (`text-transform: uppercase`), enforcing visual uniformity and rhythm.
- **Monospace for structure:** Navigation, links, metadata, and code-like elements use GT America Mono (weight 300), creating a technical, precise aesthetic.
- **Proportional serif for narrative:** Body copy and longer prose use Neue Haas Grotesk, offering readability while maintaining formality.
- **Minimal leading:** Most text uses `line-height: 1`, creating compact, grid-aligned stacking. Only metadata and navigation variants relax to 1.3–1.4 for breathing room.
- **No tracking adjustments:** Letter spacing remains 0px across all roles, preserving word and letter rhythm without artificial gaps.

## 4. Component Stylings

### Links

**Default State**
- Font Family: GT America Mono
- Font Size: 12px
- Font Weight: 300
- Line Height: 1
- Color: `#000000`
- Background Color: transparent
- Border: none
- Padding: 0px
- Text Transform: uppercase
- Box Shadow: none
- Border Radius: `{rounded.none}`

**Hover State**
- Text Decoration: underline
- Outline: 0px

**Focus State**
- Outline: 0px
- Outline Color: initial

**Small Variant (12px, bordered)**
- Font Family: GT America Mono
- Font Size: 12px
- Font Weight: 300
- Line Height: 1
- Color: `#000000`
- Background Color: transparent
- Border: 1px solid `#FFFFFF`
- Padding: 0px
- Border Radius: `{rounded.none}`
- Outline: 0px

### Navigation

**Structure**
- Background: transparent
- Border Bottom: 1px solid `#000000`
- Font: GT America Mono, 12px, weight 300
- Text Transform: uppercase
- Link color on default: `#000000`
- All nav links visible on desktop; no collapse pattern detected

### Inputs & Forms

**Default State**
- Font Family: GT America Mono
- Font Size: 12px
- Font Weight: 300
- Line Height: 1
- Color: `#000000`
- Background Color: transparent
- Border: none (if not explicitly styled)
- Padding: 0px
- Border Radius: `{rounded.none}`
- Outline: 0px

**Focus State**
- Border Color: `rgb(56, 152, 236)` (`#3898EC`)
- Outline: 0px
- Color: `#000000`

### Cards & Containers

**Default Card