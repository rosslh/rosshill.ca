export type PostDate = {
  start: string; // needs to be serialized as a string, not a Date object
  end?: string;
  isOngoing: boolean;
  isSeasonal: boolean;
}

export type PostCategory = "job" | "project" | "other";

type PostItemBase = {
  date: PostDate;
  excerpt: string;
  repository?: string;
  website?: string;
  title: string;
  tags: string[];
  slug: string;
}

export type PostItemStub = PostItemBase & {
  eventType: PostCategory;
  hasContent: boolean;
  isLeftAligned?: boolean;
  showYearLabel?: boolean;
  thumbnail: {
    name: string;
    extension: string;
  };
}

export type PostItemPage = PostItemBase & {
  contents: string;
  embed?: string;
  image?: {
    name: string;
    extension: string;
  };
}

export type BrandColors = {
  [brand: string]: {
    fg: string,
    bg: string
    outlineOnLight: boolean,
    outlineOnDark: boolean
  }
}

export type SiteTheme = "light" | "dark" | "system";
