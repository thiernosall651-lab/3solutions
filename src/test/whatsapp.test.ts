import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, CONTACTS } from "@/lib/i18n";

const d = { name: "Awa", company: "", service: "Site web", message: "Bonjour" };

describe("WhatsApp contact", () => {
  it("Morocco line 1 goes to 212696661247", () => {
    expect(buildWhatsAppUrl("ma1", d, "fr")).toMatch(/^https:\/\/wa\.me\/212696661247\?text=/);
  });
  it("Morocco line 2 goes to 212684772957", () => {
    expect(buildWhatsAppUrl("ma2", d, "fr")).toMatch(/^https:\/\/wa\.me\/212684772957\?text=/);
  });
  it("Senegal goes to 221788240592", () => {
    expect(CONTACTS.sn.url).toBe("https://wa.me/221788240592");
    expect(buildWhatsAppUrl("sn", d, "fr")).toMatch(/^https:\/\/wa\.me\/221788240592\?text=/);
  });
});
