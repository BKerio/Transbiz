import { Zap, Leaf, Battery, VolumeX, Wrench, Car, Bus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Zap,
    title: "Instant Power",
    description: "Zero to 100 in seconds with instant torque delivery",
  },
  {
    icon: Leaf,
    title: "Zero Emissions",
    description: "100% clean energy, zero tailpipe emissions",
  },
  {
    icon: Battery,
    title: "Long Range",
    description: "Up to 550km per charge - go further",
  },
  {
    icon: VolumeX,
    title: "Silent Drive",
    description: "Whisper-quiet ride for peaceful journeys",
  },
  {
    icon: Wrench,
    title: "Low Maintenance",
    description: "Fewer moving parts, less to worry about",
  },
  {
    icon: Car,
    title: "Taxi Efficient",
    description: "Lower costs, higher profits for taxi operators",
  },
  {
    icon: Bus,
    title: "Matatu Efficient",
    description: "Electric PSVs for modern, profitable routes",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What charging options are available across Africa?",
    answer: "Transbiz is actively expanding charging infrastructure across East Africa. We offer home charging solutions, workplace charging, and public charging stations in major cities. Our network is growing rapidly, with plans to install fast-charging stations along major highways and in urban centers throughout Kenya, Uganda, and Tanzania.",
  },
  {
    question: "How long does the battery last before replacement?",
    answer: "Our EV batteries are designed to last 8-10 years or approximately 500,000 km under normal operating conditions. Battery degradation is minimal, with most batteries retaining 80%+ capacity after 8 years of use. We also offer battery health monitoring and warranty programs for added peace of mind.",
  },
  {
    question: "What are the maintenance costs compared to petrol cars?",
    answer: "Electric vehicles typically cost 40-60% less to maintain than petrol vehicles. EVs have fewer moving parts - no engine oil changes, no spark plugs, no exhaust systems, and reduced brake wear due to regenerative braking. This translates to significant savings over the lifetime of the vehicle.",
  },
  {
    question: "Do you offer financing or leasing options?",
    answer: "Yes! Transbiz partners with leading financial institutions to offer flexible financing and leasing options. Our EV leasing program is particularly popular with taxi and matatu operators, allowing them to transition to electric without high upfront costs. Contact our sales team to learn about current financing rates.",
  },
  {
    question: "Can I charge the vehicle at home with regular electricity?",
    answer: "Absolutely. All our vehicles can be charged using standard 240V household outlets, though we recommend installing a dedicated home charging station for faster charging. A full charge from a standard outlet takes 8-12 hours, while a home wallbox charger can reduce this to 4-6 hours.",
  },
  {
    question: "What warranty and after-sales service do you provide?",
    answer: "All Transbiz vehicles come with a comprehensive warranty: 5 years/100,000 km vehicle warranty and 8 years/200,000 km battery warranty. We have authorized service centers in Nairobi with trained EV technicians, and we offer 24/7 roadside assistance, genuine spare parts, and regular software updates.",
  },
];

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "ev-geopolitics",
    title: "The Importance of Electric Vehicles in the Era of Escalating US-Iran Tensions",
    category: "Energy Security",
    date: "Apr 2026",
    readTime: "6 min read",
    excerpt: "As global energy markets face severe disruption, EVs emerge as a strategic necessity for energy security, economic resilience, and personal financial protection.",
    image: "/images/article-ev-geopolitics.jpg",
  },
  {
    id: "battery-life",
    title: "How to Maximize Your EV Battery Life",
    category: "Battery Care",
    date: "Jan 2026",
    readTime: "5 min read",
    excerpt: "Learn the best practices for charging, storage, and daily use to extend your battery's lifespan by up to 30%.",
    image: "/images/article-battery-life.jpg",
  },
  {
    id: "maintenance",
    title: "Essential EV Maintenance Checklist",
    category: "Maintenance",
    date: "Jan 2026",
    readTime: "7 min read",
    excerpt: "Unlike petrol cars, EVs require less maintenance. Here's what you need to check monthly, quarterly, and annually.",
    image: "/images/article-maintenance.jpg",
  },
  {
    id: "home-charging",
    title: "Home Charging Setup Guide",
    category: "Charging",
    date: "Dec 2025",
    readTime: "8 min read",
    excerpt: "Everything you need to know about installing a home charging station - costs, requirements, and best practices.",
    image: "/images/article-home-charging.jpg",
  },
  {
    id: "hot-weather",
    title: "Driving Your EV in Hot African Weather",
    category: "Climate Tips",
    date: "Dec 2025",
    readTime: "4 min read",
    excerpt: "Tips for maintaining optimal range and battery health during Kenya's hot seasons and high-temperature conditions.",
    image: "/images/article-hot-weather.jpg",
  },
  {
    id: "tyres",
    title: "EV Tyre Care and Rotation Guide",
    category: "Tyres & Brakes",
    date: "Nov 2025",
    readTime: "6 min read",
    excerpt: "EVs are heavier than traditional cars. Learn how to properly maintain your tyres for safety and efficiency.",
    image: "/images/article-tyres.jpg",
  },
  {
    id: "range-tips",
    title: "10 Ways to Extend Your Driving Range",
    category: "Tips & Tricks",
    date: "Nov 2025",
    readTime: "5 min read",
    excerpt: "Simple driving habits and settings adjustments that can help you get the most kilometers out of every charge.",
    image: "/images/article-range-tips.jpg",
  },
];
