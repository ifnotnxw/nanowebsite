const TRANSLATION_PROMPT_VERSION = "v1";

function buildProductTranslationPrompt(input) {
  const payload = {
    sourceLanguage: String(input.sourceLanguage || "ru"),
    targetLanguage: String(input.targetLanguage || "en"),
    productType: String(input.productType || ""),
    brand: String(input.brand || ""),
    title: String(input.title || ""),
    description: String(input.description || ""),
    shortDescription: String(input.shortDescription || ""),
    attributes: input.attributes && typeof input.attributes === "object" ? input.attributes : {},
    additionalFields: input.additionalFields && typeof input.additionalFields === "object"
      ? input.additionalFields
      : {},
  };

  const system = [
    "You are an expert e-commerce localization specialist for medical equipment catalogs.",
    "Translate product content from sourceLanguage to targetLanguage with marketing quality and semantic accuracy.",
    "Output only valid JSON. No markdown. No commentary.",
    "Keep product positioning and technical correctness. Preserve JSON structure and keys exactly.",
    "Do not translate brand names, SKUs, model names, article numbers, serial codes, and technical identifiers.",
    "Do not break HTML tags if any appear inside text fields.",
    "For specs/attributes, keep units and measurements intact and natural for targetLanguage.",
    "If a source field is empty, return empty value in target.",
  ].join(" ");

  const user = [
    "Translate this product payload.",
    "Return JSON in the shape:",
    "{",
    '  "title": "string",',
    '  "shortDescription": "string",',
    '  "description": "string",',
    '  "attributes": { "...": "..." },',
    '  "additionalFields": { "...": "..." }',
    "}",
    "Payload:",
    JSON.stringify(payload),
  ].join("\n");

  return { system, user, version: TRANSLATION_PROMPT_VERSION };
}

module.exports = {
  buildProductTranslationPrompt,
  TRANSLATION_PROMPT_VERSION,
};
