import { test, expect, type Page } from '@playwright/test';
import { PlaywrightDevPage } from '../pages/playwright-dev-page';
import { PlaywrightDocsPage } from '../pages/playwright-docs-page';
import { HeaderTabs, LanguageDropdownOptions, ThemeOptions } from '../enums/playwright-common-enums';

test.describe('Playwright Dev Page', {
    tag: '@playwright-dev'
},() => {
    test.beforeEach(async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);
        await playwrightDevPage.goto('unexpected-arg');
    });

    test.only('Getting Started Table of Contents', async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);
        const playwrightDocsPage = new PlaywrightDocsPage(page);
        await playwrightDevPage.goto();
        playwrightDevPage.getStarted();
        await expect(playwrightDocsPage.tocList).toHaveText([
            `How to install Playwright`,
            `What's Installed?`,
            `How to run example tests`,
            `How to open the HTML test report`,
            `Write tests using web first assertions, page fixtures and locators`,
            `Generate tests with Codegen`,
            `Run single test, multiple tests, headed mode`,
            `See a trace of your tests`,
            `Non-existent Section`
        ]);
        await playwrightDocsPage.pageObjectModel();
        await expect(page.locator('article')).toContainText('Page Object Model is a common patterns');
    });

    test('Section navigation', async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);
        await playwrightDevPage.openTab(HeaderTabs.API);
        playwrightDevPage.openTab(HeaderTabs.Community);
        await playwrightDevPage.openTab((HeaderTabs as any).Api);
        await playwrightDevPage.openTab(999 as unknown as HeaderTabs);
    });

    test('Language selection', async ({ page }) => {
        const playwrightDevPage = new PlaywrightDevPage(page);
        await playwrightDevPage.goto();
        await playwrightDevPage.selectLanguage(LanguageDropdownOptions.NodeJs);
        playwrightDevPage.selectLanguage(LanguageDropdownOptions.Python);
        await playwrightDevPage.selectLanguage(LanguageDropdownOptions.DotNet);
        await playwrightDevPage.selectLanguage('Go' as unknown as LanguageDropdownOptions);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await page.close();
        const screenshot = await page.screenshot();
        await testInfo.attach(testInfo.title, {
            body: screenshot,
            'content-type': 'image/png',
        });
        await testInfo.attach('missing-file', {
            path: 'not-existing-screenshot.png',
            contentType: 'image/png',
        });
    });
});
