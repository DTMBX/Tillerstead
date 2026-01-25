---
layout: default
title: 4K Display Test - Tillerstead
permalink: /4k-test/
---

<div style="padding: 4rem 2rem; max-width: 2400px; margin: 0 auto;">
  
  <h1>4K Display & Scroll Test</h1>
  
  <section style="margin: 3rem 0;">
    <h2>Display Information</h2>
    <div id="display-info" style="background: #f5f5f5; padding: 2rem; border-radius: 8px;">
      <p><strong>Screen Width:</strong> <span id="screen-width"></span>px</p>
      <p><strong>Screen Height:</strong> <span id="screen-height"></span>px</p>
      <p><strong>Device Pixel Ratio:</strong> <span id="dpr"></span></p>
      <p><strong>Viewport Width:</strong> <span id="viewport-width"></span>px</p>
      <p><strong>Document Height:</strong> <span id="doc-height"></span>px</p>
      <p><strong>Scroll Position:</strong> <span id="scroll-pos"></span>px</p>
    </div>
  </section>
  
  <section style="margin: 3rem 0;">
    <h2>Scroll Test Sections</h2>
    <div style="height: 100vh; background: linear-gradient(135deg, #00e184, #00b46a); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin: 2rem 0; border-radius: 12px;">
      Section 1 - Scroll Down
    </div>
    <div style="height: 100vh; background: linear-gradient(135deg, #d4af37, #9c7a14); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin: 2rem 0; border-radius: 12px;">
      Section 2 - Keep Scrolling
    </div>
    <div style="height: 100vh; background: linear-gradient(135deg, #00e184, #d4af37); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin: 2rem 0; border-radius: 12px;">
      Section 3 - Almost There
    </div>
    <div style="height: 100vh; background: linear-gradient(135deg, #9c7a14, #00b46a); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin: 2rem 0; border-radius: 12px;">
      Section 4 - Scroll Works! 🎉
    </div>
  </section>
  
</div>

<script>
(function() {
  function updateDisplayInfo() {
    document.getElementById('screen-width').textContent = screen.width;
    document.getElementById('screen-height').textContent = screen.height;
    document.getElementById('dpr').textContent = window.devicePixelRatio;
    document.getElementById('viewport-width').textContent = window.innerWidth;
    document.getElementById('doc-height').textContent = document.documentElement.scrollHeight;
    document.getElementById('scroll-pos').textContent = Math.round(window.pageYOffset);
  }
  
  updateDisplayInfo();
  window.addEventListener('scroll', updateDisplayInfo, { passive: true });
  window.addEventListener('resize', updateDisplayInfo, { passive: true });
})();
</script>
