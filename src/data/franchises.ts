export interface Franchise {
  id: string
  slug: string
  name: string
  description: string
  image: string
  carIds: string[]
}

export const franchises: Franchise[] = [
  {
    id: "james-bond",
    slug: "james-bond",
    name: "James Bond",
    description: "The longest-running film franchise in history features 007 driving an array of iconic vehicles equipped with Q-branch gadgets. From the Aston Martin DB5 to the Lotus Esprit submarine car, Bond's cars are as legendary as the man himself.",
    image: "/images/franchises/james-bond.jpg",
    carIds: ["aston-martin-db5-1964", "lotus-esprit-1976", "mustang-mach-1-1971", "db10-2016"]
  },
  {
    id: "fast-and-furious",
    slug: "fast-and-furious",
    name: "Fast & Furious",
    description: "A franchise built on family, loyalty, and the roar of engines. Spanning over two decades, the Fast & Furious saga features everything from Japanese tuner cars to American muscle and European hypercars, with Dom's 1970 Dodge Charger at its heart.",
    image: "/images/franchises/fast-and-furious.jpg",
    carIds: ["supra-mk4-1995", "charger-rt-1970", "eclipse-1995", "skyline-r34-1999", "eclipse-spyder-2003", "rx7-1993", "chevelle-ss-1970", "camaro-z28-1969", "mclaren-720s-2017", "koenigsegg-ccxr-2010", "bugatti-veyron-2011", "de-tomaso-pantera-1972", "gran-torino-sport-1972", "civic-1992", "supra-mk4-1993", "s2000-2000", "silvia-s15-2001", "buick-grand-national-1987", "nissan-240sx-1997", "lancer-evo-7-2002", "nissan-gtr-2009", "mustang-gt350-2015", "challenger-srt-2011", "nissan-gtr-r35-2012"]
  },
  {
    id: "batman",
    slug: "batman",
    name: "Batman",
    description: "The Dark Knight has been defined by his vehicles as much as his costume. From the campy 1966 Lincoln Futura conversion to the Gothic 1989 jet turbine machine and the militarized Tumbler, each Batmobile reflects the era and tone of its Batman.",
    image: "/images/franchises/batman.jpg",
    carIds: ["batmobile-1966", "batmobile-1989", "tumbler-batmobile"]
  },
  {
    id: "transformers",
    slug: "transformers",
    name: "Transformers",
    description: "Robots in disguise from the planet Cybertron wage their war on Earth, taking the forms of Earth vehicles. Bumblebee's Chevrolet Camaro, Optimus Prime's Peterbilt truck, and many more vehicles become living characters in this epic sci-fi saga.",
    image: "/images/franchises/transformers.jpg",
    carIds: ["bumblebee-camaro-2007"]
  },
  {
    id: "mad-max",
    slug: "mad-max",
    name: "Mad Max",
    description: "In a post-apocalyptic wasteland where fuel is more precious than gold, vehicles are tools of survival and weapons of war. Max Rockatansky's Falcon Interceptor and the war rigs of Fury Road define automotive survival in the harshest of worlds.",
    image: "/images/franchises/mad-max.jpg",
    carIds: ["mad-max-falcon-1974", "xb-falcon-gt-1973"]
  },
  {
    id: "back-to-the-future",
    slug: "back-to-the-future",
    name: "Back to the Future",
    description: "Doc Brown's time-traveling DeLorean DMC-12 is the most famous science fiction vehicle ever created. Modified with a flux capacitor, Mr. Fusion, and the ability to reach 88 miles per hour, it transcends time and pop culture.",
    image: "/images/franchises/back-to-the-future.jpg",
    carIds: ["delorean-dmc-12"]
  },
  {
    id: "ghostbusters",
    slug: "ghostbusters",
    name: "Ghostbusters",
    description: "A team of parapsychologists turned ghost-catching entrepreneurs patrol New York City in the Ecto-1, a converted 1959 Cadillac Miller-Meteor ambulance. The vehicle is as essential to the Ghostbusters' identity as their proton packs and jumpsuits.",
    image: "/images/franchises/ghostbusters.jpg",
    carIds: ["ecto-1-1959"]
  },
  {
    id: "cars",
    slug: "cars",
    name: "Cars",
    description: "Pixar's anthropomorphic automotive world brings cars to life as characters with distinct personalities. Lightning McQueen, the red Piston Cup champion, learns that winning isn't everything and that friends and community matter most.",
    image: "/images/franchises/cars.jpg",
    carIds: ["lightning-mcqueen"]
  }
]
