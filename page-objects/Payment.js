import { expect } from "@playwright/test"
import { paymetDetails } from "../data/paymentDetails"

export class Payment {
    constructor(page) { 
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountField = page.getByPlaceholder("Discount code")
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' })
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalWithDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')

        this.nameOnCardField = page.getByPlaceholder("Credit card owner")
        this.cardNumberField = page.getByPlaceholder("Credit card number")
        this.expiryDateField = page.getByPlaceholder("Valid until")
        this.cvcField = page.getByPlaceholder("Credit card CVC")    

        this.payButton = page.getByRole('button', { name: 'Pay' })
}

activateDiscount = async () => {
await this.discountCode.waitFor()

const code = await this.discountCode.innerText()

// Option 1 for laggy inputs:
await this.discountField.fill(code)
await expect(this.discountField).toHaveValue(code)

// Option 2: slow typing
// await this.discountField.focus()
// await this.page.keyboard.type(code, {delay: 1000})
// expect (await this.discountField.inputValue()).toBe(code)

await this.submitDiscountButton.click()
expect (await this.discountActivatedMessage.isVisible()).toBe(false)
await this.discountActivatedMessage.waitFor()
await this.totalWithDiscount.waitFor()

const discountedTotalText = await this.totalWithDiscount.innerText()
const discountedTotalOnlyNumber = discountedTotalText.replace("$", " ")
const discountedTotalInt = parseInt(discountedTotalOnlyNumber, 10) //turn into Int using decimal system (10)

const TotalText = await this.totalValue.innerText()
const TotalOnlyNumber = TotalText.replace("$", " ")
const TotalInt = parseInt(TotalOnlyNumber, 10)

expect(TotalInt).toBeGreaterThan(discountedTotalInt)
}

fillCardInfo = async (cardInfo) => {
await this.nameOnCardField.fill(cardInfo.name)
await this.cardNumberField.fill(cardInfo.card)
await this.expiryDateField.fill(cardInfo.expiry)
await this.cvcField.fill(cardInfo.cvc)
}

makePayment = async () => {
await this.payButton.click()
await this.page.waitForURL(/thank-you/)
}

}