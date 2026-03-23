import { test } from "@playwright/test"

import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout } from "../page-objects/Checkout"
import { Login } from "../page-objects/Login"
import { RegisterPage } from "../page-objects/RegisterPage"
import { DeliveryDetails } from "../page-objects/DeliveryDetails"
import { Payment } from "../page-objects/Payment"
import { deliveryDetails as userAddress } from "../data/deliveryDetails"
import { paymentDetails as cardInfo } from "../data/paymentDetails"

test("New user full end-to-end test journey", async ({ page }) => {
const productsPage = new ProductsPage(page)
await productsPage.visit()
await productsPage.sortByCheapest()

await productsPage.addProductToBasket(0)
await productsPage.addProductToBasket(1)
await productsPage.addProductToBasket(2)

const navigation = new Navigation(page)
await navigation.goToCheckout()

const checkout = new Checkout(page)
await checkout.removeCheapestProduct()
await checkout.continueToCheckout()

const login = new Login(page)
await login.continueToSignUp()

const registerPage = new RegisterPage(page)
await registerPage.signUpAsNewUser()

const deliveryDetails = new DeliveryDetails(page)
await deliveryDetails.enterDeliveryDetails(userAddress)
await deliveryDetails.saveDetails()
await deliveryDetails.continueToPayment()

const payment = new Payment(page)
await payment.activateDiscount()
await payment.fillCardInfo(cardInfo)
await payment.makePayment()

}
)