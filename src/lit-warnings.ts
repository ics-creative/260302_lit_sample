declare global {
  interface Window {
    litIssuedWarnings?: Set<string>;
  }
}

if (!window.litIssuedWarnings) {
  window.litIssuedWarnings = new Set();
}

window.litIssuedWarnings.add("dev-mode");

export {};
