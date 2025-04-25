import { test, expect } from "@playwright/test";
import * as searchPage from '../../modules/home.page';
import * as regionFilter from '../../modules/region-filter.component';

// 🐞 DuckDuckGo triggers a bot protection error in headless mode.
// For this test, we force headed mode to ensure consistent behavior in CI and local runs.
test.use({ headless: false });

test('Test Case 3 - validate korea region', async ({ page }) => {
    await page.goto('/');
    await searchPage.searchWithDuckDuckGo(page, 'android');

    await regionFilter.openRegionModal(page);
    await page.getByRole('textbox', { name: 'Search' }).fill('korea');
    await page.getByText('Korea').click();
});
