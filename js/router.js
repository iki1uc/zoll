// ================================================================
//  stage/router.js (Gruppe 6: Stage-System)
//  Ein echter, minimaler Hash-Router: liest location.hash, ruft bei
//  Änderung onNavigate(target) auf. navigate(target) setzt den Hash
//  und löst damit die Navigation aus (Browser-Verlauf inklusive:
//  Zurück-Button funktioniert).
// ================================================================

export function initRouter(onNavigate) {
  function handle() {
    const hash = location.hash.replace('#', '') || 'root';
    onNavigate(hash);
  }
  window.addEventListener('hashchange', handle);
  handle();
  return { navigate: (target) => { location.hash = target; } };
}
