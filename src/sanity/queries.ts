export const ALL_POSTS_QUERY = `
  *[_type == "post" && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "date": publishedAt,
    category,
    excerpt,
    "tags": coalesce(tags, []),
    readTime
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    "date": publishedAt,
    category,
    excerpt,
    "tags": coalesce(tags, []),
    readTime,
    body
  }
`;

export const ALL_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current) && defined(publishedAt)] {
    "slug": slug.current
  }
`;
