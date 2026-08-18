export const sampleCars = [
  {
    id: 'car-sample-1',
    title: 'Hyundai Creta SX Diesel',
    brand: 'Hyundai',
    year: 2021,
    price: 1250000,
    km: 32000,
    fuel: 'Diesel',
    trans: 'Automatic',
    owner: '1st Owner',
    desc: 'Single owner, well maintained Creta SX with all service records available. Top model with sunroof, leather seats, touchscreen infotainment, and reverse camera. Pune registered, no accidents, alloy wheels, and front & rear parking sensors.',
    images: [
      'https://picsum.photos/seed/creta-front/1200/800.jpg',
      'https://picsum.photos/seed/creta-side/1200/800.jpg',
      'https://picsum.photos/seed/creta-interior/1200/800.jpg',
      'https://picsum.photos/seed/creta-rear/1200/800.jpg'
    ],
    createdAt: Date.now() - 1000000
  },
  {
    id: 'car-sample-2',
    title: 'Mahindra XUV700 AX7',
    brand: 'Mahindra',
    year: 2022,
    price: 2150000,
    km: 18500,
    fuel: 'Diesel',
    trans: 'Automatic',
    owner: '1st Owner',
    desc: 'Top variant XUV700 AX7 with ADAS features, dual panoramic sunroof, 12-speaker Sony 3D sound system, and driving modes. Company maintained, accident-free. Delhi registration, all features working perfectly.',
    images: [
      'https://picsum.photos/seed/xuv-front/1200/800.jpg',
      'https://picsum.photos/seed/xuv-side/1200/800.jpg',
      'https://picsum.photos/seed/xuv-dashboard/1200/800.jpg'
    ],
    createdAt: Date.now() - 2000000
  },
  {
    id: 'car-sample-3',
    title: 'Tata Nexon XZ+ Petrol',
    brand: 'Tata',
    year: 2020,
    price: 850000,
    km: 45000,
    fuel: 'Petrol',
    trans: 'Manual',
    owner: '1st Owner',
    desc: '5-star safety rated Nexon with sunroof, wireless CarPlay/Android Auto, reverse camera, and climate control. All 4 power windows, ABS with EBD, and dual airbags. Bangalore registered, well maintained.',
    images: [
      'https://picsum.photos/seed/nexon-front/1200/800.jpg',
      'https://picsum.photos/seed/nexon-side/1200/800.jpg',
      'https://picsum.photos/seed/nexon-interior/1200/800.jpg',
      'https://picsum.photos/seed/nexon-rear/1200/800.jpg'
    ],
    createdAt: Date.now() - 3000000
  },
  {
    id: 'car-sample-4',
    title: 'Kia Seltos HTX',
    brand: 'Kia',
    year: 2021,
    price: 1450000,
    km: 28000,
    fuel: 'Petrol',
    trans: 'CVT',
    owner: '1st Owner',
    desc: 'Kia Seltos HTX with 10.25-inch touchscreen, 8-speaker Bose sound system, smart pure air purifier, sunroof, and connected car features. Mumbai registered, scratchless condition, all service records available.',
    images: [
      'https://picsum.photos/seed/seltos-front/1200/800.jpg',
      'https://picsum.photos/seed/seltos-side/1200/800.jpg',
      'https://picsum.photos/seed/seltos-dashboard/1200/800.jpg'
    ],
    createdAt: Date.now() - 4000000
  }
];

export const getBrands = () => {
  return [...new Set(sampleCars.map(car => car.brand))].sort();
};

export const getFuelTypes = () => {
  return [...new Set(sampleCars.map(car => car.fuel))];
};