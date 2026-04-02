import { chromium } from 'playwright'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:5173'

async function collectVerification() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const consoleErrors = []
  const fontRequests = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  page.on('request', (req) => {
    const url = req.url()
    if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
      fontRequests.push(url)
    }
  })

  const out = {}

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
  out.homeHeading = await page.getByRole('heading', { level: 1 }).textContent()
  out.bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily)
  out.bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  out.bodyColor = await page.evaluate(() => getComputedStyle(document.body).color)
  out.mainBg = await page.evaluate(() =>
    getComputedStyle(document.querySelector('main')?.parentElement).backgroundColor
  )
  out.mainFlex = await page.evaluate(() => getComputedStyle(document.querySelector('main')).flex)
  out.mainWidthRatio = await page.evaluate(
    () => document.querySelector('main').getBoundingClientRect().width / window.innerWidth
  )
  out.navLinkColor = await page.evaluate(() => getComputedStyle(document.querySelector('nav a')).color)
  out.profileSrc = await page.locator('img[alt="Profile portrait"]').getAttribute('src')
  out.profileRadius = await page.evaluate(
    () => getComputedStyle(document.querySelector('img[alt="Profile portrait"]')).borderRadius
  )
  out.hasWorkedWith = await page.locator('text=Worked with').count()
  out.footerLinkedIn = await page.getByLabel('LinkedIn').count()
  out.footerGitHub = await page.getByLabel('GitHub').count()
  out.instagramCount = await page.locator('text=Instagram').count()
  out.privacyCount = await page.locator('text=Privacy Policy').count()
  out.h1Weight = await page.evaluate(() => getComputedStyle(document.querySelector('h1')).fontWeight)
  out.fontCheck = await page.evaluate(() => document.fonts.check('16px Manrope'))

  await page.goto(`${baseUrl}/about`, { waitUntil: 'networkidle' })
  out.aboutHeading = await page.getByRole('heading', { level: 1 }).textContent()

  await page.goto(`${baseUrl}/work`, { waitUntil: 'networkidle' })
  out.workHeading = await page.getByRole('heading', { level: 1 }).textContent()

  await page.goto(`${baseUrl}/contact`, { waitUntil: 'networkidle' })
  out.contactHeading = await page.getByRole('heading', { level: 1 }).textContent()

  await page.goto(`${baseUrl}/nonexistent`, { waitUntil: 'networkidle' })
  out.redirectUrl = page.url()
  out.redirectHeading = await page.getByRole('heading', { level: 1 }).textContent()

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } })
  await mobile.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
  out.mobileOverflow = await mobile.evaluate(() => document.body.scrollWidth === window.innerWidth)
  out.mobileHamburgerVisible = await mobile.locator('[aria-label="Open menu"]').isVisible()
  await mobile.locator('[aria-label="Open menu"]').click()
  out.mobileDrawerContactCount = await mobile.locator('text=Contact').count()
  await mobile.locator('a[href="/about"]').last().click()
  await mobile.waitForLoadState('networkidle')
  out.mobileNavUrl = mobile.url()

  out.consoleErrors = consoleErrors
  out.fontRequests = fontRequests

  await browser.close()
  return out
}

collectVerification()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2))
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
