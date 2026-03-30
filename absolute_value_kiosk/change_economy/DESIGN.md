# Design System Strategy: High-Contrast Retro-Futurism

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Brutalist Archive"**

This design system is a deliberate rejection of the soft, rounded "SaaS" aesthetic. It draws inspiration from early 8-bit mainframe terminals and high-stakes arcade game interfaces. The system utilizes a "Solid Black" foundation to create an infinite canvas where high-contrast typography and vibrant signals define the space.

Instead of traditional grids, we embrace **intentional asymmetry and focal weight**. Elements are grouped into tight, high-contrast clusters, leaving significant negative space to emphasize the "Absolute Value" of the data presented. We move beyond simple "retro" by applying editorial layout principles—overlapping pixelated containers and using radical scale shifts in typography to create a sense of digital hierarchy that feels both nostalgic and premium.

---

## 2. Colors
Our palette is binary: life and death, gain and loss, positive and negative.

*   **Foundation:** The core is `background` (#0e0e0e), providing a deep, ink-black base that makes neon accents pop.
*   **The Binary Signal:** `primary` (#9cff93) is our Emerald Green, reserved for growth and positive values. `secondary` (#ff725e) is our Vibrant Red, signaling risk, debt, or negative values.
*   **The "No-Line" Rule:** To maintain a high-end feel, **do not use 1px solid borders to section off large page areas.** Boundaries are defined by shifting between `surface-container-low` (#131313) and `surface-container-high` (#1f1f1f). This creates a "machined" look where sections feel like plates of metal or glass recessed into a console.
*   **Signature Textures:** For high-impact interactive elements (like the 'Confirm' button or value toggles), use a linear gradient transitioning from `primary_container` (#00fc40) to `primary_dim` (#00ec3b). This adds a "glowing CRT" soul to the interface that flat colors cannot achieve.

---

## 3. Typography
We utilize a single, high-impact pixelated typeface to maintain the 8-bit soul, but we apply it with editorial rigor.

*   **Display & Headlines:** Use `display-lg` (3.5rem) and `headline-lg` (2rem). These should be treated as graphic elements. Letter-spacing should be tight to create a "blocky" monolith of text.
*   **Body & Labels:** `body-md` (0.875rem) handles the bulk of the data. For secondary info, `label-sm` (0.6875rem) provides a technical, metadata-heavy feel.
*   **Identity through Hierarchy:** The contrast between a massive `display-lg` value and a tiny `label-sm` descriptor creates the "Absolute Value" aesthetic—making the numbers the hero of the experience.

---

## 4. Elevation & Depth
In a world of flat pixels, depth is our most powerful tool for focus.

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A player's "IMG" block sits on `surface-container-highest` (#262626) to pop against the `background`.
*   **Ambient Shadows:** Traditional shadows are forbidden. If an element must "float," use a low-opacity glow. Use the `primary` or `secondary` token at 8% opacity with a large (24px+) blur. It should look like light bleeding from a monitor, not a physical shadow.
*   **The "Ghost Border" Fallback:** If containment is needed for input fields, use a "Ghost Border" using `outline-variant` (#484848) at 20% opacity. 
*   **Glassmorphism & Depth:** For overlay menus or "Place Drink" prompts, use `surface-container-low` with a `backdrop-blur` of 8px and 60% opacity. This makes the UI feel like a transparent HUD overlaying the game world.

---

## 5. Components

*   **Buttons:** Rectangular with `DEFAULT` (0px) roundedness.
    *   *Primary:* Solid `primary` background with `on_primary` text.
    *   *State:* Hover states should shift to `primary_container` with a subtle glow.
*   **Form Inputs:** A single `outline` (#757575) at the bottom (like the "Enter Name" sketch) or a full `surface-container-high` box. Text must be `on_surface`.
*   **Value Toggles (The "OR" Component):** As seen in the "Starting Funds" sketch, use high-contrast blocks. The negative value card uses `secondary_container` and the positive uses `primary_container`.
*   **Chips:** Use `surface-bright` (#2c2c2c) with `on_surface` text for non-actionable tags.
*   **Cards & Lists:** No dividers. Separate items using `surface-container-lowest` vs `surface-container-low` background shifts.
*   **Progress Indicators:** Use "segmented" bars (blocks of color) rather than smooth fills to reinforce the pixel-art aesthetic.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace the 0px border radius. Every element must be sharp and angular.
*   **Do** use extreme contrast. If a value is positive, it should be unapologetically green.
*   **Do** use vertical white space (from the **Spacing Scale**, e.g., `24` / 5.5rem) to separate major sections like "Create New Player" from the "Starting Funds" selection.

### Don't:
*   **Don't** use soft grays or "off-white" for text. Use `on_surface` (#ffffff) for maximum vibrance against the black.
*   **Don't** ever use a border-radius. Even a 2px radius destroys the "8-bit" intentionality.
*   **Don't** use standard "drop shadows." They feel like modern web templates; use tonal layering or light-glows instead.
*   **Don't** clutter the screen. If a piece of data isn't "Absolute," hide it in a nested container.