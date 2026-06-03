#!/usr/bin/env python3
"""
Substitui o fundo preto conectado às bordas do PNG por branco (flood fill).
Preserva formas escuras que não tocam a borda.
"""
from __future__ import annotations

import sys
from collections import deque

from PIL import Image


def main() -> int:
    path = sys.argv[1] if len(sys.argv) > 1 else "assets/daat-midia-hero-grafico.png"
    threshold = int(sys.argv[2]) if len(sys.argv) > 2 else 42

    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    def is_bg_pixel(r: int, g: int, b: int, a: int) -> bool:
        if a < 30:
            return True
        return max(r, g, b) <= threshold

    visited = [bytearray(w) for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            r, g, b, a = px[x, y]
            if is_bg_pixel(r, g, b, a):
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            r, g, b, a = px[x, y]
            if is_bg_pixel(r, g, b, a):
                q.append((x, y))

    while q:
        x, y = q.popleft()
        if visited[y][x]:
            continue
        r, g, b, a = px[x, y]
        if not is_bg_pixel(r, g, b, a):
            continue
        visited[y][x] = 1
        px[x, y] = (255, 255, 255, 255)
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                q.append((nx, ny))

    img.save(path, optimize=True)
    print(f"OK: {path} (threshold={threshold})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
