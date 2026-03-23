export class Login {
    constructor (page) {
        this.page = page

        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    continueToSignUp = async () => { 
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
        



    }
}