/*
  SmartSync Prototype — Mobile Drawer Toggle (minimal vanilla JS)
  แหล่งอ้างอิง: DESIGN.md §3.5 Navigation — Tablet/Mobile (< 1024px) ใช้ hamburger + drawer overlay
  ทำหน้าที่เดียว: เปิด/ปิด drawer เมนู (สลับ class บน .sidebar + .drawer-scrim) — ไม่มี logic ทางธุรกิจใดๆ
  ไม่ใช่ framework/state management จริง — เป็นแค่ prototype chrome เพื่อคลิกดู interaction เท่านั้น
*/
(function () {
  function getSidebar() { return document.querySelector('.sidebar'); }
  function getScrim() { return document.querySelector('.drawer-scrim'); }

  window.toggleDrawer = function () {
    var sidebar = getSidebar();
    var scrim = getScrim();
    if (!sidebar) return;
    var isOpen = sidebar.classList.toggle('drawer-open');
    if (scrim) scrim.classList.toggle('is-open', isOpen);
  };

  window.closeDrawer = function () {
    var sidebar = getSidebar();
    var scrim = getScrim();
    if (sidebar) sidebar.classList.remove('drawer-open');
    if (scrim) scrim.classList.remove('is-open');
  };

  // ปิด drawer อัตโนมัติเมื่อขยายจอกลับมาเป็น desktop (>=1024px) เพื่อไม่ให้ค้าง state เปิดค้างไว้
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) window.closeDrawer();
  });
})();
