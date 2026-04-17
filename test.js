const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/surah/1', { waitUntil: 'networkidle0' });
    
    // Check main text font size
    const pFontSize = await page.evaluate(() => {
      const p = document.querySelector('p.text-right.text-slate-800');
      if (p) return window.getComputedStyle(p).fontSize;
      return 'Not Found';
    });
    console.log('Surah text font size:', pFontSize);
    
    // Simulate setting local storage and reloading since dragging with puppeteer is tricky
    await page.evaluate(() => {
      localStorage.setItem('quran_settings', JSON.stringify({ arabicFontSize: 50, translationFontSize: 24, arabicFont: 'noto' }));
    });
    await page.reload({ waitUntil: 'networkidle0' });
    
    const pFontSizeAfter = await page.evaluate(() => {
      const p = document.querySelector('p.text-right.text-slate-800');
      if (p) return window.getComputedStyle(p).fontSize;
      return 'Not Found';
    });
    console.log('Surah text font size after reload:', pFontSizeAfter);
    
    await browser.close();
  } catch (err) { console.error('Error:', err); }
})();
