"""Bundle the site into one self-contained HTML file (preview/index.html) for sharing a preview link."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    html = (ROOT / "index.html").read_text()
    css = (ROOT / "assets/styles.css").read_text()
    config = (ROOT / "config/site.js").read_text()
    app = (ROOT / "assets/app.js").read_text()

    html = html.replace('<link rel="stylesheet" href="/assets/styles.css">', f"<style>\n{css}\n</style>")
    html = html.replace('<script src="/config/site.js"></script>', f"<script>\n{config}\n</script>")
    html = html.replace('<script src="/assets/app.js"></script>', f"<script>\n{app}\n</script>")
    if "/assets/styles.css" in html or 'src="/' in html:
        raise SystemExit("build_preview: a local asset reference was not inlined")

    out = ROOT / "preview/index.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(html)
    print(f"wrote {out} ({len(html):,} bytes)")


if __name__ == "__main__":
    main()
