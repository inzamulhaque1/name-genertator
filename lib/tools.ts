export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: "identity" | "developer" | "text";
  keywords: string[];
}

export const TOOL_CATEGORIES = {
  identity: { label: "Identity Generators", icon: "👤" },
  developer: { label: "Developer Tools", icon: "🛠️" },
  text: { label: "Text & Design Tools", icon: "📝" },
};

export const tools: Tool[] = [
  // Identity Generators
  {
    slug: "fake-identity-generator",
    name: "Fake Identity Generator",
    description: "Generate complete fake identities with real addresses for testing",
    icon: "👤",
    category: "identity",
    keywords: ["fake identity generator", "fake person generator", "random identity"],
  },
  {
    slug: "name-generator",
    name: "Random Name Generator",
    description: "Generate random realistic names from multiple countries",
    icon: "📛",
    category: "identity",
    keywords: ["random name generator", "fake name generator"],
  },
  {
    slug: "random-address-generator",
    name: "Random Address Generator",
    description: "Generate real random addresses from around the world",
    icon: "📍",
    category: "identity",
    keywords: ["random address generator", "fake address generator"],
  },
  {
    slug: "credit-card-generator",
    name: "Credit Card Generator",
    description: "Generate valid test credit card numbers for development",
    icon: "💳",
    category: "identity",
    keywords: ["test credit card generator", "fake credit card number"],
  },
  {
    slug: "email-generator",
    name: "Email Generator",
    description: "Generate random email addresses for testing",
    icon: "📧",
    category: "identity",
    keywords: ["random email generator", "fake email address"],
  },
  {
    slug: "phone-number-generator",
    name: "Phone Number Generator",
    description: "Generate random phone numbers for any country",
    icon: "📱",
    category: "identity",
    keywords: ["random phone number generator", "fake phone number"],
  },
  {
    slug: "username-generator",
    name: "Username Generator",
    description: "Generate unique usernames for any platform",
    icon: "🏷️",
    category: "identity",
    keywords: ["username generator", "random username"],
  },
  {
    slug: "company-name-generator",
    name: "Company Name Generator",
    description: "Generate creative fake company names",
    icon: "🏢",
    category: "identity",
    keywords: ["company name generator", "business name generator"],
  },
  // Developer Tools
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUID/GUID values instantly",
    icon: "🔑",
    category: "developer",
    keywords: ["uuid generator", "guid generator"],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes",
    icon: "#️⃣",
    category: "developer",
    keywords: ["md5 hash generator", "sha256 generator"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    icon: "{}",
    category: "developer",
    keywords: ["json formatter", "json beautifier", "json validator"],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and dates",
    icon: "🕐",
    category: "developer",
    keywords: ["unix timestamp converter", "epoch converter"],
  },
  {
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL strings",
    icon: "🔗",
    category: "developer",
    keywords: ["url encode", "url decode"],
  },
  // Text & Design Tools
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure random passwords",
    icon: "🔒",
    category: "text",
    keywords: ["password generator", "strong password generator"],
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description: "Write and preview Markdown in real-time",
    icon: "📝",
    category: "text",
    keywords: ["markdown preview", "markdown editor online"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from any text or URL",
    icon: "📱",
    category: "text",
    keywords: ["qr code generator", "create qr code"],
  },
];

export function getToolsByCategory(category: Tool["category"]) {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(currentSlug: string, limit = 4): Tool[] {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return tools.slice(0, limit);
  const sameCategory = tools.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  );
  const others = tools.filter(
    (t) => t.category !== current.category && t.slug !== currentSlug
  );
  return [...sameCategory, ...others].slice(0, limit);
}
