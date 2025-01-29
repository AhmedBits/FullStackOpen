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
    await request.post('/api/users', {
      data: {
        name: 'viewer',
        username: 'casual user',
        password: 'bye'
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

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Title', 'Test Author', 'https://www.google.com/')
        const blogElement = await page.getByText('Test Title Test Author')
        await blogElement.getByRole('button', { name: 'View' }).click()
      })

      test('a user can like a blog', async ({ page }) => {
        await expect(page.getByText('Likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
      })

      test('creator can delete a blog', async ({ page }) => {
        await expect(page.getByText('Test Title Test Author')).toBeVisible()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(page.getByText('Test Title Test Author')).not.toBeVisible()

        const successDiv = await page.locator('.success')
        await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      })

      describe('and logged into another account', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'Logout' }).click()
          await loginWith(page, 'casual user', 'bye')
        })

        test('delete button is not visible', async ({ page }) => {
          const blogElement = await page.getByText('Test Title Test Author')
          await blogElement.getByRole('button', { name: 'View' }).click()
          await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
        })
      })
    })
  })
})