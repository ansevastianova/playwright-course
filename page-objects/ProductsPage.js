import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "../utils/isDesktopViewport"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }


    addProductToBasket = async ( index ) => {
       const specificAddButton = this.addButtons.nth(index)
       await specificAddButton.waitFor()
       await expect(specificAddButton).toHaveText("Add to Basket")
       const navigation = new Navigation(this.page)

       // only desktop viewport
       let basketCountBeforeAdding = 0
       if (isDesktopViewport(this.page)) {
        const basketCountBeforeAdding = await navigation.getBasketCount()
       }

       await specificAddButton.click()
       await expect(specificAddButton).toHaveText("Remove from Basket")
      
       // only desktop viewport
       if (isDesktopViewport(this.page)) {
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
       }
       

    }
    
    sortByCheapest = async () => {
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
    }






}