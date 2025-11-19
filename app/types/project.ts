export type Project = {
  id: number;
  title: string;
  thumbnail: string;
  format: '9:16' | '16:9' | '1:1';
  categories: string[];
  tools: string[];
  description: string;
  youtube_id: string;
  before_image?: string;
  after_image?: string;
};