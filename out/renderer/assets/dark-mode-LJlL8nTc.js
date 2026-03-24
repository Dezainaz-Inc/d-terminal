const QUERY = "(prefers-color-scheme: dark)";
function sync() {
  const isDark = window.matchMedia(QUERY).matches;
  document.documentElement.classList.toggle("dark", isDark);
}
function initDarkMode() {
  sync();
  window.matchMedia(QUERY).addEventListener("change", sync);
}
export {
  initDarkMode as i
};
