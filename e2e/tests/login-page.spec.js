const { test, expect } = require('@playwright/test');

test('login page loads and shows the login form', async ({ page }) => {
  await page.goto('/login.html');

  await expect(page.locator('#email-input')).toBeVisible();
  await expect(page.locator('#password-input')).toBeVisible();
  await expect(page.locator('#sign-in-btn')).toBeVisible();
});
