import { test, expect } from "@playwright/test";

test.describe("Login Functionality", () => {
  test.beforeEach("Go to login page and check login page", async ({ page }) => {
    //1. Go to login page and check login page displayed or not
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
    await expect(page.locator("#btn-make-appointment")).toContainText(
      "Make Appointment"
    );
    //2. Click Make Appointment button on home page
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Should allow login for valid credentials", async ({ page }) => {
    //1. Enter valid credentials
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //2. Check home page displayed or not
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("should prevent login for invalid credentials", async ({ page }) => {
    //1. Enter invalid credentials
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("12323");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("2354234");
    await page.getByRole("button", { name: "Login" }).click();

    //2. Verify error message displayed or not
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
