const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Default settings
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('quran_settings', JSON.stringify({ arabicFont: 'amiri', arabicFontSize: 36, translationFontSize: 18 }));
    });
    await page.goto('http://localhost:3000/surah/1', { waitUntil: 'networkidle0' });
    
    // Check amiri font
    const amiriFamily = await page.evaluate(() => {
      const p = document.querySelector('p.text-right.text-slate-800');
      return window.getComputedStyle(p).fontFamily;
    });
    console.log('Font with amiri setting:', amiriFamily);

    // change setting to noto
    await page.evaluate(() => {
      localStorage.setItem('quran_settings', JSON.stringify({ arabicFont: 'noto', arabicFontSize: 36, translationFontSize: 18 }));
    });
    await page.reload({ waitUntil: 'networkidle0' });
    
    const notoFamily = await page.evaluate(() => {
      const p = document.querySelector('p.text-right.text-slate-800');
      return window.getComputedStyle(p).fontFamily;
    });
    console.log('Font with noto setting:', notoFamily);
    
    await browser.close();
  } catch(e) {
      console.error(e)
  }
})();
