import { test, expect, type Page } from '@playwright/test';
import { PlaywrightDevPage } from '../pages/playwright-dev-page';
import { PlaywrightDocsPage } from '../pages/playwright-docs-page';
import { HeaderTabs, LanguageDropdownOptions } from '../enums/playwright-common-enums';

test.describe('Playwright Dev Page', {
    tag: '@playwright-dev'
},() => {
    test.beforeEach(async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);
        await playwrightDevPage.goto();
    });

    test('Getting Started Table of Contents', async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);
        const playwrightDocsPage = new PlaywrightDocsPage(page);

        await playwrightDevPage.goto();
        await playwrightDevPage.getStarted();
        await playwrightDocsPage.pageObjectModel();

        await expect(playwrightDocsPage.tocList).toHaveText([
            `How to install Playwright`,
            `What's Installed`,
            `How to run the example test`,
            `How to open the HTML test report`,
            `Write tests using web first assertions, page fixtures and locators`,
            `Run single test, multiple tests, headed mode`,
            `Generate tests with Codegen`,
            `See a trace of your tests`
        ]);
    });

    test('Section navigation', async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);

        await playwrightDevPage.goto();
        await playwrightDevPage.openTab(HeaderTabs.API);
        await playwrightDevPage.openTab(HeaderTabs.Community);
        await playwrightDevPage.openTab(HeaderTabs.Docs);
    });

    test('Language selection', async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);

        await playwrightDevPage.goto();
        await playwrightDevPage.selectLanguage(LanguageDropdownOptions.NodeJs);
        await playwrightDevPage.selectLanguage(LanguageDropdownOptions.Python);
        await playwrightDevPage.selectLanguage(LanguageDropdownOptions.DotNet);
        await playwrightDevPage.selectLanguage(LanguageDropdownOptions.Java);
    });

    test.afterEach(async ({ page }, testInfo) => {
        const screenshot = await page.screenshot();
        testInfo.attach(testInfo.title, {
            body: screenshot,
            contentType: 'image/png',
        });
    });
});