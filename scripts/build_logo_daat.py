#!/usr/bin/env python3
"""
Gera assets/logo-daat-real.png a partir de assets/logo-source-new.png
remove fundo branco (flood fill nos cantos).

  .venv/bin/python scripts/build_logo_daat.py

Ajuste FLOOD_THRESH (18–35) se sobrar halo branco ou cortar brilhos finos.

Depois do flood, a faixa inferior (“daat mídia”) fica **vazada**: branco e cinza
claro somem; só resta o traço escuro.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "logo-source-new.png"
OUT = ROOT / "assets" / "logo-daat-real.png"

WHITE_THRESH = 235
FLOOD_THRESH = 26
# Início da faixa inferior só com o wordmark (evita colher o círculo)
WORDMARK_Y_RATIO = 0.68
# Pixels claros e pouco saturados → transparente (preenchimento branco + sombra cinza)
WORDMARK_LUM_MIN = 82
WORDMARK_SAT_MAX = 58


def knockout_bottom_wordmark(rgba: Image.Image) -> None:
    """Deixa 'daat mídia' vazado: remove branco/cinza neutro, mantém preto/contorno."""
    px = rgba.load()
    w, h = rgba.size
    y0 = int(h * WORDMARK_Y_RATIO)
    for y in range(y0, h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 12:
                continue
            lum = (r + g + b) / 3
            sat = max(r, g, b) - min(r, g, b)
            if lum >= WORDMARK_LUM_MIN and sat <= WORDMARK_SAT_MAX:
                px[x, y] = (0, 0, 0, 0)


def corner_is_white(im: Image.Image) -> bool:
    px = im.load()
    w, h = im.size
    s = 0
    for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        r, g, b = px[x, y][:3]
        s += (r + g + b) / 3
    return s / 4 >= WHITE_THRESH


def remove_white_background(im: Image.Image) -> Image.Image:
    rgba = im.convert("RGBA")
    w, h = rgba.size
    seeds = [
        (3, 3),
        (w - 4, 3),
        (3, h - 4),
        (w - 4, h - 4),
        (w // 2, 2),
        (w // 2, h - 3),
        (2, h // 2),
        (w - 3, h // 2),
    ]
    for xy in seeds:
        try:
            ImageDraw.floodfill(rgba, xy, (0, 0, 0, 0), thresh=FLOOD_THRESH)
        except ValueError:
            pass
    return rgba


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Coloque a arte em: {SRC}")

    im = Image.open(SRC)
    if not corner_is_white(im):
        raise SystemExit(
            "Os cantos da imagem não parecem brancos. "
            "Exporte a logo com fundo branco sólido ou ajuste WHITE_THRESH no script."
        )

    out = remove_white_background(im)
    knockout_bottom_wordmark(out)
    out.save(OUT, "PNG", optimize=True)
    print(f"OK → {OUT}")


if __name__ == "__main__":
    main()
