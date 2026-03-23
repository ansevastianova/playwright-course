import { isDesktopViewport } from "../utils/isDesktopViewport"

export class Navigation {
        constructor(page) {
        this.page = page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    }

        getBasketCount = async () => {
            const text = await this.basketCounter.innerText()
            // turn string into num "0" -> 0
            return parseInt(text, 10)
        }

        goToCheckout = async () => {
            if (!isDesktopViewport(this.page)) {
            await this.mobileBurgerButton.click()
       }
            
            await this.checkoutLink.click()
            await this.page.waitForURL("/basket")
        }
    
}