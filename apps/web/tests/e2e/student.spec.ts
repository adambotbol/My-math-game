import { test, expect } from "@playwright/test";

test.describe("Parcours élève", () => {
  test("complète une leçon et voit ses récompenses", async ({ page }) => {
    test.skip(true, "TODO: nécessite le backend Supabase en fonctionnement");

    await page.goto("http://localhost:3000/(app)");
    await expect(page.getByRole("heading", { name: "Salut" })).toBeVisible();
    await page.getByRole("link", { name: "Carte des unités" }).click();
    await page.getByRole("link", { name: /Opérations simples/ }).click();
    await page.getByRole("link", { name: "Commencer la pratique" }).click();
    await page.getByRole("button", { name: "Valider" }).first().click();
    await expect(page.getByText("XP")).toBeVisible();
  });
});
