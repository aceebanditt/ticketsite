export function transformVenueData(data: any) {
  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    city: data.city?.name,
    state: data.state?.stateCode,
    country: data.country?.countryCode,
    address: data.address?.line1,
    location: {
      latitude: data.location?.latitude,
      longitude: data.location?.longitude
    },
    capacity: data.capacity,
    images: data.images?.map((img: any) => ({
      url: img.url,
      ratio: img.ratio,
      width: img.width,
      height: img.height
    })) || [],
    generalInfo: data.generalInfo?.generalRule,
    accessibleSeatingDetail: data.accessibleSeatingDetail,
    parkingDetail: data.parkingDetail,
    boxOfficeInfo: data.boxOfficeInfo ? {
      phoneNumber: data.boxOfficeInfo.phoneNumberDetail,
      openHours: data.boxOfficeInfo.openHoursDetail,
      acceptedPayments: data.boxOfficeInfo.acceptedPaymentDetail
    } : null,
    social: {
      twitter: data.social?.twitter?.handle,
      facebook: data.social?.facebook?.handle
    },
    url: data.url
  };
}