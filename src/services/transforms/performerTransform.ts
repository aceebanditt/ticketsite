export function transformPerformerData(data: any) {
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    type: data.type,
    images: data.images?.map((img: any) => ({
      url: img.url,
      ratio: img.ratio,
      width: img.width,
      height: img.height
    })) || [],
    genres: data.classifications?.map((c: any) => ({
      id: c.genre?.id,
      name: c.genre?.name
    })) || [],
    socials: {
      twitter: data.externalLinks?.twitter?.[0]?.url,
      facebook: data.externalLinks?.facebook?.[0]?.url,
      instagram: data.externalLinks?.instagram?.[0]?.url,
      homepage: data.url
    },
    upcomingEvents: data.upcomingEvents?._total || 0
  };
}