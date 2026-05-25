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
  content: string[];
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
    content: [
      "The escalation of US-Iran tensions has once again exposed the vulnerability of global energy markets to geopolitical shocks. With crude oil prices showing heightened volatility, importing nations across Africa are facing the immediate threat of fuel inflation, which directly impacts transport costs, commodity prices, and overall cost of living.",
      "For Kenya and the wider East African region, this volatility underscores the critical importance of transitioning to electric mobility. By decoupling public and commercial transportation from imported fossil fuels, the country can build a resilient energy economy powered by its own abundant, domestic, renewable energy sources like geothermal, hydro, and wind.",
      "Electric vehicles (EVs) are no longer just an environmental aspiration; they are a national strategic necessity. For fleet operators, taxi drivers, and daily commuters, making the switch to electricity offers a powerful buffer against global oil price spikes, ensuring predictable operating costs and long-term financial stability."
    ]
  },
  {
    id: "battery-life",
    title: "How to Maximize Your EV Battery Life",
    category: "Battery Care",
    date: "Jan 2026",
    readTime: "5 min read",
    excerpt: "Learn the best practices for charging, storage, and daily use to extend your battery's lifespan by up to 30%.",
    image: "/images/article-battery-life.jpg",
    content: [
      "The battery is the heart of any electric vehicle, and proper care can significantly extend its operational lifespan. Modern lithium-ion batteries are robust, but they perform best when kept within optimal temperature and state-of-charge ranges.",
      "To maximize battery longevity, avoid keeping the vehicle at 100% charge or allowing it to drop to 0% for extended periods. Operating in the 20% to 80% range is ideal for daily commuting. Only charge to 100% when preparing for a long-distance trip.",
      "Additionally, minimize frequent use of DC fast chargers, as the high current generates heat that can stress the battery chemistry over time. Standard AC charging (such as home wallboxes) is gentler on the cells. Finally, park in shady areas when possible to prevent battery exposure to extreme ambient heat."
    ]
  },
  {
    id: "maintenance",
    title: "Essential EV Maintenance Checklist",
    category: "Maintenance",
    date: "Jan 2026",
    readTime: "7 min read",
    excerpt: "Unlike petrol cars, EVs require less maintenance. Here's what you need to check monthly, quarterly, and annually.",
    image: "/images/article-maintenance.jpg",
    content: [
      "One of the greatest benefits of owning an EV is the simplicity of its drivetrain. With over 20 times fewer moving parts than an internal combustion engine, electric vehicles eliminate the need for oil changes, spark plugs, timing belts, and exhaust repairs.",
      "However, EVs still require routine care to ensure safety and peak performance. Monthly checks should include inspecting tyre pressure and tread depth, as the instant torque and heavier weight of EVs can accelerate tyre wear. Ensure windshield wiper fluid and brake fluid levels are optimal.",
      "Quarterly and annual checks should focus on the cabin air filter, coolant levels for the battery thermal management system, and suspension components. Regenerative braking reduces physical brake pad wear, but pads should still be inspected periodically for thickness and lubrication."
    ]
  },
  {
    id: "home-charging",
    title: "Home Charging Setup Guide",
    category: "Charging",
    date: "Dec 2025",
    readTime: "8 min read",
    excerpt: "Everything you need to know about installing a home charging station - costs, requirements, and best practices.",
    image: "/images/article-home-charging.jpg",
    content: [
      "Charging your electric vehicle at home is both convenient and highly cost-effective, particularly when utilizing off-peak electricity rates. Setting up a home charging station requires basic electrical preparation and selecting the right charger.",
      "While all Transbiz vehicles can be charged from a standard 240V household socket (Level 1), this method is slow. We highly recommend installing a dedicated 7.4kW Smart Wallbox (Level 2). This cuts charging time in half, taking a vehicle from empty to full in 6 to 8 hours.",
      "Before installation, ensure your home has a dedicated circuit breaker with appropriate amperage (usually 32A). A certified electrician should assess your home's electrical capacity and install the wallbox with built-in surge protection to safeguard your vehicle against voltage fluctuations."
    ]
  },
  {
    id: "hot-weather",
    title: "Driving Your EV in Hot African Weather",
    category: "Climate Tips",
    date: "Dec 2025",
    readTime: "4 min read",
    excerpt: "Tips for maintaining optimal range and battery health during Kenya's hot seasons and high-temperature conditions.",
    image: "/images/article-hot-weather.jpg",
    content: [
      "East African climates can present unique operating conditions for electric vehicles. High ambient temperatures can affect battery performance, charging speeds, and overall range if not managed correctly.",
      "Transbiz vehicles are equipped with active liquid cooling systems that keep the battery pack within its ideal temperature range. To assist this system, try to charge your vehicle during the cooler hours of the night or in covered parking bays away from direct sunlight.",
      "When driving in hot weather, precool the cabin while the vehicle is still plugged into the charger. This uses grid energy rather than battery energy for the initial cooldown, preserving your range for the road. Additionally, maintain moderate speeds to prevent excess heat buildup in the battery and tyres."
    ]
  },
  {
    id: "tyres",
    title: "EV Tyre Care and Rotation Guide",
    category: "Tyres & Brakes",
    date: "Nov 2025",
    readTime: "6 min read",
    excerpt: "EVs are heavier than traditional cars. Learn how to properly maintain your tyres for safety and efficiency.",
    image: "/images/article-tyres.jpg",
    content: [
      "Electric vehicles place unique demands on tyres due to two main factors: instant torque delivery and increased vehicle weight from the battery pack. Consequently, standard passenger tyres will wear out much faster on an EV.",
      "To ensure safety and maximize tyre life, it is essential to use EV-specific tyres. These tyres are engineered with reinforced sidewalls, specialized tread compounds, and optimized patterns that handle the heavy load and reduce rolling resistance for better range.",
      "Regular tyre rotation is critical. We recommend rotating your tyres every 8,000 to 10,000 kilometers to ensure even wear. Maintain the manufacturer-recommended tyre pressure; under-inflated tyres increase rolling resistance, which reduces battery range and accelerates tread wear."
    ]
  },
  {
    id: "range-tips",
    title: "10 Ways to Extend Your Driving Range",
    category: "Tips & Tricks",
    date: "Nov 2025",
    readTime: "5 min read",
    excerpt: "Simple driving habits and settings adjustments that can help you get the most kilometers out of every charge.",
    image: "/images/article-range-tips.jpg",
    content: [
      "Maximizing your driving range is all about efficiency and smooth driving habits. With a few simple adjustments, you can unlock extra kilometers from every charge.",
      "First, make full use of regenerative braking. Anticipate stops and lift off the accelerator early, allowing the electric motor to slow the vehicle down and funnel energy back into the battery. Second, drive smoothly: avoid aggressive acceleration and maintain a steady speed on highways.",
      "Third, optimize your climate control usage. Using the eco-mode for air conditioning or slightly lowering the fan speed can save significant power. Finally, ensure your vehicle is aerodynamically clean by removing unused roof racks and keeping windows closed at high speeds to reduce drag."
    ]
  },
  {
    id: "kenya-ev-growth",
    title: "EV Infrastructure Growth in Kenya",
    category: "Industry News",
    date: "May 2026",
    readTime: "5 min read",
    excerpt: "Kenya is witnessing an unprecedented boom in electric vehicle adoption and charging infrastructure. Here's a look at the key drivers behind this shift.",
    image: "/images/story-green-future.jpg",
    content: [
      "The electric vehicle landscape in Kenya is evolving at an unprecedented pace, driven by progressive policies, private sector investment, and a growing consumer demand for cheaper transport alternatives.",
      "With grid electricity in Kenya being over 90% renewable (largely geothermal and hydro), EVs represent a genuinely clean transport solution. The government has introduced tax incentives, including reduced excise duties on electric vehicles and parts, making them increasingly competitive with fossil-fuel cars.",
      "Private charging networks are expanding rapidly, with fast-charging hubs appearing in shopping malls, commercial buildings, and key transport corridors. This infrastructure expansion is boosting buyer confidence and laying the groundwork for mass EV adoption across the country."
    ]
  },
  {
    id: "leasing-vs-ownership",
    title: "Comparing EV Leasing vs. Ownership for Fleets",
    category: "Financing",
    date: "Mar 2026",
    readTime: "6 min read",
    excerpt: "For commercial fleet operators in East Africa, leasing offers significant tax advantages and lower upfront risks compared to outright purchase.",
    image: "/images/story-challenge.jpg",
    content: [
      "For businesses and commercial fleet operators, the financial structure of acquiring electric vehicles is a key consideration. Both direct ownership and leasing offer distinct advantages depending on business models.",
      "Leasing is highly popular because it eliminates the high upfront capital expenditure of buying an EV fleet. It also shifts the risk of technology obsolescence and battery degradation to the lessor. Lease payments are often fully tax-deductible as operating expenses, improving cash flow.",
      "On the other hand, direct ownership offers long-term cost benefits if the vehicles are operated over a long lifespan, as there are no ongoing monthly lease fees once paid off. Organizations must weigh upfront capital availability against operating cash flow preferences when choosing their fleet strategy."
    ]
  }
];
