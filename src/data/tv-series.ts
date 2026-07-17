export interface TVSeries {
  id: string
  slug: string
  title: string
  years: string
  network?: string
  description: string
  image: string
  carIds: string[]
}

export const tvSeries: TVSeries[] = [
  {
    id: "knight-rider",
    slug: "knight-rider",
    title: "Knight Rider",
    years: "1982-1986",
    network: "NBC",
    description: "Michael Knight, a modern-day crusader, drives KITT (Knight Industries Two Thousand), a highly advanced, artificially intelligent Pontiac Firebird Trans Am. Together they fight injustice across the country with high-tech gadgets and turbo boosts.",
    image: "/images/tv-series/knight-rider.jpg",
    carIds: ["kitt-1982"]
  },
  {
    id: "dukes-of-hazzard",
    slug: "dukes-of-hazzard",
    title: "The Dukes of Hazzard",
    years: "1979-1985",
    network: "CBS",
    description: "Cousins Bo and Luke Duke, along with their cousin Daisy, get into adventures in Hazzard County while outrunning corrupt Sheriff Rosco P. Coltrane in their iconic orange 1969 Dodge Charger called the General Lee.",
    image: "/images/tv-series/dukes-of-hazzard.jpg",
    carIds: ["general-lee-1969"]
  },
  {
    id: "miami-vice",
    slug: "miami-vice",
    title: "Miami Vice",
    years: "1984-1990",
    network: "NBC",
    description: "Undercover detectives Sonny Crockett and Rico Tubbs patrol the mean streets of Miami in pastel suits and a white Ferrari Testarossa. The show defined 1980s style with its neon-noir aesthetic and synth-heavy soundtrack.",
    image: "/images/tv-series/miami-vice.jpg",
    carIds: ["testarossa-1986", "daytona-spyder-1986", "cadillac-deville-1964"]
  },
  {
    id: "magnum-pi",
    slug: "magnum-pi",
    title: "Magnum, P.I.",
    years: "1980-1988",
    network: "CBS",
    description: "Thomas Magnum, a private investigator living in Hawaii, drives a red Ferrari 308 GTS while solving cases from the luxurious Robin's Nest. The Ferrari became as iconic as Magnum's Hawaiian shirts and Detroit Tigers cap.",
    image: "/images/tv-series/magnum-pi.jpg",
    carIds: ["ferrari-308-gts-1977"]
  },
  {
    id: "starsky-and-hutch",
    slug: "starsky-and-hutch",
    title: "Starsky and Hutch",
    years: "1975-1979",
    network: "ABC",
    description: "Detectives David Starsky and Ken Hutchinson patrol Bay City in a bright red 1975 Ford Gran Torino with a distinctive white racing stripe. The car became a fan favorite, often taking a beating in high-speed chases.",
    image: "/images/tv-series/starsky-and-hutch.jpg",
    carIds: ["gran-torino-1975"]
  },
  {
    id: "a-team",
    slug: "a-team",
    title: "The A-Team",
    years: "1983-1987",
    network: "NBC",
    description: "Four Vietnam War veterans framed for a crime they didn't commit become soldiers of fortune, helping the helpless across America. Their black GMC Vandura, with its distinctive red stripe, carried their arsenal and disguises.",
    image: "/images/tv-series/a-team.jpg",
    carIds: ["a-team-vandura-1982"]
  },
  {
    id: "mr-bean",
    slug: "mr-bean",
    title: "Mr. Bean",
    years: "1990-1995",
    network: "ITV",
    description: "The bumbling Mr. Bean navigates everyday life with chaotic results. His British Racing Green Mini 1000, often with a lock on the outside and a sofa on the roof, is the perfect vehicle for his slapstick misadventures.",
    image: "/images/tv-series/mr-bean.jpg",
    carIds: ["mr-bean-mini-1977"]
  },
  {
    id: "breaking-bad",
    slug: "breaking-bad",
    title: "Breaking Bad",
    years: "2008-2013",
    network: "AMC",
    description: "High school chemistry teacher Walter White turns to cooking meth after a terminal cancer diagnosis. His Pontiac Aztek, widely considered one of the ugliest cars ever made, perfectly symbolizes his unassuming suburban life.",
    image: "/images/tv-series/breaking-bad.jpg",
    carIds: ["aztek-pontiac"]
  },
  {
    id: "supernatural",
    slug: "supernatural",
    title: "Supernatural",
    years: "2005-2020",
    network: "The WB / The CW",
    description: "Brothers Dean and Sam Winchester travel across America hunting monsters, ghosts, and demons. Their 1967 Chevrolet Impala, named 'Baby', is as much a character as the Winchesters themselves, carrying their weapons and memories.",
    image: "/images/tv-series/supernatural.jpg",
    carIds: ["impala-1967"]
  },
  {
    id: "the-simpsons",
    slug: "the-simpsons",
    title: "The Simpsons",
    years: "1989-present",
    network: "Fox",
    description: "The animated Simpson family's adventures in Springfield include Homer's brief ownership of the Canyonero, a monstrous SUV parody that satirizes American automotive excess with its famous jingle.",
    image: "/images/tv-series/the-simpsons.jpg",
    carIds: ["canyonero"]
  },
  {
    id: "batman-1966-series",
    slug: "batman-1966-series",
    title: "Batman",
    years: "1966-1968",
    network: "ABC",
    description: "The campy, colorful adventures of Batman and Robin as they defend Gotham from a rogues' gallery of eccentric villains. The 1966 Batmobile, with its jet engine and array of gadgets, became a cultural phenomenon.",
    image: "/images/tv-series/batman-1966-series.jpg",
    carIds: ["batmobile-1966"]
  },
  {
    id: "rockford-files",
    slug: "rockford-files",
    title: "The Rockford Files",
    years: "1974-1980",
    network: "NBC",
    description: "Private investigator Jim Rockford solves cases from his mobile home in Malibu. His gold 1974 Pontiac Firebird Formula 400 was his loyal companion through car chases, stakeouts, and narrow escapes from angry clients.",
    image: "/images/tv-series/rockford-files.jpg",
    carIds: []
  },
  {
    id: "speed-racer-series",
    slug: "speed-racer-series",
    title: "Speed Racer",
    years: "1967-1968",
    network: "NBC",
    description: "Young race car driver Speed Racer and his family navigate the world of professional racing, competing against rivals while driving the gadget-laden Mach 5. The anime classic introduced Japanese animation to American audiences.",
    image: "/images/tv-series/speed-racer-series.jpg",
    carIds: ["mach-5"]
  },
  {
    id: "scooby-doo-series",
    slug: "scooby-doo-series",
    title: "Scooby-Doo, Where Are You!",
    years: "1969-1970",
    network: "CBS",
    description: "Four teenagers and their talking Great Dane travel in the Mystery Machine, a brightly painted blue and green van, solving supernatural mysteries. The van's groovy paint scheme is as iconic as the show's formula of unmasking disguised villains.",
    image: "/images/tv-series/scooby-doo-series.jpg",
    carIds: ["mystery-machine"]
  },
  {
    id: "top-gear",
    slug: "top-gear",
    title: "Top Gear",
    years: "2002-present",
    network: "BBC",
    description: "The world's most popular motoring show features high-octane challenges, celebrity guests, and the iconic trio of presenters. The show has created countless memorable automotive moments and influenced car culture worldwide.",
    image: "/images/tv-series/top-gear.jpg",
    carIds: []
  }
]
