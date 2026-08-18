export const formatPrice = (price) => {
  if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lakh`;
  if (price >= 1000) return `₹ ${(price / 1000).toFixed(0)}K`;
  return `₹ ${price}`;
};

export const formatKm = (km) => {
  return km.toLocaleString('en-IN') + ' km';
};

export const getInitials = (title) => {
  return title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
};