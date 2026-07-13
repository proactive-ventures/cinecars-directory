export interface CarAppearance {
  mediaType: "movie" | "tv-series" | "animated-film" | "animated-series"
  title: string
  year: number
  role: string
  franchise?: string
  description?: string
}

export interface CarSpecs {
  engine?: string
  horsepower?: number
  topSpeed?: number
  zeroToSixty?: number
  transmission?: string
  drivetrain?: string
  weight?: number
}

export interface Car {
  id: string
  slug: string
  name: string
  year: number
  make: string
  model: string
  bodyType: string
  image: string
  imageUrl?: string
  description: string
  specs: CarSpecs
  appearances: CarAppearance[]
  iconicScene?: string
  culturalImpact?: string
  funFact?: string
  notableDrivers?: string[]
  isFeatured?: boolean
}

const PART_1: Car[] = [
  {
    id: "aston-martin-db5-1964",
    slug: "aston-martin-db5-1964",
    name: "Aston Martin DB5",
    year: 1964,
    make: "Aston Martin",
    model: "DB5",
    bodyType: "Grand Tourer",
    image: "/images/cars/aston-martin-db5-1964.jpg",
    description: "The most famous car in cinema history, James Bond's silver Aston Martin DB5 is the epitome of British sophistication and spycraft. Equipped with an arsenal of gadgets including ejector seats, machine guns, and an oil slick dispenser, it first appeared in Goldfinger and became Bond's signature vehicle.",
    specs: {
      engine: "4.0L Inline-6",
      horsepower: 282,
      topSpeed: 145,
      zeroToSixty: 8.1,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 3312
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Goldfinger_-_Aston_Martin_DB5_%26_Sean_Connery.jpg",
    appearances: [
      { mediaType: "movie", title: "Goldfinger", year: 1964, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "Thunderball", year: 1965, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "GoldenEye", year: 1995, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "Tomorrow Never Dies", year: 1997, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "Casino Royale", year: 2006, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "Skyfall", year: 2012, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "Spectre", year: 2015, role: "James Bond's personal car", franchise: "James Bond" },
      { mediaType: "movie", title: "No Time to Die", year: 2021, role: "James Bond's personal car", franchise: "James Bond" }
    ],
    iconicScene: "Bond demonstrates the DB5's gadgets to Q in the Scottish Highlands in Skyfall before driving it to confront Silva.",
    culturalImpact: "The DB5 is universally recognized as the definitive Bond car and set the standard for movie spy vehicles.",
    funFact: "The original DB5 used in Goldfinger was sold at auction in 2019 for $6.4 million, making it one of the most expensive movie cars ever sold.",
    notableDrivers: ["James Bond / Sean Connery", "James Bond / Pierce Brosnan", "James Bond / Daniel Craig"],
    isFeatured: true
  },
  {
    id: "delorean-dmc-12",
    slug: "delorean-dmc-12",
    name: "DeLorean DMC-12",
    year: 1981,
    make: "DeLorean",
    model: "DMC-12",
    bodyType: "Sports Car",
    image: "/images/cars/delorean-dmc-12.jpg",
    description: "The iconic stainless-steel DeLorean DMC-12 was transformed into the world's most famous time machine in Back to the Future. With its gull-wing doors and Mr. Fusion reactor, Doc Brown's creation can travel through time when it reaches 88 miles per hour.",
    specs: {
      engine: "2.85L V6 PRV",
      horsepower: 130,
      topSpeed: 110,
      zeroToSixty: 9.6,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2718
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/1981_Delorean_DMC-12_Time_Machine_%2843754890175%29.jpg",
    appearances: [
      { mediaType: "movie", title: "Back to the Future", year: 1985, role: "Time machine built by Doc Brown", franchise: "Back to the Future" },
      { mediaType: "movie", title: "Back to the Future Part II", year: 1989, role: "Time machine with hover conversion", franchise: "Back to the Future" },
      { mediaType: "movie", title: "Back to the Future Part III", year: 1990, role: "Time machine modified for train push", franchise: "Back to the Future" }
    ],
    iconicScene: "The DeLorean streaks across the Twin Pines Mall parking lot, reaching 88 mph as lightning strikes the clock tower, sending Marty McFly back to 1985.",
    culturalImpact: "The DeLorean DMC-12 became synonymous with time travel and is one of the most recognizable movie vehicles ever created.",
    funFact: "The DeLorean's iconic flux capacitor was designed by a blacksmith, and the '1.21 gigawatts' line became one of the most misquoted lines in cinema.",
    notableDrivers: ["Dr. Emmett Brown", "Marty McFly"],
    isFeatured: true
  },
  {
    id: "general-lee-1969",
    slug: "general-lee-1969",
    name: "General Lee",
    year: 1969,
    make: "Dodge",
    model: "Charger R/T",
    bodyType: "Muscle Car",
    image: "/images/cars/general-lee-1969.jpg",
    description: "The General Lee is a 1969 Dodge Charger R/T painted bright orange with the Confederate battle flag on its roof. Driven by the Duke cousins Bo and Luke in their adventures around Hazzard County, it became famous for its incredible jumps and the distinctive horn that plays the first 12 notes of Dixie.",
    specs: {
      engine: "7.2L 440 Magnum V8",
      horsepower: 375,
      topSpeed: 140,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3500
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/General_Lee.JPG",
    appearances: [
      { mediaType: "tv-series", title: "The Dukes of Hazzard", year: 1979, role: "The Duke cousins' car", franchise: "The Dukes of Hazzard" },
      { mediaType: "movie", title: "The Dukes of Hazzard", year: 2005, role: "The Duke cousins' car", franchise: "The Dukes of Hazzard" }
    ],
    iconicScene: "The General Lee flies through the air over a police car, horns blaring, as Bo and Luke escape another trap set by Sheriff Rosco P. Coltrane.",
    culturalImpact: "The General Lee is one of television's most recognizable cars and defined the muscle car era on TV.",
    funFact: "Over 300 Dodge Chargers were destroyed during the filming of the original series due to the extensive jump sequences.",
    notableDrivers: ["Bo Duke", "Luke Duke"],
    isFeatured: true
  },
  {
    id: "kitt-1982",
    slug: "kitt-1982",
    name: "KITT",
    year: 1982,
    make: "Pontiac",
    model: "Firebird Trans Am",
    bodyType: "Sports Car",
    image: "/images/cars/kitt-1982.jpg",
    description: "KITT (Knight Industries Two Thousand) is a modified 1982 Pontiac Firebird Trans Am equipped with an advanced AI and a host of high-tech gadgets. With its iconic red scanner light on the front bumper and the voice of William Daniels, KITT helped crimefighter Michael Knight fight injustice.",
    specs: {
      engine: "5.0L 305 V8",
      horsepower: 150,
      topSpeed: 125,
      zeroToSixty: 9.5,
      transmission: "4-speed automatic",
      drivetrain: "RWD",
      weight: 3350
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/KITT_%28Knight_Industries_Two_Thousand%29_01.png",
    appearances: [
      { mediaType: "tv-series", title: "Knight Rider", year: 1982, role: "Michael Knight's talking car", franchise: "Knight Rider" },
      { mediaType: "tv-series", title: "Knight Rider (2008)", year: 2008, role: "Knight Rider's AI system", franchise: "Knight Rider" }
    ],
    iconicScene: "KITT performs a 180-degree ski-turn (turbo boost) to avoid an obstacle, showcasing its advanced computerized driving capabilities.",
    culturalImpact: "KITT was one of the first truly iconic talking cars in television history and inspired a generation of tech enthusiasts.",
    funFact: "The voice of KITT was provided by William Daniels, who played Mr. Feeny in Boy Meets World.",
    notableDrivers: ["Michael Knight"],
    isFeatured: true
  },
  {
    id: "ecto-1-1959",
    slug: "ecto-1-1959",
    name: "Ecto-1",
    year: 1959,
    make: "Cadillac",
    model: "Miller-Meteor",
    bodyType: "Ambulance / Hearse",
    image: "/images/cars/ecto-1-1959.jpg",
    description: "The Ecto-1 is a heavily modified 1959 Cadillac Miller-Meteor ambulance converted into a ghost-catching mobile command center by the Ghostbusters. Painted white with the iconic red 'No Ghosts' logo, it carries all the equipment needed to wrangle supernatural entities across New York City.",
    specs: {
      engine: "6.4L 390 V8",
      horsepower: 325,
      topSpeed: 100,
      zeroToSixty: 12.0,
      transmission: "4-speed automatic",
      drivetrain: "RWD",
      weight: 5000
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/1959_Cadillac_Ecto-1_%2812227773836%29.jpg",
    appearances: [
      { mediaType: "movie", title: "Ghostbusters", year: 1984, role: "Ghostbusters' headquarters on wheels", franchise: "Ghostbusters" },
      { mediaType: "movie", title: "Ghostbusters II", year: 1989, role: "Ghostbusters' vehicle", franchise: "Ghostbusters" },
      { mediaType: "movie", title: "Ghostbusters: Afterlife", year: 2021, role: "Ghostbusters' restored vehicle", franchise: "Ghostbusters" },
      { mediaType: "movie", title: "Ghostbusters: Frozen Empire", year: 2024, role: "Ghostbusters' vehicle", franchise: "Ghostbusters" }
    ],
    iconicScene: "The Ecto-1 screams through the streets of New York with its siren blaring as the Ghostbusters race to their first call at the Sedgewick Hotel.",
    culturalImpact: "The Ecto-1 is one of the most recognizable movie vehicles ever created.",
    funFact: "Three 1959 Cadillac Miller-Meteor ambulances were used during the filming of the original Ghostbusters.",
    notableDrivers: ["Peter Venkman", "Ray Stantz", "Egon Spengler", "Winston Zeddemore"],
    isFeatured: true
  },
  {
    id: "bandit-trans-am-1977",
    slug: "bandit-trans-am-1977",
    name: "1977 Pontiac Firebird Trans Am",
    year: 1977,
    make: "Pontiac",
    model: "Firebird Trans Am",
    bodyType: "Muscle Car",
    image: "/images/cars/bandit-trans-am-1977.jpg",
    description: "The black 1977 Pontiac Firebird Trans Am with a screaming chicken decal on the hood was driven by the Bandit in Smokey and the Bandit. This iconic muscle car became the star of the film alongside Burt Reynolds, leading a high-speed chase across state lines.",
    specs: {
      engine: "6.6L 400 V8",
      horsepower: 200,
      topSpeed: 125,
      zeroToSixty: 8.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3530
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/1977_Pontiac_Firebird_Trans_Am_%28Smokey_and_the_Bandit%29.jpg/1280px-1977_Pontiac_Firebird_Trans_Am_%28Smokey_and_the_Bandit%29.jpg",
    appearances: [
      { mediaType: "movie", title: "Smokey and the Bandit", year: 1977, role: "The Bandit's getaway car" },
      { mediaType: "movie", title: "Smokey and the Bandit II", year: 1980, role: "The Bandit's car" },
      { mediaType: "movie", title: "Smokey and the Bandit Part 3", year: 1983, role: "The Bandit's car" }
    ],
    iconicScene: "The Bandit floors it across a bridge while Sheriff Buford T. Justice is stuck in traffic.",
    culturalImpact: "The black Trans Am with gold accents became the definitive American muscle car of the late 1970s.",
    funFact: "Pontiac gave the filmmakers nine Trans Ams for the production, and only one was actually a 1977 model.",
    notableDrivers: ["The Bandit / Bo Darville"],
    isFeatured: true
  },
  {
    id: "herbie-1963",
    slug: "herbie-1963",
    name: "Herbie",
    year: 1963,
    make: "Volkswagen",
    model: "Beetle",
    bodyType: "Compact Car",
    image: "/images/cars/herbie-1963.jpg",
    description: "Herbie is a sentient 1963 Volkswagen Beetle with a mind of its own, a racing heart, and the number 53 painted on its front and doors. The Love Bug competes in races and gets into adventures with its various owners, displaying remarkable personality and driving ability.",
    specs: {
      engine: "1.2L Flat-4",
      horsepower: 40,
      topSpeed: 72,
      zeroToSixty: 22.0,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 1600
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/VW_K%C3%A4fer_Herbie_Automuseum_Prototyp_Hamburg-20240927.JPG",
    appearances: [
      { mediaType: "movie", title: "The Love Bug", year: 1968, role: "Sentient racing Beetle" },
      { mediaType: "movie", title: "Herbie Rides Again", year: 1974, role: "Sentient Beetle" },
      { mediaType: "movie", title: "Herbie Goes to Monte Carlo", year: 1977, role: "Racing Beetle" },
      { mediaType: "movie", title: "Herbie Goes Bananas", year: 1980, role: "Sentient Beetle" },
      { mediaType: "movie", title: "Herbie: Fully Loaded", year: 2005, role: "Sentient racing Beetle" }
    ],
    iconicScene: "Herbie races against a much faster car and uses clever tricks, including short-cutting through a car wash, to win the race.",
    culturalImpact: "Herbie is the most famous Volkswagen Beetle in history and helped cement the Beetle as a beloved cultural icon.",
    funFact: "Over 20 different Beetles were used to portray Herbie across the films, each modified with special suspension.",
    notableDrivers: ["Jimmy Douglas", "Maggie Peyton"],
    isFeatured: true
  },
  {
    id: "bullitt-mustang-1968",
    slug: "bullitt-mustang-1968",
    name: "1968 Ford Mustang GT 390",
    year: 1968,
    make: "Ford",
    model: "Mustang GT 390 Fastback",
    bodyType: "Muscle Car",
    image: "/images/cars/bullitt-mustang-1968.jpg",
    description: "Steve McQueen's dark green 1968 Ford Mustang GT 390 Fastback is the star of Bullitt's legendary car chase through the hilly streets of San Francisco. Its high-revving V8 and aggressive stance make it the archetypal movie muscle car.",
    specs: {
      engine: "6.4L 390 FE V8",
      horsepower: 325,
      topSpeed: 110,
      zeroToSixty: 7.1,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3200
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/1968_Ford_Mustang_%22Bullitt%22_display_--_2018_North_American_International_Auto_Show_%2826382929837%29.jpg",
    appearances: [
      { mediaType: "movie", title: "Bullitt", year: 1968, role: "Detective Frank Bullitt's car" }
    ],
    iconicScene: "The famous 10-minute chase through San Francisco sees Bullitt's Mustang pursuing a black Dodge Charger through city streets at breakneck speeds.",
    culturalImpact: "The Bullitt Mustang set the gold standard for cinematic car chases and is still studied in film schools.",
    funFact: "Two 1968 Mustang fastbacks were used in the film. One was discovered in a Mexican junkyard in 2017 and restored.",
    notableDrivers: ["Detective Frank Bullitt"],
    isFeatured: true
  },
  {
    id: "mad-max-falcon-1974",
    slug: "mad-max-falcon-1974",
    name: "Ford Falcon XB GT",
    year: 1974,
    make: "Ford",
    model: "Falcon XB GT",
    bodyType: "Muscle Car",
    image: "/images/cars/mad-max-falcon-1974.jpg",
    description: "The yellow 1974 Ford Falcon XB GT known as the 'Interceptor' is the ultimate survival machine in a post-apocalyptic wasteland. Driven by Max Rockatansky, this supercharged V8 beast features a distinctive black shaker hood scoop and reinforced bodywork.",
    specs: {
      engine: "5.8L 351 Cleveland V8",
      horsepower: 300,
      topSpeed: 140,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3351
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/1973_Ford_XB_Falcon_GT_hardtop_-_Mad_Max_Interceptor_replica_%287708196828%29.jpg",
    appearances: [
      { mediaType: "movie", title: "Mad Max", year: 1979, role: "Max Rockatansky's patrol car", franchise: "Mad Max" },
      { mediaType: "movie", title: "Mad Max 2: The Road Warrior", year: 1981, role: "Max's wasteland interceptor", franchise: "Mad Max" }
    ],
    iconicScene: "Max stands on the hood of the Interceptor as it plows through a gang of marauders, the supercharger whining as the car becomes an extension of his will to survive.",
    culturalImpact: "The Interceptor defined the post-apocalyptic aesthetic for decades and inspired countless vehicles in video games and films.",
    funFact: "The blower sticking through the hood was non-functional, the engine sound was dubbed in post-production.",
    notableDrivers: ["Max Rockatansky"],
    isFeatured: true
  },
  {
    id: "lotus-esprit-1976",
    slug: "lotus-esprit-1976",
    name: "Lotus Esprit S1",
    year: 1976,
    make: "Lotus",
    model: "Esprit S1",
    bodyType: "Sports Car",
    image: "/images/cars/lotus-esprit-1976.jpg",
    description: "The Lotus Esprit S1 made a splash as James Bond's submarine car in The Spy Who Loved Me. This white wedge-shaped sports car transforms into a fully functional submarine complete with torpedoes and underwater missiles.",
    specs: {
      engine: "2.0L 907 Inline-4",
      horsepower: 160,
      topSpeed: 138,
      zeroToSixty: 6.8,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2000
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/1976_Lotus_Esprit_submarine_car_-_James_Bond_%285963589176%29.jpg",
    appearances: [
      { mediaType: "movie", title: "The Spy Who Loved Me", year: 1977, role: "James Bond's amphibious vehicle", franchise: "James Bond" },
      { mediaType: "movie", title: "For Your Eyes Only", year: 1981, role: "James Bond's car", franchise: "James Bond" }
    ],
    iconicScene: "Bond drives the Lotus off a pier into the ocean where it transforms into a submarine and engages enemy divers underwater.",
    culturalImpact: "The underwater Lotus remains one of the most imaginative Bond gadgets ever created.",
    funFact: "The submarine version was a modified shell with electric motors and was found in storage 30 years later in a New York warehouse.",
    notableDrivers: ["James Bond / Roger Moore"],
    isFeatured: true
  },
  {
    id: "batmobile-1966",
    slug: "batmobile-1966",
    name: "1966 Batmobile",
    year: 1955,
    make: "Lincoln",
    model: "Futura Concept",
    bodyType: "Concept Car",
    image: "/images/cars/batmobile-1966.jpg",
    description: "The 1966 Batmobile, based on the Lincoln Futura concept car, is the iconic vehicle from the classic Batman television series. With its jet engine exhaust, Bat-phone, and an array of crime-fighting gadgets, it defined the campy yet beloved aesthetic of the Adam West era.",
    specs: {
      engine: "6.4L 390 Ford V8",
      horsepower: 330,
      topSpeed: 120,
      zeroToSixty: 7.0,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 5500
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/1960s_Batmobile_%28FMC%29.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Batman", year: 1966, role: "Batman's crime-fighting vehicle", franchise: "Batman" },
      { mediaType: "movie", title: "Batman: The Movie", year: 1966, role: "Batman's vehicle", franchise: "Batman" }
    ],
    iconicScene: "The Batmobile screeches out of the Batcave, through the secret tunnel, and into Gotham City.",
    culturalImpact: "The 1966 Batmobile established the concept of a superhero having a signature vehicle.",
    funFact: "The car was originally a one-of-a-kind Lincoln Futura concept built by Ford in 1955 at a cost of $250,000.",
    notableDrivers: ["Batman / Bruce Wayne", "Robin / Dick Grayson"],
    isFeatured: true
  },
  {
    id: "tumbler-batmobile",
    slug: "tumbler-batmobile",
    name: "Tumbler Batmobile",
    year: 2005,
    make: "Custom",
    model: "Tumbler",
    bodyType: "Military Vehicle",
    image: "/images/cars/tumbler-batmobile.jpg",
    description: "The Tumbler is a militarized, tank-like Batmobile designed for Christopher Nolan's Dark Knight trilogy. Combining a Lamborghini-inspired cockpit with a heavy-duty military chassis, the Tumbler can leap across rooftops, fire grappling hooks, and deploy a motorcycle from its front wheels.",
    specs: {
      engine: "5.7L 350 Chevy V8",
      horsepower: 500,
      topSpeed: 106,
      zeroToSixty: 5.6,
      transmission: "6-speed automatic",
      drivetrain: "AWD",
      weight: 5000
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Warner_Brothers_Studios_VIP_Tour_-_Hollywood%2C_California_-_Batmobile_The_Tumbler_%2810709068926%29.jpg",
    appearances: [
      { mediaType: "movie", title: "Batman Begins", year: 2005, role: "Batman's tactical vehicle", franchise: "Batman" },
      { mediaType: "movie", title: "The Dark Knight", year: 2008, role: "Batman's tactical vehicle", franchise: "Batman" },
      { mediaType: "movie", title: "The Dark Knight Rises", year: 2012, role: "Batman's tactical vehicle", franchise: "Batman" }
    ],
    iconicScene: "The Tumbler chases the Joker through the streets of Gotham, eventually being flipped over by a garbage truck.",
    culturalImpact: "The Tumbler reimagined the Batmobile as a practical military vehicle, influencing superhero vehicle design for years.",
    funFact: "Seven Tumblers were built for the films, and they could actually leap 30 feet through the air using a pneumatic ram system.",
    notableDrivers: ["Batman / Bruce Wayne"],
    isFeatured: true
  },
  {
    id: "bumblebee-camaro-2007",
    slug: "bumblebee-camaro-2007",
    name: "Bumblebee Camaro",
    year: 2007,
    make: "Chevrolet",
    model: "Camaro",
    bodyType: "Muscle Car",
    image: "/images/cars/bumblebee-camaro-2007.jpg",
    description: "Bumblebee is a Chevrolet Camaro that transforms into a giant alien robot in the Transformers franchise. Starting as a battered 1977 Camaro, Bumblebee later scans a new 2007 Camaro Concept, becoming a sleek yellow muscle car with black racing stripes.",
    specs: {
      engine: "6.2L LS3 V8",
      horsepower: 400,
      topSpeed: 170,
      zeroToSixty: 4.9,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 3900
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camaro-Transformers03.jpg",
    appearances: [
      { mediaType: "movie", title: "Transformers", year: 2007, role: "Sam Witwicky's guardian Autobot", franchise: "Transformers" },
      { mediaType: "movie", title: "Transformers: Revenge of the Fallen", year: 2009, role: "Sam's Autobot protector", franchise: "Transformers" },
      { mediaType: "movie", title: "Transformers: Dark of the Moon", year: 2011, role: "Autobot scout", franchise: "Transformers" },
      { mediaType: "movie", title: "Transformers: Age of Extinction", year: 2014, role: "Cade's Autobot ally", franchise: "Transformers" },
      { mediaType: "movie", title: "Transformers: The Last Knight", year: 2017, role: "Autobot warrior", franchise: "Transformers" },
      { mediaType: "movie", title: "Bumblebee", year: 2018, role: "Protagonist Autobot", franchise: "Transformers" }
    ],
    iconicScene: "Bumblebee transforms for the first time in the 2007 film, revealing his full robot form to a shocked Sam Witwicky.",
    culturalImpact: "Bumblebee's Camaro form boosted Chevrolet's exposure and solidified the Camaro's image as a modern muscle car.",
    funFact: "The producers originally wanted a Volkswagen Beetle as Bumblebee's alt-mode, but GM paid to have it changed to a Camaro.",
    notableDrivers: ["Sam Witwicky"],
    isFeatured: true
  },
  {
    id: "mystery-machine",
    slug: "mystery-machine",
    name: "Mystery Machine",
    year: 1972,
    make: "Ford",
    model: "Econoline",
    bodyType: "Van",
    image: "/images/cars/mystery-machine.jpg",
    description: "The Mystery Machine is a brightly painted blue and green van that serves as the primary transportation for Mystery Inc. as they travel the country solving supernatural mysteries. Its groovy 1970s paint scheme has made it one of the most recognizable vehicles in animation history.",
    specs: {
      engine: "4.9L 300 Inline-6",
      horsepower: 150,
      topSpeed: 80,
      zeroToSixty: 15.0,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 4500
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/The_Mystery_Machine_%28SDCC_2013%29.jpg/1280px-The_Mystery_Machine_%28SDCC_2013%29.jpg",
    appearances: [
      { mediaType: "animated-series", title: "Scooby-Doo, Where Are You!", year: 1969, role: "Mystery Inc. transport", franchise: "Scooby-Doo" },
      { mediaType: "tv-series", title: "Scooby-Doo", year: 2002, role: "Mystery Inc. transport", franchise: "Scooby-Doo" },
      { mediaType: "movie", title: "Scooby-Doo", year: 2002, role: "Mystery Inc. transport", franchise: "Scooby-Doo" },
      { mediaType: "movie", title: "Scooby-Doo 2: Monsters Unleashed", year: 2004, role: "Mystery Inc. transport", franchise: "Scooby-Doo" }
    ],
    iconicScene: "The Mystery Machine rumbles to a stop at a haunted amusement park as Shaggy and Scooby nervously peer out the window.",
    culturalImpact: "The Mystery Machine is the most famous van in pop culture and its psychedelic color scheme is instantly recognizable.",
    funFact: "The Mystery Machine was originally based on a 1967 Chevrolet Sportvan Deluxe in the earliest Hanna-Barbera concept art.",
    notableDrivers: ["Fred Jones", "Velma Dinkley"],
    isFeatured: true
  },
  {
    id: "testarossa-1986",
    slug: "testarossa-1986",
    name: "Ferrari Testarossa",
    year: 1986,
    make: "Ferrari",
    model: "Testarossa",
    bodyType: "Sports Car",
    image: "/images/cars/testarossa-1986.jpg",
    description: "The white Ferrari Testarossa with its distinctive side strakes is the definitive 1980s supercar. As Detective Sonny Crockett's undercover vehicle on Miami Vice, it became the ultimate symbol of 80s style, excess, and cool.",
    specs: {
      engine: "4.9L Flat-12",
      horsepower: 390,
      topSpeed: 180,
      zeroToSixty: 5.3,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 3319
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Ferrari_Testarossa_Miami_Vice_%2815443066319%29.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Miami Vice", year: 1984, role: "Sonny Crockett's undercover car" }
    ],
    iconicScene: "Sonny Crockett and Tubbs speed through the neon-lit streets of Miami in the white Testarossa, jackets billowing in the wind.",
    culturalImpact: "The Testarossa defined 1980s cool and made Ferrari a household name in America.",
    funFact: "The Testarossa used on Miami Vice was actually a 1984 model repainted white, and the show used three different cars.",
    notableDrivers: ["Detective Sonny Crockett"],
    isFeatured: true
  },
  {
    id: "ferrari-308-gts-1977",
    slug: "ferrari-308-gts-1977",
    name: "Ferrari 308 GTS",
    year: 1977,
    make: "Ferrari",
    model: "308 GTS",
    bodyType: "Sports Car",
    image: "/images/cars/ferrari-308-gts-1977.jpg",
    description: "The red Ferrari 308 GTS was the beloved car of private investigator Thomas Magnum in Hawaii. With its removable T-top roof and unmistakable Ferrari V8 sound, it was Magnum's pride and joy.",
    specs: {
      engine: "3.0L V8",
      horsepower: 240,
      topSpeed: 147,
      zeroToSixty: 7.3,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 3050
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Ferrari_308_GTSi_from_Magnum_P.I._%285134036235%29.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Magnum, P.I.", year: 1980, role: "Thomas Magnum's company car" }
    ],
    iconicScene: "Magnum peels out of the garage at Robin's Nest, T-tops off, Hawaiian shirt flapping, as the opening credits theme song plays.",
    culturalImpact: "The Ferrari 308 became synonymous with the carefree Hawaiian lifestyle and private investigators.",
    funFact: "The Ferrari 308 used in the show was actually a modified black 308 that was painted red for the pilot.",
    notableDrivers: ["Thomas Magnum"],
    isFeatured: false
  },
  {
    id: "gran-torino-1975",
    slug: "gran-torino-1975",
    name: "Ford Gran Torino",
    year: 1975,
    make: "Ford",
    model: "Gran Torino",
    bodyType: "Muscle Car",
    image: "/images/cars/gran-torino-1975.jpg",
    description: "The red 1975 Ford Gran Torino with its distinctive white racing stripe is the iconic police car driven by Detectives Starsky and Hutch on the streets of Bay City. This two-door muscle car was as much a character on the show as the detectives themselves.",
    specs: {
      engine: "5.8L 351 Windsor V8",
      horsepower: 152,
      topSpeed: 115,
      zeroToSixty: 10.0,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 3800
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/1976_Ford_Gran_Torino_Starsky_%26_Hutch.jpg/1280px-1976_Ford_Gran_Torino_Starsky_%26_Hutch.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Starsky and Hutch", year: 1975, role: "Starsky's police car" },
      { mediaType: "movie", title: "Starsky & Hutch", year: 2004, role: "Starsky's police car" }
    ],
    iconicScene: "Starsky throws the Torino into a wild slide to avoid gunfire, the car's body rolling as they escape another tight spot.",
    culturalImpact: "The red and white striped Torino is one of television's most famous police vehicles.",
    funFact: "The Torino used on the show was actually a 1975 model with a 1976 grille.",
    notableDrivers: ["Detective David Starsky", "Detective Ken Hutchinson"],
    isFeatured: false
  },
  {
    id: "impala-1967",
    slug: "impala-1967",
    name: "Chevrolet Impala",
    year: 1967,
    make: "Chevrolet",
    model: "Impala",
    bodyType: "Sedan",
    image: "/images/cars/impala-1967.jpg",
    description: "The 1967 Chevrolet Impala, known as 'Baby' to Dean Winchester, is the iconic black sedan driven by the Winchester brothers as they hunt monsters across America. With a reinforced trunk full of weapons, the Impala is as much a home as it is a vehicle.",
    specs: {
      engine: "6.2L 327 V8",
      horsepower: 325,
      topSpeed: 125,
      zeroToSixty: 9.5,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 3600
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1967_Chevrolet_Impala_at_Supernatural_convention.jpg/1280px-1967_Chevrolet_Impala_at_Supernatural_convention.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Supernatural", year: 2005, role: "Dean Winchester's car" }
    ],
    iconicScene: "Dean Winchester lovingly strokes the Impala's dashboard, calling her 'Baby', before gunning the engine and peeling out onto the highway.",
    culturalImpact: "The Impala became a central character in Supernatural, representing home, family, and the brothers' bond.",
    funFact: "The show used multiple 1967 Impalas throughout its 15-season run.",
    notableDrivers: ["Dean Winchester", "Sam Winchester"],
    isFeatured: true
  },
  {
    id: "mr-bean-mini-1977",
    slug: "mr-bean-mini-1977",
    name: "Mr. Bean's Mini",
    year: 1977,
    make: "Mini",
    model: "1000",
    bodyType: "Compact Car",
    image: "/images/cars/mr-bean-mini-1977.jpg",
    description: "Mr. Bean's British Racing Green Mini 1000 is an extension of his eccentric personality. Complete with a lock on the outside because he can't figure out the inside handle, a sofa strapped to the roof, and a teddy bear riding shotgun, this tiny car is the perfect vehicle for his misadventures.",
    specs: {
      engine: "1.0L Inline-4",
      horsepower: 41,
      topSpeed: 78,
      zeroToSixty: 22.7,
      transmission: "4-speed manual",
      drivetrain: "FWD",
      weight: 1400
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/1979_Austin_Morris_Mini_-_Mr_Bean_%285962664283%29.jpg/1280px-1979_Austin_Morris_Mini_-_Mr_Bean_%285962664283%29.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Mr. Bean", year: 1990, role: "Mr. Bean's car" },
      { mediaType: "movie", title: "Bean: The Ultimate Disaster Movie", year: 1997, role: "Mr. Bean's car" },
      { mediaType: "movie", title: "Mr. Bean's Holiday", year: 2007, role: "Mr. Bean's car" }
    ],
    iconicScene: "Mr. Bean drives his Mini while sitting in an armchair strapped to the roof, steering through the window with a broom handle.",
    culturalImpact: "Mr. Bean's Mini is one of the most recognizable comedy vehicles ever created.",
    funFact: "The original Mini used in the show was a modified 1977 British Leyland Mini 1000 with a special seat on the roof.",
    notableDrivers: ["Mr. Bean"],
    isFeatured: false
  },
  {
    id: "aztek-pontiac",
    slug: "aztek-pontiac",
    name: "Pontiac Aztek",
    year: 2001,
    make: "Pontiac",
    model: "Aztek",
    bodyType: "Crossover SUV",
    image: "/images/cars/aztek-pontiac.jpg",
    description: "The Pontiac Aztek became an unlikely icon as Walter White's vehicle in Breaking Bad. Often cited as one of the ugliest cars ever made, the beige Aztek perfectly suited Walter White's unassuming, suburban chemistry teacher persona.",
    specs: {
      engine: "3.4L V6",
      horsepower: 185,
      topSpeed: 110,
      zeroToSixty: 9.8,
      transmission: "4-speed automatic",
      drivetrain: "FWD",
      weight: 3801
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Breaking_Bad_Pontiac_Aztek_%2830839293343%29.jpg/1280px-Breaking_Bad_Pontiac_Aztek_%2830839293343%29.jpg",
    appearances: [
      { mediaType: "tv-series", title: "Breaking Bad", year: 2008, role: "Walter White's family car" }
    ],
    iconicScene: "Walter White drives his Aztek through the Albuquerque desert, looking completely out of place among the rugged terrain.",
    culturalImpact: "Breaking Bad made the Pontiac Aztek into a beloved pop culture artifact.",
    funFact: "The show's creators deliberately chose the Aztek because it was widely considered the ugliest car on the road.",
    notableDrivers: ["Walter White"],
    isFeatured: false
  },
  {
    id: "supra-mk4-1995",
    slug: "supra-mk4-1995",
    name: "Toyota Supra MK IV",
    year: 1995,
    make: "Toyota",
    model: "Supra Turbo",
    bodyType: "Sports Car",
    image: "/images/cars/supra-mk4-1995.jpg",
    description: "The orange Toyota Supra MK IV Turbo with its massive rear wing is one of the most iconic Japanese sports cars in cinema history. Brian O'Conner's Supra, built for the quarter-mile, features extensive modifications including a huge turbocharger and nitrous injection.",
    specs: {
      engine: "3.0L 2JZ-GTE Inline-6 Twin-Turbo",
      horsepower: 320,
      topSpeed: 155,
      zeroToSixty: 5.0,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 3460
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Toyota_Supra_Fast_and_Furious_%28Petersen%29.jpg/1280px-Toyota_Supra_Fast_and_Furious_%28Petersen%29.jpg",
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious", year: 2001, role: "Brian O'Conner's race car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "2 Fast 2 Furious", year: 2003, role: "Brian O'Conner's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast & Furious 6", year: 2013, role: "Brian O'Conner's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Brian O'Conner's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Brian revs his orange Supra next to Dom's black Dodge Charger at a traffic light, exhaust popping as both drivers prepare for the first race.",
    culturalImpact: "The orange Supra kicked off the import tuner craze of the early 2000s and caused prices of the Toyota Supra MK IV to skyrocket.",
    funFact: "The Supra used in the film had a functional nitrous system producing over 550 horsepower. It sold at auction for $550,000 in 2021.",
    notableDrivers: ["Brian O'Conner"],
    isFeatured: true
  },
  {
    id: "charger-rt-1970",
    slug: "charger-rt-1970",
    name: "Dodge Charger R/T",
    year: 1970,
    make: "Dodge",
    model: "Charger R/T",
    bodyType: "Muscle Car",
    image: "/images/cars/charger-rt-1970.jpg",
    description: "Dominic Toretto's black 1970 Dodge Charger R/T is the beating heart of the Fast & Furious franchise. With its massive 426 HEMI V8, supercharger sticking through the hood, and signature gray primer, this car represents Dom's loyalty to family and old school muscle car ethos.",
    specs: {
      engine: "7.2L 440 Magnum V8",
      horsepower: 375,
      topSpeed: 140,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3700
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Dodge_Charger_1970_%28The_Fast_and_the_Furious_%282001%29%29.jpg",
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious", year: 2001, role: "Dom Toretto's race car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast & Furious", year: 2009, role: "Dom's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Dom's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Dom's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "The Fate of the Furious", year: 2017, role: "Dom's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "F9", year: 2021, role: "Dom's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast X", year: 2023, role: "Dom's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Dom's Charger faces off against a Ferrari in Rio de Janeiro, the supercharger whining as it launches off the line pulling a wheelie.",
    culturalImpact: "Dom's Charger is the most famous modern movie muscle car and represents the soul of the Fast & Furious franchise.",
    funFact: "The Charger was fitted with a custom chassis and coil-over suspension. The filmmakers destroyed over 30 Chargers during the franchise.",
    notableDrivers: ["Dominic Toretto"],
    isFeatured: true
  },
  {
    id: "audi-r8-2008",
    slug: "audi-r8-2008",
    name: "Audi R8",
    year: 2008,
    make: "Audi",
    model: "R8",
    bodyType: "Supercar",
    image: "/images/cars/audi-r8-2008.jpg",
    description: "The Audi R8 is the sleek German supercar driven by Tony Stark in Iron Man. Its sophisticated lines and powerful V8 perfectly matched Stark's billionaire playboy persona, and the car's advanced technology mirrored Stark Industries' cutting-edge innovations.",
    specs: {
      engine: "4.2L V8 FSI",
      horsepower: 420,
      topSpeed: 187,
      zeroToSixty: 4.4,
      transmission: "6-speed automated manual",
      drivetrain: "AWD",
      weight: 3615
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Audi_R8_4.2_FSI_quattro_%28Typ_42%29_silver.jpg",
    appearances: [
      { mediaType: "movie", title: "Iron Man", year: 2008, role: "Tony Stark's personal car", franchise: "Marvel Cinematic Universe" },
      { mediaType: "movie", title: "Iron Man 2", year: 2010, role: "Tony Stark's car", franchise: "Marvel Cinematic Universe" },
      { mediaType: "movie", title: "The Avengers", year: 2012, role: "Tony Stark's car", franchise: "Marvel Cinematic Universe" }
    ],
    iconicScene: "Tony Stark speeds through the streets of Monaco in his R8, arriving at the Grand Prix in style before getting attacked by Ivan Vanko.",
    culturalImpact: "The R8's appearance in Iron Man helped establish Audi as a leading luxury brand in Hollywood.",
    funFact: "Audi provided the R8 for Iron Man before the car was even officially released.",
    notableDrivers: ["Tony Stark / Iron Man"],
    isFeatured: false
  },
  {
    id: "ferrari-250-gt-1961",
    slug: "ferrari-250-gt-1961",
    name: "Ferrari 250 GT California",
    year: 1961,
    make: "Ferrari",
    model: "250 GT California Spyder",
    bodyType: "Convertible",
    image: "/images/cars/ferrari-250-gt-1961.jpg",
    description: "The 1961 Ferrari 250 GT California Spyder is the stunning Italian convertible that Cameron's father treasures more than anything in Ferris Bueller's Day Off. When Ferris takes it for a joyride through Chicago, the film builds toward the heart-stopping moment when the odometer reverses in the garage.",
    specs: {
      engine: "3.0L Colombo V12",
      horsepower: 280,
      topSpeed: 150,
      zeroToSixty: 7.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 2300
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Ferrari_250_GT_California_Replica_Ferris_Bueller.jpg/1280px-Ferrari_250_GT_California_Replica_Ferris_Bueller.jpg",
    appearances: [
      { mediaType: "movie", title: "Ferris Bueller's Day Off", year: 1986, role: "Cameron's father's prized Ferrari" }
    ],
    iconicScene: "The Ferrari reverses off the jack in Cameron's garage, rolls backward through a glass window, and plummets down a ravine.",
    culturalImpact: "The 250 GT California is one of the most valuable Ferraris ever made. The destruction scene is one of the most memorable moments in comedy cinema.",
    funFact: "The destroyed Ferrari was actually a replica built on a De Tomaso Pantera chassis. Only three real 250 GT California Spyders exist.",
    notableDrivers: ["Ferris Bueller", "Cameron Frye"],
    isFeatured: false
  },
  {
    id: "christine-1958",
    slug: "christine-1958",
    name: "Plymouth Fury",
    year: 1958,
    make: "Plymouth",
    model: "Fury",
    bodyType: "Sedan",
    image: "/images/cars/christine-1958.jpg",
    description: "Christine is a 1958 Plymouth Fury with a sinister supernatural personality. The gleaming red and white coupe is a jealous, murderous entity that can repair itself from any damage and will stop at nothing to possess its owner.",
    specs: {
      engine: "5.2L V8",
      horsepower: 305,
      topSpeed: 130,
      zeroToSixty: 7.7,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 3800
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Christine_1958_Plymouth_Fury.jpg/1280px-Christine_1958_Plymouth_Fury.jpg",
    appearances: [
      { mediaType: "movie", title: "Christine", year: 1983, role: "Sentient killer car" }
    ],
    iconicScene: "Christine, smashed nearly beyond recognition, slowly and eerily rebuilds herself in the garage, crumpled metal straightening as her radio crackles back to life.",
    culturalImpact: "Christine is the definitive killer car movie and set the template for possessed vehicle horror.",
    funFact: "The production used 23 different 1958 Plymouth Furys, including 17 that were destroyed during filming.",
    notableDrivers: ["Arnie Cunningham"],
    isFeatured: false
  },
  {
    id: "eleanor-1967",
    slug: "eleanor-1967",
    name: "Eleanor",
    year: 1967,
    make: "Shelby",
    model: "GT500 Mustang",
    bodyType: "Muscle Car",
    image: "/images/cars/eleanor-1967.jpg",
    description: "Eleanor is a highly customized 1967 Shelby GT500 Mustang painted in silver and black, built specifically for the 2000 remake of Gone in 60 Seconds. The ultimate getaway car must be stolen within 24 hours to save the hero's brother.",
    specs: {
      engine: "7.0L 427 FE V8",
      horsepower: 355,
      topSpeed: 133,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3370
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shelby_Mustang_GT500_%22Eleanor%22_-1967.jpeg",
    appearances: [
      { mediaType: "movie", title: "Gone in 60 Seconds", year: 2000, role: "The ultimate car to steal" },
      { mediaType: "movie", title: "Gone in 60 Seconds", year: 1974, role: "The ultimate car to steal" }
    ],
    iconicScene: "Memphis Raines jumps Eleanor through a wet gap between two open drawbridges, landing with sparks flying.",
    culturalImpact: "Eleanor became the most famous Mustang in movie history after Bullitt and inspired countless replica builds.",
    funFact: "Eleanor was built by Cinema Vehicle Services and only 11 were produced for the film.",
    notableDrivers: ["Memphis Raines"],
    isFeatured: true
  },
  {
    id: "porsche-928-1981",
    slug: "porsche-928-1981",
    name: "Porsche 928",
    year: 1981,
    make: "Porsche",
    model: "928",
    bodyType: "Grand Tourer",
    image: "/images/cars/porsche-928-1981.jpg",
    description: "The Porsche 928 is the sleek German grand tourer driven by Joel Goodson in Risky Business. The iconic scene of Tom Cruise sliding across the floor in his socks and dress shirt while air-guitaring to 'Old Time Rock and Roll' is forever linked to this powerful V8 coupe.",
    specs: {
      engine: "4.7L V8",
      horsepower: 231,
      topSpeed: 143,
      zeroToSixty: 7.8,
      transmission: "4-speed automatic",
      drivetrain: "RWD",
      weight: 3150
    },
    appearances: [
      { mediaType: "movie", title: "Risky Business", year: 1983, role: "Joel's father's Porsche" }
    ],
    iconicScene: "Tom Cruise slides across the living room floor in his socks, shirt, and underwear, dancing to Bob Seger's 'Old Time Rock and Roll' next to the gleaming Porsche 928.",
    culturalImpact: "The film cemented the Porsche 928 as a symbol of 1980s yuppie success and teenage rebellion.",
    funFact: "The Porsche 928 was actually Porsche's attempt to replace the 911.",
    notableDrivers: ["Joel Goodson"],
    isFeatured: false
  },
  {
    id: "challenger-1970",
    slug: "challenger-1970",
    name: "Dodge Challenger",
    year: 1970,
    make: "Dodge",
    model: "Challenger R/T",
    bodyType: "Muscle Car",
    image: "/images/cars/challenger-1970.jpg",
    description: "The 1970 Dodge Challenger R/T is the white muscle car driven by Kowalski in the cult classic Vanishing Point. Racing across the American Southwest against impossible odds and a police blockade, the Challenger represents pure freedom and rebellion.",
    specs: {
      engine: "7.2L 440 Magnum V8",
      horsepower: 375,
      topSpeed: 140,
      zeroToSixty: 6.0,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3500
    },
    appearances: [
      { mediaType: "movie", title: "Vanishing Point", year: 1971, role: "Kowalski's getaway car" }
    ],
    iconicScene: "Kowalski pushes the Challenger to its absolute limit across the salt flats, the engine screaming as the car becomes a blur against the empty desert.",
    culturalImpact: "Vanishing Point is the ultimate road rage film and the 1970 Challenger became a symbol of counter-culture freedom.",
    funFact: "The Challenger used in the film was a 1970 model year car, and only five were built for the production.",
    notableDrivers: ["Kowalski"],
    isFeatured: false
  },
  {
    id: "lincoln-continental-1941",
    slug: "lincoln-continental-1941",
    name: "Lincoln Continental",
    year: 1941,
    make: "Lincoln",
    model: "Continental",
    bodyType: "Luxury Sedan",
    image: "/images/cars/lincoln-continental-1941.jpg",
    description: "The 1941 Lincoln Continental is the stately black sedan forever associated with Marlon Brando's Vito Corleone in The Godfather. This elegant pre-war luxury car perfectly embodies the power, respect, and old-world gravitas of the Corleone family.",
    specs: {
      engine: "4.8L V12",
      horsepower: 125,
      topSpeed: 90,
      zeroToSixty: 14.0,
      transmission: "3-speed manual",
      drivetrain: "RWD",
      weight: 3840
    },
    appearances: [
      { mediaType: "movie", title: "The Godfather", year: 1972, role: "Don Corleone's car" },
      { mediaType: "movie", title: "The Godfather Part II", year: 1974, role: "Young Vito Corleone's car" }
    ],
    iconicScene: "Don Corleone emerges from the Lincoln Continental in his daughter's wedding suit, dispensing wisdom in the opening scene of The Godfather.",
    culturalImpact: "The 1941 Lincoln Continental is the definitive mafia movie car.",
    funFact: "The Continental's suicide doors (rear-hinged) were a deliberate choice by filmmakers to emphasize elegance.",
    notableDrivers: ["Don Vito Corleone"],
    isFeatured: false
  },
  {
    id: "a-team-vandura-1982",
    slug: "a-team-vandura-1982",
    name: "GMC Vandura",
    year: 1982,
    make: "GMC",
    model: "Vandura",
    bodyType: "Van",
    image: "/images/cars/a-team-vandura-1982.jpg",
    description: "The black 1982 GMC Vandura with its distinctive red stripe is the mobile headquarters for the A-Team. Driven by B.A. Baracus, this rugged van carried the team's weapons, disguises, and equipment as they helped those in trouble.",
    specs: {
      engine: "5.7L 350 V8",
      horsepower: 160,
      topSpeed: 100,
      zeroToSixty: 12.5,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 4200
    },
    appearances: [
      { mediaType: "tv-series", title: "The A-Team", year: 1983, role: "The A-Team's transport" },
      { mediaType: "movie", title: "The A-Team", year: 2010, role: "The A-Team's truck" }
    ],
    iconicScene: "B.A. angrily discovers that Hannibal has tricked him again, slamming the van's door while muttering 'I ain't gettin' on no plane!'",
    culturalImpact: "The A-Team van is one of the most recognizable TV vehicles ever made.",
    funFact: "The van used in the show was a 1982 GMC Vandura with a custom paint job, no special modifications otherwise.",
    notableDrivers: ["B.A. Baracus", "Hannibal Smith"],
    isFeatured: false
  },
  {
    id: "italian-job-mini-1968",
    slug: "italian-job-mini-1968",
    name: "Mini Cooper",
    year: 1968,
    make: "Mini",
    model: "Cooper S",
    bodyType: "Compact Car",
    image: "/images/cars/italian-job-mini-1968.jpg",
    description: "The red, white, and blue Mini Coopers from The Italian Job are three of the most famous small cars in cinema history. Used for a gold heist in Turin's traffic, their small size allows them to weave through sewers, staircases, and impossibly tight spaces.",
    specs: {
      engine: "1.3L Inline-4",
      horsepower: 76,
      topSpeed: 91,
      zeroToSixty: 10.5,
      transmission: "4-speed manual",
      drivetrain: "FWD",
      weight: 1411
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Mini_Cooper_in_The_Italian_Job.jpg/1280px-Mini_Cooper_in_The_Italian_Job.jpg",
    appearances: [
      { mediaType: "movie", title: "The Italian Job", year: 1969, role: "Gold heist getaway cars" },
      { mediaType: "movie", title: "The Italian Job", year: 2003, role: "Heist getaway cars" }
    ],
    iconicScene: "The three Minis careen through the Turin sewers, emerge onto city streets, and drive up a ramp onto the back of a moving truck.",
    culturalImpact: "The Italian Job made the Mini Cooper a global cultural icon.",
    funFact: "Three Minis were used for the original film, painted red, white, and blue to represent the Union Jack.",
    notableDrivers: ["Charlie Croker"],
    isFeatured: false
  },
  {
    id: "chevelle-ss-1970",
    slug: "chevelle-ss-1970",
    name: "Chevrolet Chevelle SS",
    year: 1970,
    make: "Chevrolet",
    model: "Chevelle SS 454",
    bodyType: "Muscle Car",
    image: "/images/cars/chevelle-ss-1970.jpg",
    description: "The 1970 Chevrolet Chevelle SS 454 is a brutish American muscle car that appears prominently in the Fast & Furious franchise. Its massive 454 cubic inch V8 and aggressive styling represent the raw power of classic American engineering.",
    specs: {
      engine: "7.4L LS6 V8",
      horsepower: 450,
      topSpeed: 133,
      zeroToSixty: 5.4,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3600
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/16/1970_Chevrolet_Chevelle_Malibu_SS_Coupe_5.7.jpg",
    appearances: [
      { mediaType: "movie", title: "Fast & Furious", year: 2009, role: "Dom's family car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Dom's muscle car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The Chevelle SS roars through the streets of Rio, its LS6 V8 drowning out traffic as Dom uses it to pull a bank vault.",
    culturalImpact: "The Chevelle SS is one of the most recognizable muscle cars in the Fast & Furious franchise.",
    funFact: "The Chevelle SS used in Fast Five was fitted with a modern LS3 crate engine producing over 500 horsepower.",
    notableDrivers: ["Dominic Toretto"],
    isFeatured: false
  },
  {
    id: "rx7-1993",
    slug: "rx7-1993",
    name: "Mazda RX-7",
    year: 1993,
    make: "Mazda",
    model: "RX-7 FD3S",
    bodyType: "Sports Car",
    image: "/images/cars/rx7-1993.jpg",
    description: "The orange 1993 Mazda RX-7 FD3S is a rotary-powered Japanese sports car that appears in the Fast & Furious franchise. Han Seoul-Oh drives a sleek VeilSide RX-7 in Tokyo Drift, making it one of the most recognizable JDM cars in film.",
    specs: {
      engine: "1.3L 13B-REW Twin-Turbo Rotary",
      horsepower: 255,
      topSpeed: 156,
      zeroToSixty: 5.2,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2800
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/VeilSide_Fortube_RX-7_in_the_Fast_and_the_Furious_Tokyo_Drift_%282%29.jpg",
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious: Tokyo Drift", year: 2006, role: "Han Seoul-Oh's drift car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast & Furious", year: 2009, role: "Han's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Han's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Han's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Han drifts the RX-7 through the tight streets of Tokyo, orange neon glow reflecting off the bodywork as the rotary engine screams.",
    culturalImpact: "The VeilSide RX-7 is one of the most famous drift cars in film history.",
    funFact: "The RX-7 used in Tokyo Drift was fitted with a fully functional VeilSide body kit.",
    notableDrivers: ["Han Seoul-Oh"],
    isFeatured: false
  },
  {
    id: "eclipse-1995",
    slug: "eclipse-1995",
    name: "Mitsubishi Eclipse",
    year: 1995,
    make: "Mitsubishi",
    model: "Eclipse GSX",
    bodyType: "Sports Car",
    image: "/images/cars/eclipse-1995.jpg",
    description: "The green 1995 Mitsubishi Eclipse GSX driven by Brian O'Conner in The Fast and the Furious launched the import tuner revolution. With its massive rear wing, aftermarket body kit, and nitrous oxide system, it was the perfect undercover car for a cop infiltrating street racing.",
    specs: {
      engine: "2.0L 4G63T Inline-4 Turbo",
      horsepower: 210,
      topSpeed: 143,
      zeroToSixty: 6.1,
      transmission: "5-speed manual",
      drivetrain: "AWD",
      weight: 3230
    },
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious", year: 2001, role: "Brian O'Conner's undercover car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Brian jumps his Eclipse across a railway crossing, the car's body flexing as it lands hard, barely escaping an oncoming train.",
    culturalImpact: "The Eclipse was the most influential tuner car of the early 2000s.",
    funFact: "The Eclipse used in the film was powered by a 4G63 engine from an Eagle Talon and produced around 400 horsepower.",
    notableDrivers: ["Brian O'Conner"],
    isFeatured: false
  },
  {
    id: "skyline-r34-1999",
    slug: "skyline-r34-1999",
    name: "Nissan Skyline GT-R R34",
    year: 1999,
    make: "Nissan",
    model: "Skyline GT-R R34",
    bodyType: "Sports Car",
    image: "/images/cars/skyline-r34-1999.jpg",
    description: "The Nissan Skyline GT-R R34 is the legendary Japanese supercar that defined the Fast & Furious franchise. Brian O'Conner's silver GT-R with the 'Godzilla' nickname represents the pinnacle of Japanese automotive engineering with its ATTESA all-wheel-drive system and RB26DETT engine.",
    specs: {
      engine: "2.6L RB26DETT Twin-Turbo Inline-6",
      horsepower: 276,
      topSpeed: 155,
      zeroToSixty: 4.9,
      transmission: "6-speed manual",
      drivetrain: "AWD",
      weight: 3417
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nissan_Skyline_-_2_Fast_2_Furious.JPG",
    appearances: [
      { mediaType: "movie", title: "2 Fast 2 Furious", year: 2003, role: "Brian O'Conner's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast & Furious", year: 2009, role: "Brian's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Brian's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Brian's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Brian and Dom race their GT-R and Charger through LA streets, the Skyline's ATTESA system clawing through corners.",
    culturalImpact: "The R34 Skyline GT-R is arguably the most famous Japanese car ever put on film.",
    funFact: "The R34 GT-R used in the films was illegal to import into the US at the time, requiring special NHTSA permission.",
    notableDrivers: ["Brian O'Conner"],
    isFeatured: false
  },
  {
    id: "eclipse-spyder-2003",
    slug: "eclipse-spyder-2003",
    name: "Mitsubishi Eclipse Spyder",
    year: 2003,
    make: "Mitsubishi",
    model: "Eclipse Spyder GTS",
    bodyType: "Convertible",
    image: "/images/cars/eclipse-spyder-2003.jpg",
    description: "The yellow 2003 Mitsubishi Eclipse Spyder driven by Suki in 2 Fast 2 Furious is one of the most memorable cars of the franchise. Decked out with custom bodywork, neon lights, and a sound system that shakes buildings, it perfectly represents the flashy Miami street racing scene.",
    specs: {
      engine: "3.0L V6",
      horsepower: 210,
      topSpeed: 130,
      zeroToSixty: 7.7,
      transmission: "4-speed automatic",
      drivetrain: "FWD",
      weight: 3270
    },
    appearances: [
      { mediaType: "movie", title: "2 Fast 2 Furious", year: 2003, role: "Suki's show car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Suki shows off her Eclipse Spyder at the Miami street race, the hydraulics bouncing the car as she confidently challenges the boys.",
    culturalImpact: "Suki's Eclipse Spyder broke gender stereotypes in the tuner scene and became a fan favorite.",
    funFact: "The Eclipse Spyder was actually owned by the film's costume designer, who modified it with hydraulic suspension.",
    notableDrivers: ["Suki"],
    isFeatured: false
  },
  {
    id: "mustang-mach-1-1971",
    slug: "mustang-mach-1-1971",
    name: "Ford Mustang Mach 1",
    year: 1971,
    make: "Ford",
    model: "Mustang Mach 1",
    bodyType: "Muscle Car",
    image: "/images/cars/mustang-mach-1-1971.jpg",
    description: "The red 1971 Ford Mustang Mach 1 driven by James Bond in Diamonds Are Forever is a departure from Bond's usual European exotics. With its massive 429 V8 and aggressive styling, Bond proves he can handle American iron just as well as Aston Martins.",
    specs: {
      engine: "7.0L 429 Super Cobra Jet V8",
      horsepower: 375,
      topSpeed: 130,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3600
    },
    appearances: [
      { mediaType: "movie", title: "Diamonds Are Forever", year: 1971, role: "James Bond's car", franchise: "James Bond" }
    ],
    iconicScene: "Bond drives the Mustang Mach 1 through the neon-lit streets of Las Vegas, performing a two-wheel maneuver through a narrow alleyway.",
    culturalImpact: "The Mach 1 is one of the few American cars in Bond's illustrious garage.",
    funFact: "The two-wheel driving scene was achieved with special hydraulics and a professional stunt driver.",
    notableDrivers: ["James Bond / Sean Connery"],
    isFeatured: false
  },
  {
    id: "camaro-z28-1969",
    slug: "camaro-z28-1969",
    name: "Chevrolet Camaro Z28",
    year: 1969,
    make: "Chevrolet",
    model: "Camaro Z28",
    bodyType: "Muscle Car",
    image: "/images/cars/camaro-z28-1969.jpg",
    description: "The 1969 Chevrolet Camaro Z28 is a classic first-generation pony car that appears in the Fast & Furious franchise. Its muscular stance, aggressive styling, and powerful small-block V8 made it a natural fit for the series.",
    specs: {
      engine: "5.0L 302 V8",
      horsepower: 290,
      topSpeed: 130,
      zeroToSixty: 6.8,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3290
    },
    appearances: [
      { mediaType: "movie", title: "Fast & Furious", year: 2009, role: "Letty's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Letty's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Letty Ortiz guns the Camaro Z28 through the streets of LA, her street-racing skills matching Dom's as the small-block V8 screams toward redline.",
    culturalImpact: "The Z28 helped introduce classic American muscle to a new generation through the Fast & Furious franchise.",
    funFact: "The 1969 Z28 was built to compete in the SCCA Trans-Am series.",
    notableDrivers: ["Letty Ortiz"],
    isFeatured: false
  },
  {
    id: "mclaren-720s-2017",
    slug: "mclaren-720s-2017",
    name: "McLaren 720S",
    year: 2017,
    make: "McLaren",
    model: "720S",
    bodyType: "Supercar",
    image: "/images/cars/mclaren-720s-2017.jpg",
    description: "The McLaren 720S is a British supercar that represents the bleeding edge of automotive technology. Its twin-turbo V8 and dihedral doors embody the Fast & Furious franchise's shift from street tuners to global supercar action.",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: 710,
      topSpeed: 212,
      zeroToSixty: 2.8,
      transmission: "7-speed SSG",
      drivetrain: "RWD",
      weight: 3128
    },
    appearances: [
      { mediaType: "movie", title: "The Fate of the Furious", year: 2017, role: "F8 crew vehicle", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast X", year: 2023, role: "Crew vehicle", franchise: "Fast & Furious" }
    ],
    iconicScene: "The 720S rockets through the ice fields of Siberia, its active aerodynamics cutting through the frozen landscape.",
    culturalImpact: "The 720S showcases the Fast & Furious franchise's evolution into global supercar spectacle.",
    funFact: "The 720S's name comes from its 720 metric horsepower (710 bhp).",
    notableDrivers: ["Deckard Shaw", "Dominic Toretto"],
    isFeatured: false
  },
]

export const PART_2: Car[] = [
  {
    id: "koenigsegg-ccxr-2010",
    slug: "koenigsegg-ccxr-2010",
    name: "Koenigsegg CCXR",
    year: 2010,
    make: "Koenigsegg",
    model: "CCXR",
    bodyType: "Hypercar",
    image: "/images/cars/koenigsegg-ccxr-2010.jpg",
    description: "The Koenigsegg CCXR is a Swedish hypercar that represents automotive excess in the Fast & Furious franchise. With its optional biofuel-compatible V8 producing over 1000 horsepower, the CCXR is one of the most extreme production cars ever built.",
    specs: {
      engine: "4.7L Twin-Supercharged V8",
      horsepower: 1018,
      topSpeed: 250,
      zeroToSixty: 3.1,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 2601
    },
    appearances: [
      { mediaType: "movie", title: "Fast & Furious 6", year: 2013, role: "Owen Shaw's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The CCXR screams down a runway as Owen Shaw deploys his EMP device, disabling everything electronic around him.",
    culturalImpact: "The CCXR introduced mainstream audiences to the Koenigsegg brand.",
    funFact: "The CCXR can run on standard gasoline, E85 biofuel, or any mixture of the two.",
    notableDrivers: ["Owen Shaw"],
    isFeatured: false
  },
  {
    id: "bugatti-veyron-2011",
    slug: "bugatti-veyron-2011",
    name: "Bugatti Veyron",
    year: 2011,
    make: "Bugatti",
    model: "Veyron 16.4",
    bodyType: "Hypercar",
    image: "/images/cars/bugatti-veyron-2011.jpg",
    description: "The Bugatti Veyron 16.4 is a German-engineered, French-branded hypercar that defined the limits of automotive performance. Appearing in Furious 7, its quad-turbo W16 engine and 253 mph top speed represent the absolute pinnacle of automotive achievement.",
    specs: {
      engine: "8.0L Quad-Turbo W16",
      horsepower: 1001,
      topSpeed: 253,
      zeroToSixty: 2.5,
      transmission: "7-speed DSG",
      drivetrain: "AWD",
      weight: 4162
    },
    appearances: [
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Deckard Shaw's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The Veyron races through the mountains of Azerbaijan, its engine a deep roar as it rockets past the crew's cars.",
    culturalImpact: "The Veyron redefined what a production car could achieve and set the standard for the modern hypercar wars.",
    funFact: "The Veyron's cooling system requires ten separate radiators. At 250 mph, its tires last only 15 minutes.",
    notableDrivers: ["Deckard Shaw"],
    isFeatured: false
  },
  {
    id: "batmobile-1989",
    slug: "batmobile-1989",
    name: "1989 Batmobile",
    year: 1989,
    make: "Custom",
    model: "Batmobile",
    bodyType: "Concept Car",
    image: "/images/cars/batmobile-1989.jpg",
    description: "The 1989 Batmobile designed by Anton Furst for Tim Burton's Batman is a Gothic, art-deco masterpiece. Long, low, and sinister, it combines jet fighter influences with a massive turbine engine and a quick-release steering wheel that doubles as a grappling device.",
    specs: {
      engine: "5.4L 327 Chevrolet V8",
      horsepower: 340,
      topSpeed: 140,
      zeroToSixty: 5.5,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 5000
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/1989_Batmobile_at_Warner_Bros_Studio.jpg/1280px-1989_Batmobile_at_Warner_Bros_Studio.jpg",
    appearances: [
      { mediaType: "movie", title: "Batman", year: 1989, role: "Batman's vehicle", franchise: "Batman" },
      { mediaType: "movie", title: "Batman Returns", year: 1992, role: "Batman's vehicle", franchise: "Batman" }
    ],
    iconicScene: "The Batmobile glides through the Gothic streets of Gotham, its massive turbine engine glowing as Batman pursues the Joker.",
    culturalImpact: "The 1989 Batmobile is considered by many to be the most beautiful Batmobile ever designed.",
    funFact: "The car was built on a Chevy Impala chassis and was 22 feet long. The 'turbine' was a modified propane heater that shot flames.",
    notableDrivers: ["Batman / Bruce Wayne"],
    isFeatured: false
  },
  {
    id: "db10-2016",
    slug: "db10-2016",
    name: "Aston Martin DB10",
    year: 2016,
    make: "Aston Martin",
    model: "DB10",
    bodyType: "Grand Tourer",
    image: "/images/cars/db10-2016.jpg",
    description: "The Aston Martin DB10 was built exclusively for James Bond's Spectre, with only ten examples ever produced. This sleek, aggressive grand tourer features a modified V8 and represents the evolution of Bond's relationship with Aston Martin.",
    specs: {
      engine: "4.7L V8",
      horsepower: 430,
      topSpeed: 190,
      zeroToSixty: 4.3,
      transmission: "7-speed automated manual",
      drivetrain: "RWD",
      weight: 3300
    },
    appearances: [
      { mediaType: "movie", title: "Spectre", year: 2015, role: "James Bond's car", franchise: "James Bond" }
    ],
    iconicScene: "Bond evades Mr. Hinx's Jaguar through the narrow streets of Rome at night, deploying ejector seat and flamethrower gadgets.",
    culturalImpact: "The DB10 is one of the rarest and most exclusive Bond cars, with only ten ever built.",
    funFact: "Of the ten DB10s built, seven were used for filming and three for promotional duties. Only two are believed to still exist running.",
    notableDrivers: ["James Bond / Daniel Craig"],
    isFeatured: false
  },
  {
    id: "de-tomaso-pantera-1972",
    slug: "de-tomaso-pantera-1972",
    name: "De Tomaso Pantera",
    year: 1972,
    make: "De Tomaso",
    model: "Pantera",
    bodyType: "Sports Car",
    image: "/images/cars/de-tomaso-pantera-1972.jpg",
    description: "The De Tomaso Pantera is an Italian sports car with American V8 muscle that appears in Fast Five. Designed by Ghia, the Pantera combines Italian styling with a Ford-sourced V8, making it a unique hybrid of European design and American power.",
    specs: {
      engine: "5.8L Ford 351 Cleveland V8",
      horsepower: 330,
      topSpeed: 158,
      zeroToSixty: 5.8,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 3131
    },
    appearances: [
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Vince's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The Pantera roars through the streets of Rio as the crew prepares for the heist, its throaty V8 echoing between buildings.",
    culturalImpact: "The Pantera is a cult classic among car enthusiasts.",
    funFact: "The Pantera was sold through Lincoln-Mercury dealerships in the US in the early 1970s.",
    notableDrivers: ["Vince"],
    isFeatured: false
  },
  {
    id: "gran-torino-sport-1972",
    slug: "gran-torino-sport-1972",
    name: "Ford Gran Torino Sport",
    year: 1972,
    make: "Ford",
    model: "Gran Torino Sport",
    bodyType: "Muscle Car",
    image: "/images/cars/gran-torino-sport-1972.jpg",
    description: "The 1972 Ford Gran Torino Sport is a classic American muscle car that appears in Fast & Furious. With its sleek fastback styling and powerful V8, it embodies the early 1970s muscle car era before emissions regulations stifled performance.",
    specs: {
      engine: "5.8L 351 Cobra Jet V8",
      horsepower: 375,
      topSpeed: 130,
      zeroToSixty: 7.5,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 3700
    },
    appearances: [
      { mediaType: "movie", title: "Fast & Furious", year: 2009, role: "Dominic Toretto's garage car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Dom revs the Gran Torino Sport in his garage, a testament to his love for classic American muscle.",
    culturalImpact: "The Gran Torino Sport represents the final years of the true muscle car era.",
    funFact: "The Gran Torino was Ford's answer to the Chevrolet Chevelle and Dodge Charger.",
    notableDrivers: ["Dominic Toretto"],
    isFeatured: false
  },
  {
    id: "civic-1992",
    slug: "civic-1992",
    name: "Honda Civic Hatchback",
    year: 1992,
    make: "Honda",
    model: "Civic EG Hatchback",
    bodyType: "Compact Car",
    image: "/images/cars/civic-1992.jpg",
    description: "The 1992 Honda Civic EG Hatchback is the quintessential tuner car from the Fast & Furious franchise. Lightweight, front-wheel drive, and highly modifiable, the Civic was the entry point for a generation of street racers.",
    specs: {
      engine: "1.6L D16Z6 Inline-4",
      horsepower: 125,
      topSpeed: 110,
      zeroToSixty: 8.5,
      transmission: "5-speed manual",
      drivetrain: "FWD",
      weight: 2100
    },
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious", year: 2001, role: "Tuner car in street race", franchise: "Fast & Furious" }
    ],
    iconicScene: "The slammed Civic hatchback with aftermarket body kit lines up at the start of the first street race.",
    culturalImpact: "The EG Civic hatchback was the most popular starter car in the early tuner scene.",
    funFact: "The Civic used in the first film was a 1992 Si model with a full body kit and nitrous.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "supra-mk4-1993",
    slug: "supra-mk4-1993",
    name: "Toyota Supra MK IV",
    year: 1993,
    make: "Toyota",
    model: "Supra Turbo",
    bodyType: "Sports Car",
    image: "/images/cars/supra-mk4-1993.jpg",
    description: "The 1993 Toyota Supra MK IV Turbo with its 2JZ-GTE engine is legendary among car enthusiasts. Featured in The Fast and the Furious, this white Supra demonstrates the incredible tuning potential of the 2JZ engine that can handle over 1000 horsepower.",
    specs: {
      engine: "3.0L 2JZ-GTE Twin-Turbo Inline-6",
      horsepower: 320,
      topSpeed: 155,
      zeroToSixty: 5.0,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 3460
    },
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious", year: 2001, role: "Brian O'Conner's second car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The white Supra rockets down the street, the 2JZ engine screaming as it hits the nitrous and pulls past the competition.",
    culturalImpact: "The 2JZ-GTE engine is one of the most legendary engines in automotive history.",
    funFact: "The 2JZ engine block was so over-engineered that it became the go-to platform for high-horsepower builds worldwide.",
    notableDrivers: ["Brian O'Conner"],
    isFeatured: false
  },
  {
    id: "s2000-2000",
    slug: "s2000-2000",
    name: "Honda S2000",
    year: 2000,
    make: "Honda",
    model: "S2000",
    bodyType: "Convertible",
    image: "/images/cars/s2000-2000.jpg",
    description: "The Honda S2000 is a rear-wheel-drive roadster with one of the highest-revving engines ever put in a production car. Its appearance in 2 Fast 2 Furious showcased the high-revving VTEC character that makes the S2000 a beloved Japanese sports car.",
    specs: {
      engine: "2.0L F20C Inline-4",
      horsepower: 240,
      topSpeed: 155,
      zeroToSixty: 5.4,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 2800
    },
    appearances: [
      { mediaType: "movie", title: "2 Fast 2 Furious", year: 2003, role: "Slap Jack's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The S2000 screams through Miami traffic, its VTEC engine wailing at 9000 rpm as it maneuvers through tight city streets.",
    culturalImpact: "The S2000 proved that Honda could build a world-class rear-wheel-drive sports car.",
    funFact: "The F20C engine produced 240 horsepower from just 2.0 liters, the highest specific output of any NA production engine at the time.",
    notableDrivers: ["Slap Jack"],
    isFeatured: false
  },
  {
    id: "silvia-s15-2001",
    slug: "silvia-s15-2001",
    name: "Nissan Silvia S15",
    year: 2001,
    make: "Nissan",
    model: "Silvia Spec-R S15",
    bodyType: "Sports Car",
    image: "/images/cars/silvia-s15-2001.jpg",
    description: "The Nissan Silvia S15 Spec-R is the ultimate drift machine from JDM legend. Featured in Tokyo Drift, this blue turbocharged coupe with its SR20DET engine and perfect weight distribution is the ideal platform for drifting.",
    specs: {
      engine: "2.0L SR20DET Turbo Inline-4",
      horsepower: 247,
      topSpeed: 146,
      zeroToSixty: 5.5,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 2734
    },
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious: Tokyo Drift", year: 2006, role: "Drift car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The Silvia slides sideways through a tight Tokyo alley, smoke pouring from its rear tires as the driver controls the drift.",
    culturalImpact: "The S15 Silvia is one of the most legendary drift cars ever made.",
    funFact: "The S15 was never officially sold in the United States, making the cars used in Tokyo Drift rare on American roads.",
    notableDrivers: ["Sean Boswell"],
    isFeatured: false
  },
  {
    id: "phantom-corsair-1938",
    slug: "phantom-corsair-1938",
    name: "Phantom Corsair",
    year: 1938,
    make: "Custom",
    model: "Phantom Corsair",
    bodyType: "Concept Car",
    image: "/images/cars/phantom-corsair-1938.jpg",
    description: "The 1938 Phantom Corsair is a one-off aerodynamic coupe that looks like it came from a science fiction film. Designed by Rust Heinz, this futuristic automobile featured a low-slung body, hidden headlamps, and suicide doors.",
    specs: {
      engine: "4.7L Cord V8",
      horsepower: 125,
      topSpeed: 115,
      zeroToSixty: 12.0,
      transmission: "4-speed manual",
      drivetrain: "FWD",
      weight: 3900
    },
    appearances: [
      { mediaType: "movie", title: "The Young in Heart", year: 1938, role: "The family car" }
    ],
    iconicScene: "The Phantom Corsair glides through the streets of the French Riviera, its futuristic lines drawing stares from everyone who sees it.",
    culturalImpact: "The Phantom Corsair is considered the most important American concept car of the pre-war era.",
    funFact: "Only one Phantom Corsair was ever built. Rust Heinz died in a car accident before production could begin.",
    notableDrivers: ["The Carleton Family"],
    isFeatured: false
  },
  {
    id: "chitty-chitty-bang-bang",
    slug: "chitty-chitty-bang-bang",
    name: "Chitty Chitty Bang Bang",
    year: 1910,
    make: "Custom",
    model: "Paragon Panther",
    bodyType: "Vintage Car",
    image: "/images/cars/chitty-chitty-bang-bang.jpg",
    description: "Chitty Chitty Bang Bang is the most famous flying car in cinema history. This magical vintage race car, built from a dismantled Grand Prix racer by the eccentric Caractacus Potts, can fly, float on water, and transform into a hovercraft.",
    specs: {
      engine: "6.0L Custom Inline-6",
      horsepower: 120,
      topSpeed: 60,
      zeroToSixty: 20.0,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3500
    },
    appearances: [
      { mediaType: "movie", title: "Chitty Chitty Bang Bang", year: 1968, role: "The Potts family magical car" }
    ],
    iconicScene: "Chitty spreads its wings and takes to the sky over the English countryside, the Potts family singing the title song as they soar above the clouds.",
    culturalImpact: "Chitty Chitty Bang Bang is the definitive flying car in family cinema.",
    funFact: "The car was designed by Harry Baker on a 1910 Napier chassis. The flying version had special aluminum and canvas wings.",
    notableDrivers: ["Caractacus Potts"],
    isFeatured: false
  },
  {
    id: "mach-5",
    slug: "mach-5",
    name: "Mach 5",
    year: 1967,
    make: "Custom",
    model: "Mach 5",
    bodyType: "Race Car",
    image: "/images/cars/mach-5.jpg",
    description: "The Mach 5 is the iconic white race car driven by Speed Racer, featuring steering wheel-mounted buttons that deploy a stunning array of gadgets. With saw blades for clearing obstacles, jacks for getting unstuck, and a homing pigeon for navigation.",
    specs: {
      engine: "7.0L V10",
      horsepower: 800,
      topSpeed: 280,
      zeroToSixty: 2.5,
      transmission: "7-speed sequential",
      drivetrain: "AWD",
      weight: 2200
    },
    appearances: [
      { mediaType: "animated-series", title: "Speed Racer", year: 1967, role: "Speed Racer's race car", franchise: "Speed Racer" },
      { mediaType: "movie", title: "Speed Racer", year: 2008, role: "Speed Racer's car", franchise: "Speed Racer" }
    ],
    iconicScene: "Speed Racer presses the 'R' button, deploying the Mach 5's saw blades to cut through a fallen tree blocking the race track.",
    culturalImpact: "The Mach 5 is one of the most recognizable animated vehicles of all time.",
    funFact: "The Mach 5's name comes from the '5' symbol on its hood, which is the Racer family crest.",
    notableDrivers: ["Speed Racer"],
    isFeatured: false
  },
  {
    id: "lightning-mcqueen",
    slug: "lightning-mcqueen",
    name: "Lightning McQueen",
    year: 2006,
    make: "Custom",
    model: "Lightning McQueen",
    bodyType: "Stock Car",
    image: "/images/cars/lightning-mcqueen.jpg",
    description: "Lightning McQueen is the red Piston Cup champion race car with the number 95, the star of Pixar's Cars franchise. Starting as a cocky rookie, McQueen learns that life is about more than winning, it's about friendship, community, and taking the scenic route.",
    specs: {
      engine: "7.0L V8",
      horsepower: 750,
      topSpeed: 200,
      zeroToSixty: 3.5,
      transmission: "6-speed sequential",
      drivetrain: "RWD",
      weight: 2900
    },
    appearances: [
      { mediaType: "animated-film", title: "Cars", year: 2006, role: "Main protagonist", franchise: "Cars" },
      { mediaType: "animated-film", title: "Cars 2", year: 2011, role: "Main protagonist", franchise: "Cars" },
      { mediaType: "animated-film", title: "Cars 3", year: 2017, role: "Main protagonist", franchise: "Cars" }
    ],
    iconicScene: "McQueen pushes Fabulous Hudson Hornet across the finish line in the final race of Cars, then carries his mentor across the dirt track.",
    culturalImpact: "Lightning McQueen is one of the most beloved animated characters of the 21st century.",
    funFact: "McQueen's number 95 references the year Pixar's Toy Story was released. His design was inspired by a NASCAR stock car and a Corvette C1.",
    notableDrivers: ["Lightning McQueen"],
    isFeatured: false
  },
  {
    id: "canyonero",
    slug: "canyonero",
    name: "Canyonero",
    year: 1995,
    make: "Custom",
    model: "Canyonero",
    bodyType: "SUV",
    image: "/images/cars/canyonero.jpg",
    description: "The Canyonero is a parody of enormous American SUVs from The Simpsons. Advertised with a jingle that describes it as 'the size of a barge,' the Canyonero is a gas-guzzling beast that represents everything wrong with American automotive excess in the 1990s.",
    specs: {
      engine: "8.0L V12",
      horsepower: 450,
      topSpeed: 95,
      zeroToSixty: 12.0,
      transmission: "3-speed automatic",
      drivetrain: "4WD",
      weight: 6500
    },
    appearances: [
      { mediaType: "animated-series", title: "The Simpsons", year: 1998, role: "Parody SUV" }
    ],
    iconicScene: "Homer Simpson drives a Canyonero through Springfield, the jingle booming: '12 yards long, 2 lanes wide, 65 tons of American pride!'",
    culturalImpact: "The Canyonero is one of TV's greatest automotive parodies, brilliantly satirizing the oversized SUV craze of the late 1990s.",
    funFact: "The Canyonero song parodies the theme from Rawhide, famously sung by Frankie Laine.",
    notableDrivers: ["Homer Simpson"],
    isFeatured: false
  },
  {
    id: "catbus",
    slug: "catbus",
    name: "Catbus",
    year: 1988,
    make: "Custom",
    model: "Catbus",
    bodyType: "Fantasy Vehicle",
    image: "/images/cars/catbus.jpg",
    description: "The Catbus is a magical, grinning feline-shaped bus with glowing eyes that serve as headlights. From Studio Ghibli's My Neighbor Totoro, this whimsical creature-bus carries children through the forest, along power lines, and across the countryside at supernatural speeds.",
    specs: {
      engine: "Magical",
      horsepower: 999,
      topSpeed: 200,
      zeroToSixty: 0.5,
      transmission: "Magical",
      drivetrain: "AWD",
      weight: 2000
    },
    appearances: [
      { mediaType: "animated-film", title: "My Neighbor Totoro", year: 1988, role: "Magical forest bus" }
    ],
    iconicScene: "The Catbus appears at a bus stop in the rain, its wide grin and glowing eyes welcoming Mei and Satsuki before carrying them through the forest canopy.",
    culturalImpact: "The Catbus is one of Studio Ghibli's most beloved creations.",
    funFact: "Hayao Miyazaki said the Catbus was inspired by a neighbor's cat that looked like a bus when it stretched.",
    notableDrivers: ["Mei Kusakabe", "Satsuki Kusakabe"],
    isFeatured: false
  },
  {
    id: "boss-429-mustang-1969",
    slug: "boss-429-mustang-1969",
    name: "Ford Mustang Boss 429",
    year: 1969,
    make: "Ford",
    model: "Mustang Boss 429",
    bodyType: "Muscle Car",
    image: "/images/cars/boss-429-mustang-1969.jpg",
    description: "The 1969 Ford Mustang Boss 429 is an ultra-rare homologation special built for NASCAR racing. Driven by John Wick in the franchise that bears his name, this dark green muscle car represents the Baba Yaga's lethal precision combined with raw American horsepower.",
    specs: {
      engine: "7.0L 429 Boss V8",
      horsepower: 375,
      topSpeed: 130,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3870
    },
    appearances: [
      { mediaType: "movie", title: "John Wick", year: 2014, role: "John Wick's personal car" },
      { mediaType: "movie", title: "John Wick: Chapter 2", year: 2017, role: "John Wick's stored car" }
    ],
    iconicScene: "John Wick opens a secret vault beneath his house to reveal his pristine Mustang, a symbol of his past life before the rampage begins.",
    culturalImpact: "The Boss 429 is one of the rarest and most valuable muscle cars ever made, with fewer than 1,400 produced.",
    funFact: "John Wick's car in the first film was actually a 1970 Mustang Mach 1, but the Boss 429 variant is often associated with the character by fans.",
    notableDrivers: ["John Wick"],
    isFeatured: false
  },
  {
    id: "buick-grand-national-1987",
    slug: "buick-grand-national-1987",
    name: "Buick Grand National",
    year: 1987,
    make: "Buick",
    model: "Grand National",
    bodyType: "Coupe",
    image: "/images/cars/buick-grand-national-1987.jpg",
    description: "The 1987 Buick Grand National is an all-black turbocharged V6 muscle car that dominated the American performance scene in the 1980s. Appearing in Fast & Furious 6, this menacing coupe could outrun most Ferraris and Corvettes of its era.",
    specs: {
      engine: "3.8L Turbo V6",
      horsepower: 245,
      topSpeed: 125,
      zeroToSixty: 6.1,
      transmission: "4-speed automatic",
      drivetrain: "RWD",
      weight: 3480
    },
    appearances: [
      { mediaType: "movie", title: "Fast & Furious 6", year: 2013, role: "Roman's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Roman Pearce guns the Grand National through the streets of London, the turbocharged V6 whistling as he keeps pace with the supercars.",
    culturalImpact: "The Grand National proved that turbocharging and American muscle could coexist beautifully.",
    funFact: "Buick de-rated the horsepower rating to avoid insurance surcharges. Actual output was closer to 300 hp.",
    notableDrivers: ["Roman Pearce"],
    isFeatured: false
  },
  {
    id: "nissan-240sx-1997",
    slug: "nissan-240sx-1997",
    name: "Nissan 240SX",
    year: 1997,
    make: "Nissan",
    model: "240SX S14",
    bodyType: "Sports Car",
    image: "/images/cars/nissan-240sx-1997.jpg",
    description: "The Nissan 240SX S14 is a rear-wheel-drive Japanese sports car that became a favorite among drift and street racing enthusiasts. Its lightweight chassis and KA24DE engine made it the ideal affordable platform for modification.",
    specs: {
      engine: "2.4L KA24DE Inline-4",
      horsepower: 155,
      topSpeed: 130,
      zeroToSixty: 8.5,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2800
    },
    appearances: [
      { mediaType: "movie", title: "The Fast and the Furious", year: 2001, role: "Tuner car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The 240SX appears in the background of the first street race, its lowered stance showing the diversity of the LA tuner scene.",
    culturalImpact: "The 240SX is one of the most popular drift cars in the world.",
    funFact: "The S14 240SX was never sold in Japan with the KA24DE engine, making US-spec cars popular for SR20DET engine swaps.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "lancer-evo-7-2002",
    slug: "lancer-evo-7-2002",
    name: "Mitsubishi Lancer Evo VII",
    year: 2002,
    make: "Mitsubishi",
    model: "Lancer Evolution VII",
    bodyType: "Sedan",
    image: "/images/cars/lancer-evo-7-2002.jpg",
    description: "The Mitsubishi Lancer Evolution VII is the weapon of choice for Brian O'Conner in 2 Fast 2 Furious. With its rally-bred all-wheel-drive system and turbocharged 4G63 engine, this silver sedan was built for the streets of Miami.",
    specs: {
      engine: "2.0L 4G63 Turbo Inline-4",
      horsepower: 276,
      topSpeed: 157,
      zeroToSixty: 4.8,
      transmission: "6-speed manual",
      drivetrain: "AWD",
      weight: 3240
    },
    appearances: [
      { mediaType: "movie", title: "2 Fast 2 Furious", year: 2003, role: "Brian O'Conner's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Fast & Furious 6", year: 2013, role: "Brian's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "Brian launches the Evo VII off a ramp and onto a yacht in the middle of the ocean, the all-wheel-drive system clawing for grip as it lands.",
    culturalImpact: "The Evo VII is one of the most iconic Japanese performance sedans of the 2000s.",
    funFact: "The Evo VII used in the film was fitted with a Garrett turbo kit producing over 350 horsepower.",
    notableDrivers: ["Brian O'Conner"],
    isFeatured: false
  },
  {
    id: "nissan-gtr-2009",
    slug: "nissan-gtr-2009",
    name: "Nissan GT-R R35",
    year: 2009,
    make: "Nissan",
    model: "GT-R R35",
    bodyType: "Supercar",
    image: "/images/cars/nissan-gtr-2009.jpg",
    description: "The Nissan GT-R R35, nicknamed 'Godzilla', is a Japanese supercar that rewrote the rules of performance car engineering. Appearing in Fast Five, its dual-clutch transmission and advanced ATTESA all-wheel-drive allowed it to outperform cars costing three times as much.",
    specs: {
      engine: "3.8L VR38DETT Twin-Turbo V6",
      horsepower: 480,
      topSpeed: 193,
      zeroToSixty: 3.5,
      transmission: "6-speed dual-clutch",
      drivetrain: "AWD",
      weight: 3836
    },
    appearances: [
      { mediaType: "movie", title: "Fast Five", year: 2011, role: "Vince's car", franchise: "Fast & Furious" },
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Tej's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The GT-R blasts through the streets of Rio, its V6 sounding like a fighter jet as the ATTESA system manages traction through every corner.",
    culturalImpact: "The GT-R R35 earned the nickname 'Godzilla' for its ability to defeat far more expensive European supercars.",
    funFact: "The GT-R's VR38DETT engine is hand-assembled by certified technicians in a clean room in Japan.",
    notableDrivers: ["Tej Parker"],
    isFeatured: false
  },
  {
    id: "xb-falcon-gt-1973",
    slug: "xb-falcon-gt-1973",
    name: "XB Falcon GT",
    year: 1973,
    make: "Ford",
    model: "Falcon XB GT",
    bodyType: "Muscle Car",
    image: "/images/cars/xb-falcon-gt-1973.jpg",
    description: "The 1973 Ford Falcon XB GT returns in Mad Max: Fury Road as the iconic Interceptor. Built on the legacy of the original Pursuit Special, this post-apocalyptic beast features reinforced armor, a blower protruding through the hood, and enough firepower to survive the wasteland.",
    specs: {
      engine: "5.8L 351 Cleveland V8",
      horsepower: 300,
      topSpeed: 140,
      zeroToSixty: 6.5,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 3350
    },
    appearances: [
      { mediaType: "movie", title: "Mad Max: Fury Road", year: 2015, role: "Max's wasteland vehicle", franchise: "Mad Max" }
    ],
    iconicScene: "The Interceptor roars across the desert, the supercharger whining as Max navigates through the chaos of Immortan Joe's war parties.",
    culturalImpact: "The XB Falcon GT is one of the most iconic post-apocalyptic vehicles ever created.",
    funFact: "The original Pursuit Special used in Fury Road was actually a restored version of the Mad Max 2 car.",
    notableDrivers: ["Max Rockatansky"],
    isFeatured: false
  },
  {
    id: "mustang-gt350-2015",
    slug: "mustang-gt350-2015",
    name: "Ford Mustang GT350",
    year: 2015,
    make: "Ford",
    model: "Mustang GT350R",
    bodyType: "Muscle Car",
    image: "/images/cars/mustang-gt350-2015.jpg",
    description: "The Ford Mustang GT350R is a track-focused American muscle car with a flat-plane crank V8 that screams to 8250 rpm. Appearing in the Fast & Furious franchise, it represents the modern evolution of American performance engineering.",
    specs: {
      engine: "5.2L Voodoo V8",
      horsepower: 526,
      topSpeed: 160,
      zeroToSixty: 4.3,
      transmission: "6-speed manual",
      drivetrain: "RWD",
      weight: 3805
    },
    appearances: [
      { mediaType: "movie", title: "Furious 7", year: 2015, role: "Dom's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The GT350R rockets through the mountains of Azerbaijan, its flat-plane crank V8 producing a unique, exotic howl.",
    culturalImpact: "The Mustang GT350R brought European-level track performance to American muscle car pricing.",
    funFact: "The GT350R's 'Voodoo' engine uses a flat-plane crankshaft, giving it a sound more like a Ferrari than a traditional American V8.",
    notableDrivers: ["Dominic Toretto"],
    isFeatured: false
  },
  {
    id: "challenger-srt-2011",
    slug: "challenger-srt-2011",
    name: "Dodge Challenger SRT",
    year: 2011,
    make: "Dodge",
    model: "Challenger SRT8",
    bodyType: "Muscle Car",
    image: "/images/cars/challenger-srt-2011.jpg",
    description: "The 2011 Dodge Challenger SRT8 is a modern interpretation of the classic muscle car, packing a 6.4L HEMI V8 under its retro-styled hood. Featured in Fast & Furious 6, it brings classic American muscle into the modern era.",
    specs: {
      engine: "6.4L HEMI V8",
      horsepower: 470,
      topSpeed: 180,
      zeroToSixty: 4.5,
      transmission: "5-speed automatic",
      drivetrain: "RWD",
      weight: 4140
    },
    appearances: [
      { mediaType: "movie", title: "Fast & Furious 6", year: 2013, role: "Roman's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The Challenger SRT8 roars down the runway alongside the crew, its HEMI V8 growling as they prepare for the tank heist.",
    culturalImpact: "The modern Challenger successfully revived the muscle car for the 21st century.",
    funFact: "The Challenger SRT8 was the first production car to offer the 6.4L HEMI V8, producing 470 horsepower.",
    notableDrivers: ["Roman Pearce"],
    isFeatured: false
  },
  {
    id: "nissan-gtr-r35-2012",
    slug: "nissan-gtr-r35-2012",
    name: "Nissan GT-R R35",
    year: 2012,
    make: "Nissan",
    model: "GT-R R35",
    bodyType: "Supercar",
    image: "/images/cars/nissan-gtr-r35-2012.jpg",
    description: "The 2012 Nissan GT-R R35 is an updated version of Godzilla with more power and refined aerodynamics. Appearing in the Fast & Furious franchise, this Japanese supercar continued to prove that it could humble far more expensive machinery.",
    specs: {
      engine: "3.8L VR38DETT Twin-Turbo V6",
      horsepower: 530,
      topSpeed: 196,
      zeroToSixty: 3.2,
      transmission: "6-speed dual-clutch",
      drivetrain: "AWD",
      weight: 3818
    },
    appearances: [
      { mediaType: "movie", title: "Fast & Furious 6", year: 2013, role: "Tej's car", franchise: "Fast & Furious" }
    ],
    iconicScene: "The GT-R launches off the line with brutal acceleration, the VR38DETT engine screaming as the ATTESA system finds traction.",
    culturalImpact: "The R35 GT-R redefined the supercar landscape with its unbeatable price-to-performance ratio.",
    funFact: "The 2012 GT-R featured a revised front end and uprated suspension for better high-speed stability.",
    notableDrivers: ["Tej Parker"],
    isFeatured: false
  },
  {
    id: "flintmobile",
    slug: "flintmobile",
    name: "Flintmobile",
    year: 1960,
    make: "Custom",
    model: "Flintmobile",
    bodyType: "Fantasy Vehicle",
    image: "/images/cars/flintmobile.jpg",
    description: "The Flintmobile is the iconic foot-powered car from The Flintstones, made of stone, wood, and dinosaur parts. Fred Flintstone's prehistoric vehicle famously relies on the driver's feet through holes in the floor to get moving.",
    specs: {
      engine: "Foot-powered",
      horsepower: 1,
      topSpeed: 15,
      zeroToSixty: 60.0,
      transmission: "Foot-powered",
      drivetrain: "RWD",
      weight: 3500
    },
    appearances: [
      { mediaType: "animated-series", title: "The Flintstones", year: 1960, role: "Fred Flintstone's family car" },
      { mediaType: "movie", title: "The Flintstones", year: 1994, role: "Fred's car" }
    ],
    iconicScene: "Fred Flintstone pedals frantically through Bedrock, his feet poking through the floorboards as the Flintmobile lurches forward.",
    culturalImpact: "The Flintmobile is one of the most recognizable animated vehicles and the definitive prehistoric car parody.",
    funFact: "The Flintmobile's distinctive 'yabba dabba doo' horn is one of the most famous sound effects in cartoon history.",
    notableDrivers: ["Fred Flintstone"],
    isFeatured: false
  },
  {
    id: "toyota-ae86",
    slug: "toyota-ae86",
    name: "Toyota AE86",
    year: 1986,
    make: "Toyota",
    model: "Sprinter Trueno GT-APEX",
    bodyType: "Compact Car",
    image: "/images/cars/toyota-ae86.jpg",
    description: "The Toyota AE86 Sprinter Trueno is the legendary drift car from the Initial D manga and anime. Known as the 'Hachiroku' (8-6 in Japanese), this lightweight rear-wheel-drive coupe with its pop-up headlights became the ultimate mountain drift machine.",
    specs: {
      engine: "1.6L 4A-GE Inline-4",
      horsepower: 130,
      topSpeed: 115,
      zeroToSixty: 8.5,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2100
    },
    appearances: [
      { mediaType: "animated-series", title: "Initial D", year: 1998, role: "Takumi Fujiwara's drift car" }
    ],
    iconicScene: "Takumi Fujiwara drifts the AE86 down Mount Akina, delivering tofu with a glass of water balanced on the dashboard without spilling a drop.",
    culturalImpact: "The AE86 is one of the most famous drift cars in anime history and inspired a generation of real-world drifters.",
    funFact: "The AE86's 4A-GE engine was famously called the 'silver top' and featured Toyota's variable valve timing technology.",
    notableDrivers: ["Takumi Fujiwara"],
    isFeatured: false
  },
  {
    id: "aston-martin-dbs-1969",
    slug: "aston-martin-dbs-1969",
    name: "Aston Martin DBS",
    year: 1969,
    make: "Aston Martin",
    model: "DBS",
    bodyType: "Grand Tourer",
    image: "/images/cars/aston-martin-dbs-1969.jpg",
    description: "The Aston Martin DBS is the muscular predecessor to the DB5 that appeared in the James Bond film On Her Majesty's Secret Service. With its larger 6-cylinder engine and more aggressive styling, it was Bond's car during George Lazenby's sole outing as 007.",
    specs: {
      engine: "4.0L Inline-6",
      horsepower: 315,
      topSpeed: 150,
      zeroToSixty: 6.5,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 3200
    },
    appearances: [
      { mediaType: "movie", title: "On Her Majesty's Secret Service", year: 1969, role: "James Bond's car", franchise: "James Bond" }
    ],
    iconicScene: "Bond drives the DBS through the snowy Swiss Alps as he pursues Blofeld's henchmen, the car's traction fighting through the snow.",
    culturalImpact: "The DBS is a bridge between the classic DB5 and the more aggressive Aston Martins that followed.",
    funFact: "The DBS was the first Bond car to feature a built-in radio telephone, a cutting-edge gadget for 1969.",
    notableDrivers: ["James Bond / George Lazenby"],
    isFeatured: false
  },
  {
    id: "porsche-911-1973",
    slug: "porsche-911-1973",
    name: "Porsche 911 Carrera",
    year: 1973,
    make: "Porsche",
    model: "911 Carrera RS 2.7",
    bodyType: "Sports Car",
    image: "/images/cars/porsche-911-1973.jpg",
    description: "The Porsche 911 Carrera RS 2.7 is one of the most iconic sports cars ever built, known for its distinctive 'ducktail' rear spoiler. Its lightweight construction and air-cooled flat-six engine made it the benchmark for sports car handling.",
    specs: {
      engine: "2.7L Flat-6",
      horsepower: 210,
      topSpeed: 150,
      zeroToSixty: 5.5,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2200
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 1973, role: "Multiple film appearances" }
    ],
    iconicScene: "The 911 Carrera tears through country roads, its air-cooled engine growling as the driver pushes the limits of rear-engine handling.",
    culturalImpact: "The 911 is the most iconic sports car ever produced, with a continuous production run spanning over 50 years.",
    funFact: "The 'ducktail' spoiler was originally designed to fix high-speed stability issues on the track.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "subaru-impreza-wrx-2006",
    slug: "subaru-impreza-wrx-2006",
    name: "Subaru Impreza WRX",
    year: 2006,
    make: "Subaru",
    model: "Impreza WRX STI",
    bodyType: "Sedan",
    image: "/images/cars/subaru-impreza-wrx-2006.jpg",
    description: "The Subaru Impreza WRX STI is a turbocharged all-wheel-drive rally legend that appears in Baby Driver. Driven by Baby during the film's opening heist getaway, its boxer engine growl and precise handling through traffic make it the perfect getaway car.",
    specs: {
      engine: "2.5L EJ25 Turbo Flat-4",
      horsepower: 300,
      topSpeed: 155,
      zeroToSixty: 4.7,
      transmission: "6-speed manual",
      drivetrain: "AWD",
      weight: 3395
    },
    appearances: [
      { mediaType: "movie", title: "Baby Driver", year: 2017, role: "Baby's heist getaway car" }
    ],
    iconicScene: "Baby executes a perfect 180-degree reverse turn in the WRX STI, then drives in reverse at high speed while firing a gun past the steering wheel.",
    culturalImpact: "The Subaru WRX STI is a rally-bred icon that dominated the World Rally Championship in the 1990s and 2000s.",
    funFact: "The opening chase in Baby Driver was filmed in Atlanta and the Subaru's license plate paid homage to the original 1971 Vanishing Point Challenger.",
    notableDrivers: ["Baby"],
    isFeatured: false
  },
  {
    id: "jurassic-park-jeep-1997",
    slug: "jurassic-park-jeep-1997",
    name: "Jeep Wrangler",
    year: 1993,
    make: "Jeep",
    model: "Wrangler Sahara",
    bodyType: "SUV",
    image: "/images/cars/jurassic-park-jeep-1997.jpg",
    description: "The 1993 Jeep Wrangler Sahara in 'Jurassic Park' green is one of the most famous SUVs in cinema history. Used by park staff to navigate the dinosaur-filled island of Isla Nublar, these Jeeps carried explorers into the world's most dangerous theme park.",
    specs: {
      engine: "4.0L Inline-6",
      horsepower: 180,
      topSpeed: 95,
      zeroToSixty: 11.0,
      transmission: "4-speed automatic",
      drivetrain: "4WD",
      weight: 3300
    },
    appearances: [
      { mediaType: "movie", title: "Jurassic Park", year: 1993, role: "Park tour vehicles" },
      { mediaType: "movie", title: "The Lost World: Jurassic Park", year: 1997, role: "Park staff vehicles" }
    ],
    iconicScene: "Dr. Grant, Ellie, and Malcolm drive through the majestic Jurassic Park gates in the Jeep Wrangler, the theme music swelling as they enter the world of dinosaurs.",
    culturalImpact: "The Jurassic Park Jeep is one of the most recognizable movie vehicles of the 1990s and started a cult following of replica builds.",
    funFact: "The Jurassic Park Jeeps were modified with a custom six-inch suspension lift and 31-inch tires.",
    notableDrivers: ["Dr. Alan Grant", "Dr. Ellie Sattler", "Dr. Ian Malcolm"],
    isFeatured: false
  },
  {
    id: "bluesmobile-1974",
    slug: "bluesmobile-1974",
    name: "Bluesmobile",
    year: 1974,
    make: "Dodge",
    model: "Monaco",
    bodyType: "Sedan",
    image: "/images/cars/bluesmobile-1974.jpg",
    description: "The Bluesmobile is a dirty 1974 Dodge Monaco that served as a former Mount Prospect police car before becoming Jake and Elwood Blues' vehicle in The Blues Brothers. Treated to a 'complete detailing' (which was a lie), this beat-up sedan survives jumps, crashes, and a mall demolition.",
    specs: {
      engine: "7.2L 440 Magnum V8",
      horsepower: 380,
      topSpeed: 130,
      zeroToSixty: 6.5,
      transmission: "3-speed automatic",
      drivetrain: "RWD",
      weight: 4200
    },
    appearances: [
      { mediaType: "movie", title: "The Blues Brothers", year: 1980, role: "Jake and Elwood's car" }
    ],
    iconicScene: "The Bluesmobile jumps over a raised drawbridge in downtown Chicago, landing hard on the other side as the Blues Brothers continue their mission from God.",
    culturalImpact: "The Bluesmobile is one of the most famous movie police cars and the Blues Brothers is a landmark in car chase cinema.",
    funFact: "The Bluesmobile was supposedly equipped with a 440 V8 with a six-pack carburetor setup. 11 Monacos were destroyed during filming.",
    notableDrivers: ["Jake Blues", "Elwood Blues"],
    isFeatured: false
  },
  {
    id: "hummer-h1-1992",
    slug: "hummer-h1-1992",
    name: "Hummer H1",
    year: 1992,
    make: "Hummer",
    model: "H1",
    bodyType: "SUV",
    image: "/images/cars/hummer-h1-1992.jpg",
    description: "The Hummer H1 is the civilian version of the military HUMVEE, an enormous and unstoppable off-road vehicle. Known for its military-grade toughness and massive presence, it has appeared in numerous films as the ultimate task vehicle.",
    specs: {
      engine: "6.5L Turbo Diesel V8",
      horsepower: 195,
      topSpeed: 85,
      zeroToSixty: 14.5,
      transmission: "4-speed automatic",
      drivetrain: "4WD",
      weight: 6600
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 1992, role: "Military and utility vehicle appearances" }
    ],
    iconicScene: "The Hummer H1 plows through rough terrain that would stop any other vehicle, its massive tires and ground clearance conquering obstacles with ease.",
    culturalImpact: "The Hummer H1 became a status symbol in the 1990s and defined the ultra-luxury SUV segment.",
    funFact: "The H1 was originally designed by AM General for the US military before being released to the civilian market.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "rolls-royce-phantom-2003",
    slug: "rolls-royce-phantom-2003",
    name: "Rolls-Royce Phantom",
    year: 2003,
    make: "Rolls-Royce",
    model: "Phantom",
    bodyType: "Luxury Sedan",
    image: "/images/cars/rolls-royce-phantom-2003.jpg",
    description: "The Rolls-Royce Phantom is the pinnacle of automotive luxury, hand-built in Goodwood, England. This flagship sedan represents the ultimate in comfort, prestige, and British craftsmanship, often appearing in films as the vehicle of choice for billionaires and dignitaries.",
    specs: {
      engine: "6.75L V12",
      horsepower: 453,
      topSpeed: 149,
      zeroToSixty: 5.7,
      transmission: "6-speed automatic",
      drivetrain: "RWD",
      weight: 5500
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 2003, role: "Multiple film appearances" }
    ],
    iconicScene: "The Phantom glides silently through city streets, its rear passengers enjoying champagne in whisper-quiet opulence.",
    culturalImpact: "The Phantom set the standard for 21st century ultra-luxury automobiles and revived the Rolls-Royce brand.",
    funFact: "The Phantom's 'Spirit of Ecstasy' hood ornament retracts into the grille at the touch of a button for security.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "volvo-240-gl-1991",
    slug: "volvo-240-gl-1991",
    name: "Volvo 240 GL",
    year: 1991,
    make: "Volvo",
    model: "240 GL",
    bodyType: "Sedan",
    image: "/images/cars/volvo-240-gl-1991.jpg",
    description: "The Volvo 240 GL is the quintessential Swedish brick, known for its boxy shape and legendary durability. Often appearing in films as a reliable family car or an understated vehicle, the 240 is one of the most recognizable cars of the 1980s and 1990s.",
    specs: {
      engine: "2.3L Inline-4",
      horsepower: 114,
      topSpeed: 105,
      zeroToSixty: 12.0,
      transmission: "4-speed manual with overdrive",
      drivetrain: "RWD",
      weight: 2890
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 1991, role: "Multiple film appearances" }
    ],
    iconicScene: "The Volvo 240 rolls quietly through suburban streets, its boxy silhouette unmistakable as the picture of sensible Swedish engineering.",
    culturalImpact: "The Volvo 240 is synonymous with safety and reliability, earning a reputation as one of the most durable cars ever built.",
    funFact: "The Volvo 240 was produced for almost 20 years with minimal changes, a testament to its timeless design.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "lamborghini-countach-1985",
    slug: "lamborghini-countach-1985",
    name: "Lamborghini Countach",
    year: 1985,
    make: "Lamborghini",
    model: "Countach LP5000 QV",
    bodyType: "Supercar",
    image: "/images/cars/lamborghini-countach-1985.jpg",
    description: "The Lamborghini Countach is the definitive wedge-shaped supercar of the 1980s. With its scissor doors, massive rear wing, and outrageous styling, the Countach was the poster car for a generation of enthusiasts and the benchmark for exotic automotive design.",
    specs: {
      engine: "5.2L V12",
      horsepower: 455,
      topSpeed: 183,
      zeroToSixty: 5.0,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 3260
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 1985, role: "Multiple film appearances as the ultimate 80s supercar" }
    ],
    iconicScene: "The Countach's scissor doors swing upward as the driver emerges, the car's angular body gleaming under the California sun.",
    culturalImpact: "The Countach defined the supercar genre and its silhouette appeared on millions of bedroom posters in the 1980s.",
    funFact: "The Countach's name comes from a Piedmontese exclamation of surprise, reportedly inspired by the car's radical design.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "ferrari-f40-1992",
    slug: "ferrari-f40-1992",
    name: "Ferrari F40",
    year: 1992,
    make: "Ferrari",
    model: "F40",
    bodyType: "Supercar",
    image: "/images/cars/ferrari-f40-1992.jpg",
    description: "The Ferrari F40 was the last car personally approved by Enzo Ferrari and a celebration of the company's 40th anniversary. A stripped-out, twin-turbocharged V8 supercar, it was the fastest production car in the world when it launched and remains one of the most desirable Ferraris ever.",
    specs: {
      engine: "2.9L Twin-Turbo V8",
      horsepower: 471,
      topSpeed: 201,
      zeroToSixty: 4.0,
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: 2425
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 1992, role: "Multiple film appearances as the ultimate 90s supercar" }
    ],
    iconicScene: "The F40's wastegates whistle as the twin turbos spool, the raw, unassisted steering delivering every bump of the road to the driver.",
    culturalImpact: "The F40 is widely considered the greatest Ferrari road car ever built and a defining supercar of the 1990s.",
    funFact: "The F40's body panels were made of Kevlar, carbon fiber, and aluminum to save weight. It had no radio, no carpet, and no door handles.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "mercedes-300sl-1955",
    slug: "mercedes-300sl-1955",
    name: "Mercedes-Benz 300SL",
    year: 1955,
    make: "Mercedes-Benz",
    model: "300SL Gullwing",
    bodyType: "Grand Tourer",
    image: "/images/cars/mercedes-300sl-1955.jpg",
    description: "The Mercedes-Benz 300SL Gullwing is the most beautiful car of the 1950s, famous for its distinctive upward-opening doors. As the fastest production car of its era, it featured the world's first direct fuel injection system on a production engine.",
    specs: {
      engine: "3.0L Inline-6",
      horsepower: 240,
      topSpeed: 160,
      zeroToSixty: 8.8,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 2560
    },
    appearances: [
      { mediaType: "movie", title: "Various", year: 1955, role: "Multiple film appearances as an icon of automotive design" }
    ],
    iconicScene: "The 300SL's gullwing doors open upward like a bird in flight, revealing a beautifully simple interior with a large steering wheel.",
    culturalImpact: "The 300SL Gullwing is universally regarded as one of the most beautiful cars ever built.",
    funFact: "The gullwing doors were a necessity, not a styling choice — the car's tubular space frame was too tall for conventional doors.",
    notableDrivers: ["Various"],
    isFeatured: false
  },
  {
    id: "ford-gt40-1966",
    slug: "ford-gt40-1966",
    name: "Ford GT40",
    year: 1966,
    make: "Ford",
    model: "GT40 MK II",
    bodyType: "Race Car",
    image: "/images/cars/ford-gt40-1966.jpg",
    description: "The Ford GT40 is the legendary race car built to beat Ferrari at Le Mans. In 1966, the GT40 scored a historic 1-2-3 finish at the 24 Hours of Le Mans, one of the greatest achievements in motorsport history, immortalized in the film Ford v Ferrari.",
    specs: {
      engine: "7.0L 427 FE V8",
      horsepower: 485,
      topSpeed: 210,
      zeroToSixty: 4.2,
      transmission: "4-speed manual",
      drivetrain: "RWD",
      weight: 2750
    },
    appearances: [
      { mediaType: "movie", title: "Ford v Ferrari", year: 2019, role: "Le Mans-winning race car" }
    ],
    iconicScene: "Ken Miles pushes the GT40 past its limits at Le Mans, the Ford V8 screaming as he crosses the finish line in a dead heat with the Ferrari.",
    culturalImpact: "The GT40 is one of the most legendary race cars of all time, representing American engineering triumphing over European dominance.",
    funFact: "The GT40 was named for its height — exactly 40 inches tall at the roof.",
    notableDrivers: ["Ken Miles", "Bruce McLaren"],
    isFeatured: false
  },
]

export const cars: Car[] = [...PART_1, ...PART_2]
