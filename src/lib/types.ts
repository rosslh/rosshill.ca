export type PostDate = {
  start: string; // needs to be serialized as a string, not a Date object
  end?: string;
  isOngoing: boolean;
  isSeasonal: boolean;
};

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
};

export type PostItemStub = PostItemBase & {
  eventType: PostCategory;
  hasContent: boolean;
  isLeftAligned?: boolean;
  showYearLabel?: boolean;
  thumbnail: {
    name: string;
    extension: string;
    showBorder: boolean;
  };
};

export type PostItemPage = PostItemBase & {
  contents: string;
  embed?: string;
  image?: {
    name: string;
    extension: string;
  };
};

export type TagColor = {
  fg: string;
  bg: string;
  outlineOnLight: boolean;
  outlineOnDark: boolean;
};

export type TagColors = Record<string, TagColor>;

export enum SiteTheme {
  Light = "light",
  Dark = "dark",
  System = "system",
  Cyberpunk = "cyberpunk",
}
