// Easvarafy Music — main.js
// Progressive enhancement: halaman tetap berfungsi tanpa JavaScript.
(function () {
  "use strict";

  // Tahun otomatis di footer (fallback teks statis di HTML tetap tampil)
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Tandai klik unduh APK (berguna untuk analytics / logging di console)
  document.querySelectorAll('a[href$=".apk"]').forEach(function (link) {
    link.addEventListener("click", function () {
      // eslint-disable-next-line no-console
      console.info("[Easvarafy] Unduhan APK dimulai:", link.getAttribute("href"));
    });
  });
})();
