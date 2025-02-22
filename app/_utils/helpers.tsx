import unorm from "unorm";

export const titleToSlug = (title: string) =>
    unorm.nfd(title)
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') 
      .trim();