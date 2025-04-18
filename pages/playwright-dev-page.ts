import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderTabs } from "../enums/playwright-common-enums";
import { PlaywrightComonPage } from "./playwright-common-page";

export class PlaywrightDevPage extends PlaywrightComonPage {
    readonly page: Page;
    readonly getStartedLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    }

    async goto() {
        await this.page.goto('https://playwright.dev');
    }

    async getStarted() {
        await this.getStartedLink.first().click();
        await expect(this.headerTabs(HeaderTabs.Docs)).toHaveAttribute('aria-current', 'page');
    }
}