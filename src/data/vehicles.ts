export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: string;
  seats: number | string;
  range: string;
  battery: string;
  image: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "neta-v",
    name: "Neta V",
    brand: "NETA",
    category: "SUV",
    seats: 5,
    range: "400 km",
    battery: "38.6 KWH",
    image: "/images/vehicle-neta-v.jpg",
  },
  {
    id: "skyworth-k",
    name: "Skyworth K",
    brand: "Skyworth",
    category: "SUV",
    seats: 5,
    range: "620 km",
    battery: "86 KWH",
    image: "/images/vehicle-skyworth-k.jpg",
  },
  {
    id: "radar-rd6",
    name: "Radar RD6",
    brand: "Moja",
    category: "Pick Up",
    seats: 5,
    range: "461 km",
    battery: "73 KWH",
    image: "/images/vehicle-radar-rd6.jpg",
  },
  {
    id: "pioneer-mv5",
    name: "Pioneer MV5",
    brand: "Moja",
    category: "Matatu",
    seats: 14,
    range: "300-400 km",
    battery: "60-86 KWH",
    image: "/images/vehicle-pioneer-mv5.jpg",
  },
  {
    id: "city-bus-h1",
    name: "City Bus H1",
    brand: "Moja",
    category: "Bus",
    seats: "30+",
    range: "300 km",
    battery: "256 KWH",
    image: "/images/vehicle-city-bus.jpg",
  },
  {
    id: "neta-light",
    name: "Neta Light",
    brand: "NETA",
    category: "Minivan",
    seats: 4,
    range: "210 km",
    battery: "18 KWH",
    image: "/images/vehicle-neta-light.jpg",
  },
];

export const categories = ["All", "SUV", "Pick Up", "Minivan", "Matatu", "Bus"];
