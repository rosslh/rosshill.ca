export interface PostItem {
  blurb: string;
  content: string;
  contents: string;
  date: string;
  embed: string
  endDate: string;
  eventType: string;
  hasContent: boolean;
  image: string;
  imageExt: string;
  isLeftAligned: boolean;
  ongoing: boolean;
  repository: string;
  seasonal: boolean;
  showYearLabel: boolean;
  slug: string;
  tags: string[];
  thumbnail: string;
  thumbnailExt: string;
  title: string;
  website: string;
}

export interface BrandColors {
  [brand: string]: { foreground: string, background: string }
}
