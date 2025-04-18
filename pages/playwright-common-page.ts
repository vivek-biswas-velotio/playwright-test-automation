import { expect, type Locator, type Page } from "@playwright/test";
import { HeaderTabs } from "../enums/playwright-common-enums";
import { LanguageDropdownOptions } from "../enums/playwright-common-enums";

export class PlaywrightComonPage {

    // Static Locators
    readonly page: Page;
    readonly playwrightLogo: Locator;
    readonly languageDropdown: Locator;


    // Dynamic Locators
    readonly languageDropdownOptions: (option: LanguageDropdownOptions) => Locator;
    readonly headerTabs: (tabName: HeaderTabs) => Locator;


    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.playwrightLogo = page.getByRole('link', { name: 'Playwright logo Playwright' });
        this.languageDropdown = page.locator('nav[aria-label="Main"] a[role="button"]');

        this.headerTabs = (tabName: HeaderTabs) => page.locator('div[class="navbar__items"] a').filter({ hasText: tabName });
        this.languageDropdownOptions = (option: LanguageDropdownOptions) => page.locator('ul[class="dropdown__menu"] a').filter({ hasText: option });
    }


    // Public Methods
    public async openTab(tab: HeaderTabs) {
        await this.headerTabs(tab).click();

        await expect(this.headerTabs(tab)).toHaveAttribute('aria-current', 'page');
    }

    public async selectLanguage(language: LanguageDropdownOptions) {
        await this.languageDropdown.click();
        await this.languageDropdownOptions(language).click();

        await expect(this.languageDropdown).toHaveText(language);
    }
}
