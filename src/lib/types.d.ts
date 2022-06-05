export interface PostDate {
  start: string; // needs to be JSON serialized, not a JS object
  end?: string;
  isOngoing: boolean;
  isSeasonal: boolean;
}

export type PostType = "job" | "project" | "other";

export interface PostItem {
  contents?: string;
  date: PostDate,
  embed?: string;
  eventType?: PostType;
  excerpt?: string;
  hasContent?: boolean;
  image?: {
    name: string;
    extension: string;
    width: number;
    height: number;
    aspectRatio: number;
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
  [brand: string]: { foreground: string, background: string }
}

export type SiteTheme = "light" | "dark" | undefined;
