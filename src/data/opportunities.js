const opportunities = [
  {
    opportunity_name: "Park Litter Pick & Nature Walk Clean-up",
    organisation_name: "GreenSteps Community",
    cause_type: "Environment",
    date_time_and_duration: "Sat 07 Feb 2026, 10:00–16:00 (6 hours, 1 day)",
    location_uk: "Hyde Park, London",
    description:
      "Join a supervised clean-up team to collect litter, sort recyclables, and help map common waste hotspots to improve future prevention.",
    contact: {
      telephone: "020 7946 1182",
      email: "volunteer@greenstepscommunity.org.uk",
    },
    signup_link: "https://greenstepscommunity.org.uk/volunteer/park-cleanup",
  },
  {
    opportunity_name: "Food Bank Packing Sprint",
    organisation_name: "Northside Food Support",
    cause_type: "Community",
    date_time_and_duration: "Sun 08 Feb 2026, 09:30–15:30 (6 hours, 1 day)",
    location_uk: "Salford, Greater Manchester",
    description:
      "Pack emergency food parcels, check dates, label allergens, and help organise donations for weekly deliveries.",
    contact: {
      telephone: "0161 496 3021",
      email: "help@northsidefoodsupport.org.uk",
    },
  },
  {
    opportunity_name: "Community Kitchen Serving Shift",
    organisation_name: "Warm Plates UK",
    cause_type: "Community",
    date_time_and_duration: "Fri 13 Feb 2026, 14:00–20:00 (6 hours, 1 day)",
    location_uk: "Bristol City Centre, Bristol",
    description:
      "Support a community meal service by setting up tables, serving meals, offering friendly conversation, and cleaning down at the end.",
    contact: {
      telephone: "0117 496 2210",
      email: "volunteers@warmplatesuk.org.uk",
    },
    signup_link: "https://warmplatesuk.org.uk/volunteer/shifts",
  },
  {
    opportunity_name: "Charity Shop Weekend Shift",
    organisation_name: "BrightStart Charity Retail",
    cause_type: "Community",
    date_time_and_duration: "Sat 14 Feb 2026, 10:00–17:00 (7 hours, 1 day)",
    location_uk: "York, North Yorkshire",
    description:
      "Help sort donations, steam items, tag pricing, and support customers on the shop floor (training provided).",
    contact: {
      telephone: "01904 662 480",
      email: "yorkshop@brightstartretail.org.uk",
    },
  },
  {
    opportunity_name: "Beach Clean & Microplastics Survey",
    organisation_name: "CoastCare UK",
    cause_type: "Environment",
    date_time_and_duration: "Sat 21 Feb 2026, 09:00–15:00 (6 hours, 1 day)",
    location_uk: "Brighton Beach, East Sussex",
    description:
      "Collect litter and conduct a simple microplastics survey using checklists, then log results to help track trends over time.",
    contact: { telephone: "01273 496 115", email: "team@coastcareuk.org.uk" },
    signup_link: "https://coastcareuk.org.uk/events/beach-clean",
  },
  {
    opportunity_name: "Animal Shelter Enrichment Day",
    organisation_name: "Paws & Whiskers Rescue",
    cause_type: "Animal Welfare",
    date_time_and_duration: "Sun 22 Feb 2026, 10:00–16:00 (6 hours, 1 day)",
    location_uk: "Leeds, West Yorkshire",
    description:
      "Help make enrichment toys, tidy kennels (non-medical tasks), refresh water bowls, and assist staff with supervised dog walking routes.",
    contact: {
      telephone: "0113 496 9020",
      email: "volunteer@pawswhiskersrescue.org.uk",
    },
  },
  {
    opportunity_name: "After-School Homework Buddy (4 weeks)",
    organisation_name: "MentorMatch Youth",
    cause_type: "Education",
    date_time_and_duration:
      "Mon–Thu, 02–26 Mar 2026, 16:00–18:00 (2 hours per session; 16 hours total, 1 month)",
    location_uk: "Birmingham, West Midlands",
    description:
      "Support younger students with homework, reading practice, and study routines in a supervised youth centre setting.",
    contact: {
      telephone: "0121 496 7742",
      email: "support@mentormatchyouth.org.uk",
    },
    signup_link: "https://mentormatchyouth.org.uk/volunteer/homework-buddy",
  },
  {
    opportunity_name: "Community Garden Planting Week",
    organisation_name: "GrowTogether Collective",
    cause_type: "Environment",
    date_time_and_duration:
      "Mon–Fri, 09–13 Mar 2026, 10:00–15:00 (5 hours/day; 25 hours total, 1 week)",
    location_uk: "Sheffield, South Yorkshire",
    description:
      "Help prepare soil, plant seasonal vegetables, paint raised beds, and set up an easy watering rota for local residents.",
    contact: {
      telephone: "0114 496 1189",
      email: "hello@growtogethercollective.org.uk",
    },
  },
  {
    opportunity_name: "Elderly Tech Help Drop-in",
    organisation_name: "DigitalNeighbours",
    cause_type: "Community",
    date_time_and_duration: "Sat 14 Mar 2026, 11:00–17:00 (6 hours, 1 day)",
    location_uk: "Cardiff, Wales",
    description:
      "Help older adults learn basics like messaging, photos, online safety, and video calls. Volunteers work in pairs with a supervisor.",
    contact: {
      telephone: "029 2046 1130",
      email: "volunteer@digitalneighbours.org.uk",
    },
  },
  {
    opportunity_name: "Library Storytime Assistant",
    organisation_name: "Riverside Libraries Trust",
    cause_type: "Education",
    date_time_and_duration: "Sat 21 Mar 2026, 09:30–15:30 (6 hours, 1 day)",
    location_uk: "Nottingham, Nottinghamshire",
    description:
      "Assist staff during children’s storytime by setting up activities, welcoming families, and supporting crafts (no solo supervision).",
    contact: {
      telephone: "0115 496 8831",
      email: "nottingham@riversidelibraries.org.uk",
    },
  },
  {
    opportunity_name: "Charity Fun Run Marshal",
    organisation_name: "StepUp For Health",
    cause_type: "Health",
    date_time_and_duration: "Sun 29 Mar 2026, 07:30–14:30 (7 hours, 1 day)",
    location_uk: "Glasgow Green, Glasgow",
    description:
      "Support runners by directing routes, handing out water, and cheering at checkpoints. Briefing and high-vis provided.",
    contact: {
      telephone: "0141 496 2409",
      email: "events@stepupforhealth.org.uk",
    },
    signup_link: "https://stepupforhealth.org.uk/events/volunteer",
  },
  {
    opportunity_name: "Community Mural Painting Project (2 weeks)",
    organisation_name: "ColourTheCity Arts",
    cause_type: "Community",
    date_time_and_duration:
      "Mon–Fri, 06–17 Apr 2026, 12:00–16:30 (4.5 hours/day; 45 hours total, 2 weeks)",
    location_uk: "Liverpool, Merseyside",
    description:
      "Work with an artist team to paint a community mural, prep walls, and help with safe set-up. No experience needed.",
    contact: {
      telephone: "0151 496 7714",
      email: "joinus@colourthecityarts.org.uk",
    },
  },
  {
    opportunity_name: "Riverbank Restoration Day",
    organisation_name: "RiverCare Volunteers",
    cause_type: "Environment",
    date_time_and_duration: "Sat 11 Apr 2026, 09:00–16:00 (7 hours, 1 day)",
    location_uk: "Cambridge, Cambridgeshire",
    description:
      "Remove invasive plants, clear litter, and install simple wildlife-friendly features with guidance from project leaders.",
    contact: {
      telephone: "01223 496 530",
      email: "projects@rivercarevolunteers.org.uk",
    },
  },
  {
    opportunity_name: "Youth Sports Festival Helper",
    organisation_name: "ActiveKids Foundation",
    cause_type: "Youth",
    date_time_and_duration: "Sun 19 Apr 2026, 09:00–17:00 (8 hours, 1 day)",
    location_uk: "Newcastle upon Tyne, Tyne and Wear",
    description:
      "Help set up sports stations, register teams, hand out water, and support coaches with equipment (no coaching required).",
    contact: {
      telephone: "0191 496 8820",
      email: "volunteer@activekidsfoundation.org.uk",
    },
  },
  {
    opportunity_name: "Community Allotment Watering & Weeding (3 weeks)",
    organisation_name: "NeighbourRoots",
    cause_type: "Environment",
    date_time_and_duration:
      "Tue & Thu, 05–26 May 2026, 16:30–19:00 (2.5 hours/session; 15 hours total, 3 weeks)",
    location_uk: "Norwich, Norfolk",
    description:
      "Support an allotment team with light gardening tasks and basic maintenance. Great for beginners; tools provided.",
    contact: {
      telephone: "01603 496 771",
      email: "team@neighbourroots.org.uk",
    },
  },
  {
    opportunity_name: "Community Café Front-of-House Shift",
    organisation_name: "OpenDoor Community Hub",
    cause_type: "Community",
    date_time_and_duration: "Sat 09 May 2026, 10:30–17:30 (7 hours, 1 day)",
    location_uk: "Leicester, Leicestershire",
    description:
      "Greet visitors, help serve non-alcoholic drinks/snacks, keep tables tidy, and support a friendly, inclusive space.",
    contact: {
      telephone: "0116 496 2218",
      email: "volunteers@opendoorhub.org.uk",
    },
  },
  {
    opportunity_name: "Book Donation Sorting Day",
    organisation_name: "Pages for Places",
    cause_type: "Education",
    date_time_and_duration: "Sun 17 May 2026, 10:00–16:00 (6 hours, 1 day)",
    location_uk: "Oxford, Oxfordshire",
    description:
      "Sort donated books by age level, pack boxes for local community spaces, and catalogue titles in a simple spreadsheet.",
    contact: {
      telephone: "01865 496 103",
      email: "hello@pagesforplaces.org.uk",
    },
  },
  {
    opportunity_name: "Recycling Centre Volunteer Guide Day",
    organisation_name: "CycleBack UK",
    cause_type: "Environment",
    date_time_and_duration: "Sat 06 Jun 2026, 09:00–15:00 (6 hours, 1 day)",
    location_uk: "Southampton, Hampshire",
    description:
      "Help visitors sort items correctly, explain what goes where, and support a smoother flow at peak times (training provided).",
    contact: {
      telephone: "023 8046 1199",
      email: "volunteer@cyclebackuk.org.uk",
    },
    signup_link: "https://cyclebackuk.org.uk/volunteer/recycling-guide",
  },
  {
    opportunity_name: "Community Care Package Assembly (2 days)",
    organisation_name: "KindHands Network",
    cause_type: "Community",
    date_time_and_duration:
      "Sat–Sun 13–14 Jun 2026, 10:00–16:00 (6 hours/day; 12 hours total, 2 days)",
    location_uk: "Edinburgh, Scotland",
    description:
      "Assemble hygiene and wellbeing packs, write positive notes, and help organise deliveries for local support partners.",
    contact: {
      telephone: "0131 496 7730",
      email: "volunteer@kindhandsnetwork.org.uk",
    },
  },
];

export default opportunities;
