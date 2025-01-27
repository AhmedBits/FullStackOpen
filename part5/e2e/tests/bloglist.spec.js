const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'test user', 'hello')
      await expect(page.getByText('example logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test user', 'wrong')
      await expect(page.getByText('Invalid Username/Password')).toBeVisible()
      
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test user', 'hello')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'https://www.google.com/')
      await expect(page.getByText('Test Title Test Author')).toBeVisible()

      const successDiv = await page.locator('.success')
      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
    })
  })
})