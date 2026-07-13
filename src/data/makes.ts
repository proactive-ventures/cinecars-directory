export interface Make {
  id: string
  slug: string
  name: string
  country: string
  logo: string
  carIds: string[]
}

export const makes: Make[] = [
  {
    id: "aston-martin",
    slug: "aston-martin",
    name: "Aston Martin",
    country: "United Kingdom",
    logo: "/images/makes/aston-martin.svg",
    carIds: ["aston-martin-db5-1964", "db10-2016", "aston-martin-dbs-1969"]
  },
  {
    id: "audi",
    slug: "audi",
    name: "Audi",
    country: "Germany",
    logo: "/images/makes/audi.svg",
    carIds: ["audi-r8-2008"]
  },
  {
    id: "bmw",
    slug: "bmw",
    name: "BMW",
    country: "Germany",
    logo: "/images/makes/bmw.svg",
    carIds: []
  },
  {
    id: "bugatti",
    slug: "bugatti",
    name: "Bugatti",
    country: "France",
    logo: "/images/makes/bugatti.svg",
    carIds: ["bugatti-veyron-2011"]
  },
  {
    id: "buick",
    slug: "buick",
    name: "Buick",
    country: "United States",
    logo: "/images/makes/buick.svg",
    carIds: ["buick-grand-national-1987"]
  },
  {
    id: "cadillac",
    slug: "cadillac",
    name: "Cadillac",
    country: "United States",
    logo: "/images/makes/cadillac.svg",
    carIds: ["ecto-1-1959"]
  },
  {
    id: "chevrolet",
    slug: "chevrolet",
    name: "Chevrolet",
    country: "United States",
    logo: "/images/makes/chevrolet.svg",
    carIds: ["bumblebee-camaro-2007", "impala-1967", "chevelle-ss-1970", "camaro-z28-1969"]
  },
  {
    id: "chrysler",
    slug: "chrysler",
    name: "Chrysler",
    country: "United States",
    logo: "/images/makes/chrysler.svg",
    carIds: []
  },
  {
    id: "de-tomaso",
    slug: "de-tomaso",
    name: "De Tomaso",
    country: "Italy",
    logo: "/images/makes/de-tomaso.svg",
    carIds: ["de-tomaso-pantera-1972"]
  },
  {
    id: "delorean",
    slug: "delorean",
    name: "DeLorean",
    country: "United States",
    logo: "/images/makes/delorean.svg",
    carIds: ["delorean-dmc-12"]
  },
  {
    id: "dodge",
    slug: "dodge",
    name: "Dodge",
    country: "United States",
    logo: "/images/makes/dodge.svg",
    carIds: ["general-lee-1969", "charger-rt-1970", "challenger-1970", "challenger-srt-2011", "bluesmobile-1974"]
  },
  {
    id: "eagle",
    slug: "eagle",
    name: "Eagle",
    country: "United States",
    logo: "/images/makes/eagle.svg",
    carIds: []
  },
  {
    id: "ferrari",
    slug: "ferrari",
    name: "Ferrari",
    country: "Italy",
    logo: "/images/makes/ferrari.svg",
    carIds: ["testarossa-1986", "ferrari-308-gts-1977", "ferrari-250-gt-1961", "ferrari-f40-1992"]
  },
  {
    id: "ford",
    slug: "ford",
    name: "Ford",
    country: "United States",
    logo: "/images/makes/ford.svg",
    carIds: ["bullitt-mustang-1968", "mad-max-falcon-1974", "mystery-machine", "gran-torino-1975", "mustang-mach-1-1971", "gran-torino-sport-1972", "boss-429-mustang-1969", "mustang-gt350-2015", "ford-gt40-1966"]
  },
  {
    id: "gmc",
    slug: "gmc",
    name: "GMC",
    country: "United States",
    logo: "/images/makes/gmc.svg",
    carIds: ["a-team-vandura-1982"]
  },
  {
    id: "honda",
    slug: "honda",
    name: "Honda",
    country: "Japan",
    logo: "/images/makes/honda.svg",
    carIds: ["civic-1992", "s2000-2000"]
  },
  {
    id: "hummer",
    slug: "hummer",
    name: "Hummer",
    country: "United States",
    logo: "/images/makes/hummer.svg",
    carIds: []
  },
  {
    id: "jaguar",
    slug: "jaguar",
    name: "Jaguar",
    country: "United Kingdom",
    logo: "/images/makes/jaguar.svg",
    carIds: []
  },
  {
    id: "jeep",
    slug: "jeep",
    name: "Jeep",
    country: "United States",
    logo: "/images/makes/jeep.svg",
    carIds: []
  },
  {
    id: "koenigsegg",
    slug: "koenigsegg",
    name: "Koenigsegg",
    country: "Sweden",
    logo: "/images/makes/koenigsegg.svg",
    carIds: ["koenigsegg-ccxr-2010"]
  },
  {
    id: "lamborghini",
    slug: "lamborghini",
    name: "Lamborghini",
    country: "Italy",
    logo: "/images/makes/lamborghini.svg",
    carIds: ["lamborghini-countach-1985"]
  },
  {
    id: "land-rover",
    slug: "land-rover",
    name: "Land Rover",
    country: "United Kingdom",
    logo: "/images/makes/land-rover.svg",
    carIds: []
  },
  {
    id: "lexus",
    slug: "lexus",
    name: "Lexus",
    country: "Japan",
    logo: "/images/makes/lexus.svg",
    carIds: []
  },
  {
    id: "lincoln",
    slug: "lincoln",
    name: "Lincoln",
    country: "United States",
    logo: "/images/makes/lincoln.svg",
    carIds: ["batmobile-1966", "lincoln-continental-1941"]
  },
  {
    id: "lotus",
    slug: "lotus",
    name: "Lotus",
    country: "United Kingdom",
    logo: "/images/makes/lotus.svg",
    carIds: ["lotus-esprit-1976"]
  },
  {
    id: "maserati",
    slug: "maserati",
    name: "Maserati",
    country: "Italy",
    logo: "/images/makes/maserati.svg",
    carIds: []
  },
  {
    id: "mazda",
    slug: "mazda",
    name: "Mazda",
    country: "Japan",
    logo: "/images/makes/mazda.svg",
    carIds: ["rx7-1993"]
  },
  {
    id: "mclaren",
    slug: "mclaren",
    name: "McLaren",
    country: "United Kingdom",
    logo: "/images/makes/mclaren.svg",
    carIds: ["mclaren-720s-2017"]
  },
  {
    id: "mercedes-benz",
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    country: "Germany",
    logo: "/images/makes/mercedes-benz.svg",
    carIds: ["mercedes-300sl-1955"]
  },
  {
    id: "mini",
    slug: "mini",
    name: "Mini",
    country: "United Kingdom",
    logo: "/images/makes/mini.svg",
    carIds: ["mr-bean-mini-1977", "italian-job-mini-1968"]
  },
  {
    id: "mitsubishi",
    slug: "mitsubishi",
    name: "Mitsubishi",
    country: "Japan",
    logo: "/images/makes/mitsubishi.svg",
    carIds: ["eclipse-1995", "eclipse-spyder-2003", "lancer-evo-7-2002"]
  },
  {
    id: "nissan",
    slug: "nissan",
    name: "Nissan",
    country: "Japan",
    logo: "/images/makes/nissan.svg",
    carIds: ["skyline-r34-1999", "silvia-s15-2001", "nissan-240sx-1997", "nissan-gtr-2009", "nissan-gtr-r35-2012"]
  },
  {
    id: "plymouth",
    slug: "plymouth",
    name: "Plymouth",
    country: "United States",
    logo: "/images/makes/plymouth.svg",
    carIds: ["christine-1958"]
  },
  {
    id: "pontiac",
    slug: "pontiac",
    name: "Pontiac",
    country: "United States",
    logo: "/images/makes/pontiac.svg",
    carIds: ["kitt-1982", "bandit-trans-am-1977", "aztek-pontiac"]
  },
  {
    id: "porsche",
    slug: "porsche",
    name: "Porsche",
    country: "Germany",
    logo: "/images/makes/porsche.svg",
    carIds: ["porsche-928-1981", "porsche-911-1973"]
  },
  {
    id: "renault",
    slug: "renault",
    name: "Renault",
    country: "France",
    logo: "/images/makes/renault.svg",
    carIds: []
  },
  {
    id: "rolls-royce",
    slug: "rolls-royce",
    name: "Rolls-Royce",
    country: "United Kingdom",
    logo: "/images/makes/rolls-royce.svg",
    carIds: []
  },
  {
    id: "saleen",
    slug: "saleen",
    name: "Saleen",
    country: "United States",
    logo: "/images/makes/saleen.svg",
    carIds: []
  },
  {
    id: "shelby",
    slug: "shelby",
    name: "Shelby",
    country: "United States",
    logo: "/images/makes/shelby.svg",
    carIds: ["eleanor-1967"]
  },
  {
    id: "subaru",
    slug: "subaru",
    name: "Subaru",
    country: "Japan",
    logo: "/images/makes/subaru.svg",
    carIds: []
  },
  {
    id: "toyota",
    slug: "toyota",
    name: "Toyota",
    country: "Japan",
    logo: "/images/makes/toyota.svg",
    carIds: ["supra-mk4-1995", "supra-mk4-1993", "toyota-ae86"]
  },
  {
    id: "volkswagen",
    slug: "volkswagen",
    name: "Volkswagen",
    country: "Germany",
    logo: "/images/makes/volkswagen.svg",
    carIds: ["herbie-1963"]
  },
  {
    id: "volvo",
    slug: "volvo",
    name: "Volvo",
    country: "Sweden",
    logo: "/images/makes/volvo.svg",
    carIds: []
  }
]
