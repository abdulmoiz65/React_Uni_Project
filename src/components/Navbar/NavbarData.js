const NavbarData = {
  topLinks: [
    { label: "Maju", href: "#", hasMega: true },
    { label: "Programs", href: "#", hasMega: true },
    { label: "Admissions", href: "#", hasMega: true },
    { label: "Faculty & Research", href: "#" },
    { label: "MAJU Experience", href: "#" },
    { label: "News & Events", href: "#" },
  ],

  megaMenu: {

    maju: {
      columns: [
        {
          title: "About MAJU",
          links: ["History", "Mission & Vision", "Leadership"],
        },
        {
          title: "Community",
          links: ["Student Life", "Alumni", "Industry Partners"],
        },
      ],
    },

    programs: {
      columns: [
        {
          title: "Professional Pathways",
          links: [
            "Programs in Business & Management",
            "Programs in Design & Architecture",
            "Programs in Finance, Economics & Trade",
            "Programs in Law, International Affairs & Public Policy",
            "Programs in Leadership & Talent Development",
            "Programs in Marketing, Communication & Sales",
            "abc",
          ],
        },
        {
          title: "Degree Types",
          links: [
            "Undergraduate Programs",
            "Master’s Programs",
            "Doctorate Programs",
            "Lifelong Learning",
            "Alternative Credentials",
            "MAJU Summer School Programs",
          ],
        },
        {
          title: "Schools",
          links: [
            "MAJU School of Architecture & Design",
            "MAJU Business School",
            "MAJU School of Politics, Economics & Global Affairs",
            "MAJU School of Science & Technology",
            "MAJU Law School",
            "MAJU School of Humanities",
          ],
        },
      ],
    },
    admissions: {
      columns: [
        {
          title: "Undergraduate",
          links: ["Apply Now", "Tuition & Fees", "Scholarships"],
        },
        {
          title: "Graduate",
          links: ["Apply Now", "Requirements", "Scholarships"],
        },
      ],
    },

    about: {
      columns: [
        {
          title: "About MAJU",
          links: ["History", "Mission & Vision", "Leadership"],
        },
        {
          title: "Community",
          links: ["Student Life", "Alumni", "Industry Partners"],
        },
      ],
    },
  },

  nextPanelData: {
    "Professional Pathways": [
      "Programs in Business & Management",
      "Programs in Design & Architecture",
      "Programs in Finance, Economics & Trade",
      "Programs in Law, International Affairs & Public Policy",
      "Programs in Leadership & Talent Development",
      "Programs in Marketing, Communication & Sales",
      "Programs in Science, Technology & Data",
    ],
    "Degree Types": [
      "Undergraduate Programs",
      "Master’s Programs",
      "Doctorate Programs",
      "Lifelong Learning",
      "Alternative Credentials",
      "IE Summer School Programs",
    ],
    Schools: [
      "IE School of Architecture & Design",
      "IE Business School",
      "IE School of Politics, Economics & Global Affairs",
      "IE School of Science & Technology",
      "IE Law School",
      "IE School of Humanities",
    ],
  },

  offcanvasExtra: [
    "Registrars Office",
    "Students",
    "Parents",
    "Alumni",
    "For Companies",
  ],
};

export default NavbarData;
