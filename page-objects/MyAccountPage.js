export class MyAccountPage {
    constructor(page) { 
        this.page = page
        this.MyAccountHeading = page.getByRole('heading', { name: 'My Account' })
        this.errorHeading = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {

        await this.page.goto("/my-account")
    }

    waitForPageHeading = async () => {
        await this.MyAccountHeading.waitFor()
    }

    waitForErrorMessage = async () => {
        await this.errorHeading.waitFor()
    }

}