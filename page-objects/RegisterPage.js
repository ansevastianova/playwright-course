import { v4 as uuidv4 } from "uuid"

export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder("E-mail")
        this.passwordInput = page.getByPlaceholder("Password")
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    signUpAsNewUser = async () => {
        const email = uuidv4() + "@nastya.com"
        const password = uuidv4()
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.registerButton.click()
    }
}