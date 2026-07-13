export interface Movie {
  id: string
  slug: string
  title: string
  year: number
  director?: string
  franchise?: string
  description: string
  image: string
  carIds: string[]
}

export const movies: Movie[] = [
  {
    id: "goldfinger",
    slug: "goldfinger",
    title: "Goldfinger",
    year: 1964,
    director: "Guy Hamilton",
    franchise: "James Bond",
    description: "James Bond investigates gold smuggler Auric Goldfinger and discovers his plan to contaminate the gold supply at Fort Knox. The film introduced the iconic Aston Martin DB5 with its arsenal of Q-branch gadgets.",
    image: "/images/movies/goldfinger.jpg",
    carIds: ["aston-martin-db5-1964"]
  },
  {
    id: "thunderball",
    slug: "thunderball",
    title: "Thunderball",
    year: 1965,
    director: "Terence Young",
    franchise: "James Bond",
    description: "James Bond races to find two NATO atomic bombs stolen by SPECTRE. The Aston Martin DB5 returns with its gadgets as Bond navigates the Bahamas and underwater battles.",
    image: "/images/movies/thunderball.jpg",
    carIds: ["aston-martin-db5-1964"]
  },
  {
    id: "bullitt",
    slug: "bullitt",
    title: "Bullitt",
    year: 1968,
    director: "Peter Yates",
    description: "San Francisco detective Frank Bullitt is assigned to protect a key witness but things go wrong, leading to a relentless pursuit through the hilly streets. The film features the greatest car chase in cinema history.",
    image: "/images/movies/bullitt.jpg",
    carIds: ["bullitt-mustang-1968"]
  },
  {
    id: "italian-job-1969",
    slug: "italian-job-1969",
    title: "The Italian Job",
    year: 1969,
    director: "Peter Collinson",
    description: "Charlie Croker leads a carefully planned gold heist in Turin, using three Mini Coopers for the getaway. The film is famous for its clever use of the small cars through sewers and staircases.",
    image: "/images/movies/italian-job-1969.jpg",
    carIds: ["italian-job-mini-1968"]
  },
  {
    id: "smokey-and-the-bandit",
    slug: "smokey-and-the-bandit",
    title: "Smokey and the Bandit",
    year: 1977,
    director: "Hal Needham",
    description: "The Bandit, a charismatic outlaw, accepts a bet to illegally transport 400 cases of Coors beer from Texas to Georgia in 28 hours. The black Pontiac Trans Am leads a massive police chase across state lines.",
    image: "/images/movies/smokey-and-the-bandit.jpg",
    carIds: ["bandit-trans-am-1977"]
  },
  {
    id: "back-to-the-future",
    slug: "back-to-the-future",
    title: "Back to the Future",
    year: 1985,
    director: "Robert Zemeckis",
    franchise: "Back to the Future",
    description: "Teenager Marty McFly is accidentally sent back to 1955 in a time-traveling DeLorean built by his eccentric scientist friend Doc Brown. He must ensure his parents fall in love to secure his own existence.",
    image: "/images/movies/back-to-the-future.jpg",
    carIds: ["delorean-dmc-12"]
  },
  {
    id: "ghostbusters",
    slug: "ghostbusters",
    title: "Ghostbusters",
    year: 1984,
    director: "Ivan Reitman",
    franchise: "Ghostbusters",
    description: "Three parapsychologists start a ghost-catching business in New York City using advanced proton packs. The Ecto-1, a converted 1959 Cadillac ambulance, serves as their mobile command center.",
    image: "/images/movies/ghostbusters.jpg",
    carIds: ["ecto-1-1959"]
  },
  {
    id: "fast-and-furious-2001",
    slug: "fast-and-furious-2001",
    title: "The Fast and the Furious",
    year: 2001,
    director: "Rob Cohen",
    franchise: "Fast & Furious",
    description: "Undercover cop Brian O'Conner infiltrates the Los Angeles street racing scene to catch a crew of hijackers. He finds himself drawn into the world of Dominic Toretto and his crew of tuner enthusiasts.",
    image: "/images/movies/fast-and-furious-2001.jpg",
    carIds: ["supra-mk4-1995", "charger-rt-1970", "eclipse-1995", "civic-1992", "supra-mk4-1993", "nissan-240sx-1997"]
  },
  {
    id: "2-fast-2-furious",
    slug: "2-fast-2-furious",
    title: "2 Fast 2 Furious",
    year: 2003,
    director: "John Singleton",
    franchise: "Fast & Furious",
    description: "Brian O'Conner teams up with childhood friend Roman Pearce to take down a Miami drug lord. The film features some of the most memorable cars in the franchise, including the Skyline GT-R and Evo VII.",
    image: "/images/movies/2-fast-2-furious.jpg",
    carIds: ["skyline-r34-1999", "eclipse-spyder-2003", "s2000-2000", "lancer-evo-7-2002"]
  },
  {
    id: "fast-five",
    slug: "fast-five",
    title: "Fast Five",
    year: 2011,
    director: "Justin Lin",
    franchise: "Fast & Furious",
    description: "Dom and Brian assemble a crew in Rio de Janeiro to pull off the biggest heist in franchise history. The film marked the franchise's shift from street racing to global heist action.",
    image: "/images/movies/fast-five.jpg",
    carIds: ["charger-rt-1970", "chevelle-ss-1970", "skyline-r34-1999", "camaro-z28-1969", "nissan-gtr-2009", "de-tomaso-pantera-1972"]
  },
  {
    id: "fast-and-furious-6",
    slug: "fast-and-furious-6",
    title: "Fast & Furious 6",
    year: 2013,
    director: "Justin Lin",
    franchise: "Fast & Furious",
    description: "Hobbs recruits Dom and his crew to take down Owen Shaw, a former special ops soldier leading a crew of mercenary drivers. The action spans London, Spain, and a massive tank chase on a highway.",
    image: "/images/movies/fast-and-furious-6.jpg",
    carIds: ["supra-mk4-1995", "koenigsegg-ccxr-2010", "buick-grand-national-1987", "lancer-evo-7-2002"]
  },
  {
    id: "furious-7",
    slug: "furious-7",
    title: "Furious 7",
    year: 2015,
    director: "James Wan",
    franchise: "Fast & Furious",
    description: "Deckard Shaw seeks revenge against Dom's crew for putting his brother in a coma. The crew must retrieve a hacking device known as 'God's Eye' while evading a ruthless terrorist. The film was a tribute to Paul Walker.",
    image: "/images/movies/furious-7.jpg",
    carIds: ["charger-rt-1970", "bugatti-veyron-2011", "supra-mk4-1995", "skyline-r34-1999", "nissan-gtr-2009"]
  },
  {
    id: "fate-of-the-furious",
    slug: "fate-of-the-furious",
    title: "The Fate of the Furious",
    year: 2017,
    director: "F. Gary Gray",
    franchise: "Fast & Furious",
    description: "Dom is coerced into working for cyberterrorist Cipher, forcing his crew to face him in a battle across New York City and the Arctic. A nuclear submarine chase pushes the franchise to new extremes.",
    image: "/images/movies/fate-of-the-furious.jpg",
    carIds: ["charger-rt-1970", "mclaren-720s-2017"]
  },
  {
    id: "casino-royale-2006",
    slug: "casino-royale-2006",
    title: "Casino Royale",
    year: 2006,
    director: "Martin Campbell",
    franchise: "James Bond",
    description: "James Bond earns his 00 status and is assigned to defeat terrorist financier Le Chiffre in a high-stakes poker game at Casino Royale. The Aston Martin DB5 makes a memorable return with Bond behind the wheel.",
    image: "/images/movies/casino-royale-2006.jpg",
    carIds: ["aston-martin-db5-1964"]
  },
  {
    id: "skyfall",
    slug: "skyfall",
    title: "Skyfall",
    year: 2012,
    director: "Sam Mendes",
    franchise: "James Bond",
    description: "M's past comes back to haunt Bond when a former agent seeks revenge against MI6. Bond must track down the villain while protecting M at his childhood home in the Scottish Highlands.",
    image: "/images/movies/skyfall.jpg",
    carIds: ["aston-martin-db5-1964"]
  },
  {
    id: "spectre",
    slug: "spectre",
    title: "Spectre",
    year: 2015,
    director: "Sam Mendes",
    franchise: "James Bond",
    description: "A cryptic message from Bond's past sends him on a trail to uncover a sinister organization named SPECTRE. The film features the exclusive Aston Martin DB10 in a thrilling Rome car chase.",
    image: "/images/movies/spectre.jpg",
    carIds: ["aston-martin-db5-1964", "db10-2016"]
  },
  {
    id: "no-time-to-die",
    slug: "no-time-to-die",
    title: "No Time to Die",
    year: 2021,
    director: "Cary Joji Fukunaga",
    franchise: "James Bond",
    description: "Bond has left active service and is enjoying a tranquil life in Jamaica when his old friend Felix Leiter shows up asking for help. The mission to rescue a kidnapped scientist leads Bond to face a new villain with a terrifying bioweapon.",
    image: "/images/movies/no-time-to-die.jpg",
    carIds: ["aston-martin-db5-1964"]
  },
  {
    id: "mad-max-1979",
    slug: "mad-max-1979",
    title: "Mad Max",
    year: 1979,
    director: "George Miller",
    franchise: "Mad Max",
    description: "In a near-future Australia where society is collapsing, police officer Max Rockatansky seeks revenge against a motorcycle gang that has murdered his family. The film launched the iconic post-apocalyptic franchise.",
    image: "/images/movies/mad-max-1979.jpg",
    carIds: ["mad-max-falcon-1974"]
  },
  {
    id: "mad-max-fury-road",
    slug: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    year: 2015,
    director: "George Miller",
    franchise: "Mad Max",
    description: "Max becomes entangled with Imperator Furiosa, who is fleeing the tyrannical Immortan Joe with his five wives. A non-stop chase across the wasteland features the war rig and a host of custom vehicles.",
    image: "/images/movies/mad-max-fury-road.jpg",
    carIds: ["xb-falcon-gt-1973"]
  },
  {
    id: "gone-in-60-seconds-2000",
    slug: "gone-in-60-seconds-2000",
    title: "Gone in 60 Seconds",
    year: 2000,
    director: "Dominic Sena",
    description: "Retired car thief Memphis Raines must steal 50 cars in one night to save his brother from a crime lord. The ultimate prize is Eleanor, a customized 1967 Shelby GT500.",
    image: "/images/movies/gone-in-60-seconds-2000.jpg",
    carIds: ["eleanor-1967"]
  },
  {
    id: "ferris-buellers-day-off",
    slug: "ferris-buellers-day-off",
    title: "Ferris Bueller's Day Off",
    year: 1986,
    director: "John Hughes",
    description: "High school student Ferris Bueller fakes being sick to spend a day in Chicago with his friends. The day takes a turn when they take Cameron's father's priceless 1961 Ferrari 250 GT California for a joyride.",
    image: "/images/movies/ferris-buellers-day-off.jpg",
    carIds: ["ferrari-250-gt-1961"]
  },
  {
    id: "christine-1983",
    slug: "christine-1983",
    title: "Christine",
    year: 1983,
    director: "John Carpenter",
    description: "A nerdy teenager named Arnie Cunningham buys a 1958 Plymouth Fury that turns out to be a jealous, murderous entity with the power to repair itself. The car soon possesses Arnie and begins killing anyone who threatens their bond.",
    image: "/images/movies/christine-1983.jpg",
    carIds: ["christine-1958"]
  },
  {
    id: "transformers-2007",
    slug: "transformers-2007",
    title: "Transformers",
    year: 2007,
    director: "Michael Bay",
    franchise: "Transformers",
    description: "Sam Witwicky buys a used Camaro that turns out to be Bumblebee, an Autobot scout sent to Earth to find the AllSpark. The film launches a war between Autobots and Decepticons that threatens all of humanity.",
    image: "/images/movies/transformers-2007.jpg",
    carIds: ["bumblebee-camaro-2007"]
  },
  {
    id: "iron-man-2008",
    slug: "iron-man-2008",
    title: "Iron Man",
    year: 2008,
    director: "Jon Favreau",
    franchise: "Marvel Cinematic Universe",
    description: "Billionaire inventor Tony Stark is captured by terrorists and forced to build a weapon of mass destruction. Instead, he builds a powered suit of armor to escape and becomes the invincible Iron Man. His Audi R8 matches his sophisticated style.",
    image: "/images/movies/iron-man-2008.jpg",
    carIds: ["audi-r8-2008"]
  },
  {
    id: "dark-knight",
    slug: "dark-knight",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    franchise: "Batman",
    description: "Batman joins forces with Lieutenant Gordon and District Attorney Harvey Dent to dismantle organized crime in Gotham. The Joker's chaotic crusade pushes Batman to his limits in this dark, gripping sequel.",
    image: "/images/movies/dark-knight.jpg",
    carIds: ["tumbler-batmobile"]
  },
  {
    id: "batman-1989",
    slug: "batman-1989",
    title: "Batman",
    year: 1989,
    director: "Tim Burton",
    franchise: "Batman",
    description: "Gotham City's dark protector Batman faces off against his greatest nemesis, the Joker, who has a sinister plan to poison the city's residents. The film features the iconic Gothic-styled 1989 Batmobile.",
    image: "/images/movies/batman-1989.jpg",
    carIds: ["batmobile-1989"]
  },
  {
    id: "batman-1966-movie",
    slug: "batman-1966-movie",
    title: "Batman: The Movie",
    year: 1966,
    director: "Leslie H. Martinson",
    franchise: "Batman",
    description: "Batman and Robin face off against the combined might of their four greatest enemies: the Joker, the Penguin, the Riddler, and Catwoman. The campy adventure features the classic 1966 Batmobile in all its glory.",
    image: "/images/movies/batman-1966-movie.jpg",
    carIds: ["batmobile-1966"]
  },
  {
    id: "spy-who-loved-me",
    slug: "spy-who-loved-me",
    title: "The Spy Who Loved Me",
    year: 1977,
    director: "Lewis Gilbert",
    franchise: "James Bond",
    description: "James Bond teams up with a beautiful Russian agent to stop a shipping magnate from destroying the world. The film features Bond's Lotus Esprit S1 that transforms into a submarine in one of the franchise's most iconic moments.",
    image: "/images/movies/spy-who-loved-me.jpg",
    carIds: ["lotus-esprit-1976"]
  },
  {
    id: "the-godfather",
    slug: "the-godfather",
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    description: "Don Vito Corleone, head of the Corleone mafia family, decides to hand over his empire to his youngest son Michael. The 1941 Lincoln Continental embodies the power and gravitas of the Corleone family.",
    image: "/images/movies/the-godfather.jpg",
    carIds: ["lincoln-continental-1941"]
  },
  {
    id: "vanishing-point",
    slug: "vanishing-point",
    title: "Vanishing Point",
    year: 1971,
    director: "Richard C. Sarafian",
    description: "Kowalski, a former police officer and war veteran, agrees to deliver a 1970 Dodge Challenger from Colorado to California. Racing against a police blockade, the journey becomes a spiritual quest for freedom in the American West.",
    image: "/images/movies/vanishing-point.jpg",
    carIds: ["challenger-1970"]
  },
  {
    id: "risky-business",
    slug: "risky-business",
    title: "Risky Business",
    year: 1983,
    director: "Paul Brickman",
    description: "When his parents go out of town, high school student Joel Goodson turns his home into a night of debauchery. The Porsche 928 serves as a symbol of the yuppie aspirations that Joel navigates throughout his coming-of-age weekend.",
    image: "/images/movies/risky-business.jpg",
    carIds: ["porsche-928-1981"]
  }
]
