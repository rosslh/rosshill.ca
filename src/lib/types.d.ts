export interface PostDate {
  start: string; // needs to be serialized as a string, not a Date object
  end?: string;
  isOngoing: boolean;
  isSeasonal: boolean;
}

export type PostCategory = "job" | "project" | "other";

export interface PostItem {
  contents?: string;
  date: PostDate,
  embed?: string;
  eventType?: PostCategory;
  excerpt?: string;
  hasContent?: boolean;
  image?: {
    name: string;
    extension: string;
  };
  isLeftAligned?: boolean;
  repository?: string;
  showYearLabel?: boolean;
  slug: string;
  tags: string[];
  thumbnail: {
    name: string;
    extension: string;
  };
  title: string;
  website?: string;
}

export interface BrandColors {
  [brand: string]: {
    fg: string,
    bg: string
    outlineOnLight: boolean,
    outlineOnDark: boolean
  }
}

export type SiteTheme = "light" | "dark" | "system";
