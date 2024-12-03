import puppeteer from "puppeteer";

async function convertHtmlToPdf(html, userID) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(html);
    await page.pdf({ path: `./media/${userID}-assignment.pdf`, format: 'A4' });
    
    await browser.close();

}

export default convertHtmlToPdf;

