/**
 * Design token names. All values live in globals.css as CSS custom properties.
 * Change a theme here by editing the corresponding CSS variable in globals.css.
 *
 * Usage in components:  style={{ color: "var(--text-1)" }}
 */
export const C = {
  /* ── Backgrounds ── */
  bgSection:   "var(--bg-section)",
  bgCard:      "var(--bg-card)",
  bgInput:     "var(--bg-input)",
  bgMeta:      "var(--bg-meta)",
  bgHover:     "var(--bg-hover)",

  /* ── Text ── */
  text1:       "var(--text-1)",   // primary heading / value
  text2:       "var(--text-2)",   // secondary / description
  text3:       "var(--text-3)",   // muted / label
  textBody:    "var(--text-b)",   // body prose

  /* ── Borders & Dividers ── */
  border:      "var(--border)",
  divider:     "var(--divider)",  // section gradient line

  /* ── Shadows ── */
  shadowSm:    "var(--shadow-sm)",
  shadowMd:    "var(--shadow-md)",

  /* ── B&W icons (GitHub, Twitter, Threads…) ── */
  iconBw:      "var(--icon-bw)",
  iconBwBg:    "var(--icon-bw-bg)",
  iconBwBorder:"var(--icon-bw-border)",

  /* ── Neutral chip (About / Tags) ── */
  chipNBg:     "var(--chip-n-bg)",
  chipNColor:  "var(--chip-n-color)",
  chipNBorder: "var(--chip-n-border)",

  /* ── Navbar ── */
  navBgScroll: "var(--nav-bg-scroll)",
  navBgTop:    "var(--nav-bg-top)",
  navBorder:   "var(--nav-border)",
  navBorderTop:"var(--nav-border-top)",
  navShadow:   "var(--nav-shadow)",
  navLink:     "var(--nav-link)",
  navLinkHover:"var(--nav-link-hover)",
  navLinkHoverBg:"var(--nav-link-hover-bg)",
  navActive:   "var(--nav-active)",
  navActiveBg: "var(--nav-active-bg)",
  navActiveBorder:"var(--nav-active-border)",
  menuBg:      "var(--menu-bg)",
  menuBorder:  "var(--menu-border)",
  menuDivider: "var(--menu-divider)",
  toggleBg:    "var(--toggle-bg)",
  toggleBorder:"var(--toggle-border)",
  toggleColor: "var(--toggle-color)",

  /* ── Section specifics ── */
  timelineLine:"var(--timeline-line)",
  catLine:     "var(--cat-line)",
  heroGrid:    "var(--hero-grid)",

  /* ── Accents ── */
  accentHighlight: "var(--accent-highlight)",  // cyan (dark) / purple (light)

  /* ── Hero badges (stat chips) ── */
  badgeBg:     "var(--badge-bg)",
  badgeBorder: "var(--badge-border)",

  /* ── Footer ── */
  footerBg:    "var(--footer-bg)",
  footerBorder:"var(--footer-border)",
} as const;
