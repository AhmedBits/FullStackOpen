const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'example',
        username: 'test user',
        password: 'hello'
      }
    })
    
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('test user')
      await page.getByTestId('password').fill('hello')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('example logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('user test')
      await page.getByTestId('password').fill('goodbye')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Invalid Username/Password')).toBeVisible()
      
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })
})