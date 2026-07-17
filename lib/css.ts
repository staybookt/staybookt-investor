/* Strip comments out of the CSS we ship.
 *
 * Every page renders its styles as <style>{CSS}</style> from a template literal. Tailwind's
 * PostCSS pass does NOT touch those — it only processes real stylesheets — so whatever is in
 * the literal goes to the browser byte for byte, comments and all.
 *
 * That meant View Source on the homepage served 27 comments / 5.6KB of internal notes,
 * naming Richard and Jacob and quoting review feedback verbatim, on a site about to go out
 * to external reviewers. The comments are worth keeping: they are why this codebase does not
 * repeat its mistakes. They are just not worth publishing.
 *
 * Deliberately conservative. Strips /* *\/ comments and leading indentation, nothing else.
 * Verified first that no CSS here puts a comment token inside a string or url(), which is
 * the only thing that would make this unsafe.
 */
export const min = (css: string): string =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]+/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
