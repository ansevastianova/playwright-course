import { deliveryDetails } from "../data/deliveryDetails"
import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page    

        this.firstNameField = page.getByPlaceholder("First name")
        this.lastNameField = page.getByPlaceholder("Last name")
        this.streetField = page.getByPlaceholder("Street")
        this.postCodeField = page.getByPlaceholder("Post code")
        this.cityField = page.getByPlaceholder("City")
        this.countryField = page.getByRole('combobox')

        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })

        this.addressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedCity = page.locator('[data-qa="saved-address-city"]')
        this.savedCountry = page.locator('[class="saved-address-country"]')

        
    }

    enterDeliveryDetails = async (userAddress) => {
        await this.firstNameField.fill(userAddress.firstName)
        await this.lastNameField.fill(userAddress.lastName)
        await this.streetField.fill(userAddress.street)
        await this.postCodeField.fill(userAddress.postCode)
        await this.cityField.fill(userAddress.city)
        await this.countryField.selectOption(userAddress.country)

    }

    saveDetails = async ( ) => {
        const addressCountBeforeSaving = await this.addressContainer.count()
        await this.saveAddressButton.click()
        await this.addressContainer.waitFor()
        await expect(this.addressContainer).toHaveCount(addressCountBeforeSaving + 1)

        expect (await this.savedFirstName.first().innerText()).toBe(await this.firstNameField.inputValue())
        expect (await this.savedLastName.first().innerText()).toBe(await this.lastNameField.inputValue())
        expect (await this.savedStreet.first().innerText()).toBe(await this.streetField.inputValue())
        expect (await this.savedPostCode.first().innerText()).toBe(await this.postCodeField.inputValue())
        expect (await this.savedCity.first().innerText()).toBe(await this.cityField.inputValue())
        expect (await this.savedCountry.first().innerText()).toBe(await this.countryField.inputValue())
    }

    continueToPayment = async ( ) => {

    await this.continueToPaymentButton.click()
    await this.page.waitForURL(/\/payment/, {timeout: 3000})

    }
}