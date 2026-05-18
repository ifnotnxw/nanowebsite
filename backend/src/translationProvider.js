class TranslationProvider {
  async translateStructured(_request) {
    throw new Error("translateStructured is not implemented");
  }

  async translateProduct(_request) {
    return this.translateStructured(_request);
  }
}

class OpenAiTranslationProvider extends TranslationProvider {
  constructor(options = {}) {
    super();
    this.apiKey = String(options.apiKey || "");
    this.model = String(options.model || "gpt-4.1-mini");
    this.baseUrl = String(options.baseUrl || "https://api.openai.com/v1");
    this.timeoutMs = Number.isFinite(Number(options.timeoutMs)) ? Number(options.timeoutMs) : 45000;
  }

  async translateStructured(request) {
    if (!this.apiKey) {
      throw new Error("AI_TRANSLATION_API_KEY is not configured");
    }
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), this.timeoutMs);
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt },
          ],
        }),
        signal: ctrl.signal,
      });
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`OpenAI ${response.status}: ${body.slice(0, 600)}`);
      }
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("OpenAI response is empty");
      const parsed = JSON.parse(content);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("OpenAI response JSON is invalid");
      }
      return parsed;
    } finally {
      clearTimeout(timeout);
    }
  }
}

class DisabledTranslationProvider extends TranslationProvider {
  async translateStructured() {
    throw new Error("AI translation provider is disabled");
  }
}

function createTranslationProviderFromEnv() {
  const provider = String(process.env.AI_TRANSLATION_PROVIDER || "openai").toLowerCase();
  if (provider === "disabled" || provider === "off") {
    return new DisabledTranslationProvider();
  }
  if (provider === "openai") {
    return new OpenAiTranslationProvider({
      apiKey: process.env.AI_TRANSLATION_API_KEY,
      model: process.env.AI_TRANSLATION_MODEL || "gpt-4.1-mini",
      baseUrl: process.env.AI_TRANSLATION_BASE_URL || "https://api.openai.com/v1",
      timeoutMs: Number.parseInt(process.env.AI_TRANSLATION_TIMEOUT_MS || "45000", 10),
    });
  }
  throw new Error(`Unsupported AI translation provider: ${provider}`);
}

module.exports = {
  TranslationProvider,
  OpenAiTranslationProvider,
  DisabledTranslationProvider,
  createTranslationProviderFromEnv,
};
