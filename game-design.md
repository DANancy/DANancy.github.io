# Game design

## Concept and loop

A tiny knowledge sprite explores a connected floating world built from data, projects, and community. The loop is **fly → approach → interact → learn**. There is no combat, score, failure state, inventory, or quest system.

The MVP contains Data Forest, Project Ruins, and Make AI Practical Village. Five landmarks cover a technology overview, three projects, and the Board Member role. Landmarks must have a short spatial label and open substantial copy in a 2D panel.

## Controls

- W/arrow up or Space: up/forward
- S/arrow down or Shift: down/back
- A/D or left/right arrows: horizontal movement
- E: interact when close; Escape: close a panel
- Mobile: four large direction buttons; tap any landmark to inspect it

The sprite floats while idle, faces horizontally, leaves a light trail, and glows near landmarks. Environmental labels, light paths, and landmark glow guide navigation.

## Scope and future work

The MVP intentionally uses a layered 2.5D procedural world: it proves movement, discovery, panels, modes, and responsive accessibility without loading a 3D engine. Later phases can replace the scene with React Three Fiber, add AI Library and Memory Garden, smooth camera following, richer mobile tap-to-focus, compressed models, and adaptive quality. Content and panel contracts should remain unchanged.
