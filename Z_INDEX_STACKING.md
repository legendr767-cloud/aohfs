# Z-Index Stacking Order - Mobile Menu

## Current Z-Index Layers (Bottom to Top)

```
Layer 1: Body & Background
  z-index: auto (0)

Layer 2: Header
  z-index: 1000
  .header-3d

Layer 3: Dark Overlay
  z-index: 10000
  body::after (when menu open)
  - Has pointer-events: auto to close menu on click

Layer 4: Logo
  z-index: 10001
  .logo-3d

Layer 5: Mobile Menu
  z-index: 10001
  .nav-menu
  - Has pointer-events: auto when active
  - Contains all navigation links

Layer 6: Burger Button
  z-index: 10000
  .mobile-menu-toggle
```

## Pointer Events Flow

### When Menu is Closed
- Menu: `pointer-events: none` (invisible, off-screen)
- Overlay: `pointer-events: none` (invisible)
- Burger: `pointer-events: auto` (clickable)

### When Menu is Open
- Menu: `pointer-events: auto` (clickable)
- Overlay: `pointer-events: auto` (clickable to close)
- Burger: `pointer-events: auto` (clickable to close)
- Nav Links: `pointer-events: auto` (clickable)
- Dropdown Items: `pointer-events: auto` (clickable)

## Click Behavior

1. **Click Burger** → Menu opens, overlay appears
2. **Click Nav Link** → Navigate to page, menu closes
3. **Click Dropdown Parent** → Dropdown expands (preventDefault on mobile)
4. **Click Dropdown Item** → Navigate to page, menu closes
5. **Click Overlay** → Menu closes
6. **Click ESC** → Menu closes

## Fixed Issues

### Problem 1: Links Unclickable
- **Cause**: Overlay z-index (9998) was blocking menu (9999)
- **Fix**: Raised menu to z-index 10001, overlay to 10000

### Problem 2: Pointer Events
- **Cause**: Menu didn't have explicit pointer-events
- **Fix**: Added `pointer-events: none` default, `pointer-events: auto` when active

### Problem 3: Link Specificity
- **Cause**: Links didn't have explicit cursor and pointer-events
- **Fix**: Added `cursor: pointer` and `pointer-events: auto` to all links

## CSS Applied

```css
/* Menu Container */
.nav-menu {
    z-index: 10001;
    pointer-events: none;
}
.nav-menu.active {
    pointer-events: auto;
}

/* Overlay */
body::after {
    z-index: 10000;
    pointer-events: none;
}
body.menu-open::after {
    pointer-events: auto;
}

/* All Links */
.nav-link,
.dropdown-menu-3d a,
.mobile-donate-btn {
    position: relative;
    z-index: 1;
    pointer-events: auto;
    cursor: pointer;
}
```

## Testing Checklist

- [x] Burger icon clickable
- [x] Menu opens on burger click
- [x] Home link clickable
- [x] About Us dropdown expands
- [x] About Us dropdown items clickable
- [x] What We Do dropdown expands
- [x] What We Do dropdown items clickable
- [x] Get Involved dropdown expands
- [x] Get Involved dropdown items clickable
- [x] Impact dropdown expands
- [x] Impact dropdown items clickable
- [x] Blog link clickable
- [x] Donate button clickable
- [x] Overlay click closes menu
- [x] ESC key closes menu
- [x] Link click closes menu
