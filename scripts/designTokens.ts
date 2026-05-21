export type ThemeName = "light" | "dark";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export function getCustomProperties(
  stylesheet: string,
): Record<string, string> {
  const properties: Record<string, string> = {};

  for (const match of stylesheet.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    const [, name, value] = match;

    if (name && value) {
      properties[name] = value.trim();
    }
  }

  return properties;
}

export function resolveCustomPropertyValue(
  value: string,
  customProperties: Record<string, string>,
  seen = new Set<string>(),
): string | undefined {
  const varMatch = value.match(/^var\((--[\w-]+)\)$/);
  const propertyName = varMatch?.[1];

  if (!propertyName) {
    return value;
  }

  if (seen.has(propertyName)) {
    return undefined;
  }

  const propertyValue = customProperties[propertyName];
  if (!propertyValue) {
    return undefined;
  }

  seen.add(propertyName);
  return resolveCustomPropertyValue(propertyValue, customProperties, seen);
}

export function getThemeCustomProperty(
  stylesheet: string,
  theme: ThemeName,
  propertyName: string,
): string | undefined {
  const customProperties = getCustomProperties(stylesheet);
  const mixinMatch = stylesheet.match(
    new RegExp(`@mixin\\s+${theme}-theme\\(\\)\\s*\\{([\\s\\S]*?)\\n\\}`),
  );
  const mixinBody = mixinMatch?.[1];
  const propertyMatch = mixinBody?.match(
    new RegExp(`${escapeRegExp(propertyName)}:\\s*([^;]+)\\s*;`),
  );
  const propertyValue = propertyMatch?.[1]?.trim();

  return propertyValue
    ? resolveCustomPropertyValue(propertyValue, customProperties)
    : undefined;
}

export function getThemeOklchProperty(
  stylesheet: string,
  theme: ThemeName,
  propertyName: string,
): string {
  const value = getThemeCustomProperty(stylesheet, theme, propertyName);

  if (!value || !/^oklch\([^)]+\)$/.test(value)) {
    throw new TypeError(
      `Expected ${propertyName} to resolve to oklch() in ${theme}-theme`,
    );
  }

  return value;
}
