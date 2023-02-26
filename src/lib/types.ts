export type PostDate = {
  start: string; // needs to be serialized as a string, not a Date object
  end?: string;
  isOngoing: boolean;
  isSeasonal: boolean;
}

export enum PostCategory {
  Job = "job",
  Project = "project",
  Other = "other",
}

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

export type BrandColor = {
  fg: string,
  bg: string
  outlineOnLight: boolean,
  outlineOnDark: boolean
}

export type BrandColors = Record<string, BrandColor>

export enum SiteTheme {
  Light = "light",
  Dark = "dark",
  System = "system",
}