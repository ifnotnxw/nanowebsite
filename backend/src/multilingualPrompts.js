const MULTILINGUAL_PROMPT_VERSION = "ml-v1";

function buildEntityTranslationPrompt(input) {
  const payload = {
    entityType: String(input.entityType || "products"),
    sourceLanguage: String(input.sourceLanguage || "ru"),
    targetLanguage: String(input.targetLanguage || "en"),
    canonicalBrandNames: Array.isArray(input.canonicalBrandNames) ? input.canonicalBrandNames : [],
    content: input.content && typeof input.content === "object" ? input.content : {},
  };

  const system = [
    "You are an expert multilingual localization engine for e-commerce medical catalogs.",
    "Translate content with natural commercial language and strict semantic fidelity.",
    "Return only strict JSON, no markdown and no extra keys.",
    "Preserve HTML tags and rich text structure exactly.",
    "Never translate SKU/article/model/serial/technical codes/IDs.",
    "Do not alter canonical brand names from canonicalBrandNames.",
    "Keep units, dimensions, dosage values, standards, and technical terminology precise.",
    "For missing source fields, keep target fields empty.",
  ].join(" ");

  const user = [
    "Translate the payload from sourceLanguage to targetLanguage.",
    "Output JSON with the exact same shape as content object.",
    "Payload:",
    JSON.stringify(payload),
  ].join("\n");

  return { system, user, version: MULTILINGUAL_PROMPT_VERSION };
}

function buildUiDictionaryPrompt(input) {
  const payload = {
    sourceLanguage: String(input.sourceLanguage || "ru"),
    targetLanguage: String(input.targetLanguage || "en"),
    entries: input.entries && typeof input.entries === "object" ? input.entries : {},
  };
  const system = [
    "You localize UI copy for production websites.",
    "Translate labels/buttons/placeholders in a concise natural style.",
    "Return only strict JSON object: key -> translated text.",
    "Preserve placeholders and template tokens like {year}, {count}, %s exactly.",
  ].join(" ");
  const user = ["Translate UI dictionary entries:", JSON.stringify(payload)].join("\n");
  return { system, user, version: MULTILINGUAL_PROMPT_VERSION };
}

module.exports = {
  MULTILINGUAL_PROMPT_VERSION,
  buildEntityTranslationPrompt,
  buildUiDictionaryPrompt,
};
