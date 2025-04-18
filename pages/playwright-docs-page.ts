import { type Locator, type Page } from '@playwright/test';
import { PlaywrightComonPage } from './playwright-comon-page';

export class PlaywrightDocsPage extends PlaywrightComonPage {

    readonly page: Page;
    readonly gettingStartedHeader: Locator;
    readonly pomLink: Locator;
    readonly tocList: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
        this.pomLink = page.locator('li', {
            hasText: 'Guides',
        }).locator('a', {
            hasText: 'Page object model',
        });
        this.tocList = page.locator('article div.markdown ul > li > a');
    }

    async pageObjectModel() {
        await this.pomLink.click();
    }
}

