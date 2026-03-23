import { expect, test } from "@playwright/test"

test.skip("Product Page Add to Basket", async ({ page }) => {
await page.goto("/")

const addToBasketButton = page.locator('[data-qa="product-button"]').first()
const headerBasketCount = page.locator('[data-qa="header-basket-count"]')


await expect(headerBasketCount).toHaveText("0")
await addToBasketButton.waitFor()
await expect(addToBasketButton).toHaveText("Add to Basket")

await addToBasketButton.click()
await expect(addToBasketButton).toHaveText("Remove from Basket")
await expect(headerBasketCount).toHaveText("1")

const checkoutLink = page.getByRole('link', { name: 'Checkout' })
await checkoutLink.click()
await page.waitForURL("/basket")
})