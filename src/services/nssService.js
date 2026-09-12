// NSS Service Layer for SOA University National Service Scheme Portal
// Handles mock authentication, student records, contribution logs, and CSV export.

export const SOA_COLLEGES = [
  "ITER SOA NSS",
  "SOA NSS FAS",
  "SOA NSS SNC",
  "SOA NSS SNIL",
  "NSS SOA IMS",
  "SOA NSS SPS",
  "SOA NSS IBCS",
  "SOA SHM NS",
  "IVS.NSS"
];

export const COLLEGE_DETAILS = {
  "ITER SOA NSS": {
    fullName: "Institute of Technical Education and Research (ITER)",
    campus: "Campus 1, Jagamohan Nagar, Khandagiri, Bhubaneswar",
    lead: "Dr. Satish Kumar Samal (Program Officer)",
    badgeColor: "from-blue-600 to-indigo-700",
    unitCode: "SOA-NSS-UNIT-01",
    totalVolunteers: 720
  },
  "SOA NSS FAS": {
    fullName: "Faculty of Agricultural Sciences (FAS)",
    campus: "Campus 2, Ghatikia, Bhubaneswar",
    lead: "Dr. Bijaylaxmi Mohanty (Program Officer)",
    badgeColor: "from-emerald-600 to-teal-700",
    unitCode: "SOA-NSS-UNIT-02",
    totalVolunteers: 280
  },
  "SOA NSS SNC": {
    fullName: "School of Nursing Sciences (SNC)",
    campus: "IMS & SUM Hospital Campus, Kalinga Nagar",
    lead: "Prof. Pravati Pati (Program Officer)",
    badgeColor: "from-rose-600 to-pink-700",
    unitCode: "SOA-NSS-UNIT-03",
    totalVolunteers: 310
  },
  "SOA NSS SNIL": {
    fullName: "SOA National Institute of Law (SNIL)",
    campus: "Campus 2, Kalinga Nagar, Bhubaneswar",
    lead: "Dr. Amarendra Pattnaik (Program Officer)",
    badgeColor: "from-amber-600 to-orange-700",
    unitCode: "SOA-NSS-UNIT-04",
    totalVolunteers: 240
  },
  "NSS SOA IMS": {
    fullName: "Institute of Medical Sciences & SUM Hospital (IMS)",
    campus: "IMS Campus 1 & 2, Sector 8, K8, Kalinga Nagar",
    lead: "Dr. Rajesh K. Tripathy (Medical NSS Lead)",
    badgeColor: "from-red-600 to-rose-700",
    unitCode: "SOA-NSS-UNIT-05",
    totalVolunteers: 450
  },
  "SOA NSS SPS": {
    fullName: "School of Pharmaceutical Sciences (SPS)",
    campus: "Campus 2, Ghatikia, Bhubaneswar",
    lead: "Dr. Debasis Mohapatra (Program Officer)",
    badgeColor: "from-cyan-600 to-blue-700",
    unitCode: "SOA-NSS-UNIT-06",
    totalVolunteers: 290
  },
  "SOA NSS IBCS": {
    fullName: "Institute of Business & Computer Studies (IBCS)",
    campus: "Campus 2, Ghatikia, Bhubaneswar",
    lead: "Prof. Smrutirekha Sahoo (Program Officer)",
    badgeColor: "from-violet-600 to-purple-700",
    unitCode: "SOA-NSS-UNIT-07",
    totalVolunteers: 340
  },
  "SOA SHM NS": {
    fullName: "School of Hotel Management (SHM)",
    campus: "Campus 2, Jagamara-Sundarpada Link Rd",
    lead: "Chef Soumya Ranjan Dash (Program Officer)",
    badgeColor: "from-yellow-600 to-amber-700",
    unitCode: "SOA-NSS-UNIT-08",
    totalVolunteers: 180
  },
  "IVS.NSS": {
    fullName: "Institute of Veterinary Sciences & Animal Husbandry (IVS)",
    campus: "Campus 4, Jamujhari, Bhubaneswar",
    lead: "Dr. Ansuman Nayak (Program Officer)",
    badgeColor: "from-teal-600 to-emerald-700",
    unitCode: "SOA-NSS-UNIT-09",
    totalVolunteers: 160
  }
};

const INITIAL_STUDENTS = [
  {
    id: "SOA2022NSS101",
    name: "Parthasarathi Lenka",
    email: "partha.nss@soa.ac.in",
    phone: "+91 98610 23456",
    bloodGroup: "O+",
    college: "ITER SOA NSS",
    unitBatch: "Unit 1 - 2022-26",
    eventsAttended: 28,
    serviceHours: 164,
    status: "Verified",
    joinDate: "2022-09-15",
    contributions: [
      {
        id: "c1",
        title: "State Level Mega Blood Donation Camp 2024",
        date: "2024-08-20",
        hours: 16,
        description: "Coordinated volunteer logistics and donor care at SUM Hospital. Collected 450+ blood units safely.",
        type: "Health & Donation"
      },
      {
        id: "c2",
        title: "Clean Campus & Coastal Swachhata Drive at Puri Beach",
        date: "2024-05-12",
        hours: 24,
        description: "Led 45 student volunteers in waste segregation and awareness drive collecting 320kg plastic along Puri sea beach.",
        type: "Swachh Bharat"
      },
      {
        id: "c3",
        title: "Tree Plantation Drive (Vriksharopan Pakhwada)",
        date: "2024-07-07",
        hours: 18,
        description: "Planted 150 indigenous saplings in Khandagiri green belt and established drip watering system.",
        type: "Environment"
      },
      {
        id: "c4",
        title: "Free Digital Literacy Camp for Rural Children",
        date: "2024-02-18",
        hours: 32,
        description: "Conducted weekend workshops in adopted village Jamujhari on basic computer skills and cyber safety.",
        type: "Education"
      }
    ],
    achievements: [
      {
        id: "a1",
        title: "Red Drop Lifesaver Trophy",
        category: "Blood Donation",
        icon: "Droplets",
        color: "text-rose-500",
        bg: "from-rose-500/20 to-red-600/10",
        desc: "Organized 4 blood donation camps with 500+ units collected",
        date: "Aug 2024"
      },
      {
        id: "a2",
        title: "Green Earth Pioneer Medal",
        category: "Environment",
        icon: "Sprout",
        color: "text-emerald-400",
        bg: "from-emerald-500/20 to-teal-600/10",
        desc: "Spearheaded campus herbal garden & 150+ tree plantations",
        date: "Jul 2024"
      },
      {
        id: "a3",
        title: "Swachhata Ratna Badge",
        category: "Sanitation",
        icon: "Sparkles",
        color: "text-blue-400",
        bg: "from-blue-500/20 to-indigo-600/10",
        desc: "Over 60 hours dedicated to Swachh Bharat Abhiyan",
        date: "May 2024"
      },
      {
        id: "a4",
        title: "Disaster Relief Volunteer Star",
        category: "Emergency",
        icon: "ShieldAlert",
        color: "text-amber-400",
        bg: "from-amber-500/20 to-orange-600/10",
        desc: "Rapid relief kit dispatch during coastal cyclone alert",
        date: "Oct 2023"
      }
    ]
  },
  {
    id: "SOA2023NSS204",
    name: "Ananya Priyadarshini",
    email: "ananya.fas@soa.ac.in",
    phone: "+91 97781 44521",
    bloodGroup: "B+",
    college: "SOA NSS FAS",
    unitBatch: "Unit 2 - 2023-27",
    eventsAttended: 19,
    serviceHours: 118,
    status: "Verified",
    joinDate: "2023-08-10",
    contributions: [
      {
        id: "c201",
        title: "Organic Farming & Soil Health Awareness",
        date: "2024-06-15",
        hours: 28,
        description: "Educated 60 local farmers on bio-fertilizers and sustainable organic farming techniques.",
        type: "Agriculture"
      },
      {
        id: "c202",
        title: "Seed Ball Preparation & Dispersal",
        date: "2024-07-22",
        hours: 20,
        description: "Prepared 2,000 seed balls with native forest species for aerial seed dropping.",
        type: "Environment"
      }
    ],
    achievements: [
      {
        id: "a201",
        title: "Krishi Mitra Award",
        category: "Agriculture",
        icon: "Wheat",
        color: "text-amber-400",
        bg: "from-amber-500/20 to-yellow-600/10",
        desc: "Significant contribution to village farming awareness drives",
        date: "Jun 2024"
      },
      {
        id: "a202",
        title: "Green Earth Pioneer Medal",
        category: "Environment",
        icon: "Sprout",
        color: "text-emerald-400",
        bg: "from-emerald-500/20 to-teal-600/10",
        desc: "Planted 75 saplings across agricultural campus",
        date: "Jul 2024"
      }
    ]
  },
  {
    id: "SOA2023NSS305",
    name: "Subham Mohapatra",
    email: "subham.ims@soa.ac.in",
    phone: "+91 94372 88190",
    bloodGroup: "A+",
    college: "NSS SOA IMS",
    unitBatch: "Unit 5 - 2023-28",
    eventsAttended: 32,
    serviceHours: 195,
    status: "Verified",
    joinDate: "2023-07-20",
    contributions: [
      {
        id: "c301",
        title: "Free Rural Health Screening & Eye Checkup Camp",
        date: "2024-09-02",
        hours: 30,
        description: "Assisted senior doctors in screening 380 villagers in Jatni block for diabetes and cataract.",
        type: "Healthcare"
      },
      {
        id: "c302",
        title: "First-Aid & CPR Training for High School Students",
        date: "2024-04-10",
        hours: 18,
        description: "Conducted hands-on CPR drills for 120 students at Khandagiri Government High School.",
        type: "Health & Training"
      }
    ],
    achievements: [
      {
        id: "a301",
        title: "Medical Angel Trophy",
        category: "Healthcare",
        icon: "Stethoscope",
        color: "text-rose-400",
        bg: "from-rose-500/20 to-pink-600/10",
        desc: "Over 150 hours of free community healthcare assistance",
        date: "Sep 2024"
      },
      {
        id: "a302",
        title: "Red Drop Lifesaver Trophy",
        category: "Blood Donation",
        icon: "Droplets",
        color: "text-rose-500",
        bg: "from-rose-500/20 to-red-600/10",
        desc: "3 personal blood donations and organized donor registry",
        date: "Aug 2024"
      }
    ]
  },
  {
    id: "SOA2024NSS412",
    name: "Roshni Senapati",
    email: "roshni.snil@soa.ac.in",
    phone: "+91 91240 67112",
    bloodGroup: "AB+",
    college: "SOA NSS SNIL",
    unitBatch: "Unit 4 - 2024-29",
    eventsAttended: 14,
    serviceHours: 86,
    status: "Verified",
    joinDate: "2024-01-15",
    contributions: [
      {
        id: "c401",
        title: "Legal Aid & Fundamental Rights Awareness Workshop",
        date: "2024-08-11",
        hours: 22,
        description: "Drafted informational pamphlets on Consumer Rights and Right to Information (RTI) for rural residents.",
        type: "Legal Aid"
      }
    ],
    achievements: [
      {
        id: "a401",
        title: "Justice Shield Badge",
        category: "Legal Aid",
        icon: "Scale",
        color: "text-amber-400",
        bg: "from-amber-500/20 to-yellow-600/10",
        desc: "Conducted 3 community legal awareness clinics",
        date: "Aug 2024"
      }
    ]
  },
  {
    id: "SOA2023NSS518",
    name: "Lipika Das",
    email: "lipika.snc@soa.ac.in",
    phone: "+91 93370 12899",
    bloodGroup: "O-",
    college: "SOA NSS SNC",
    unitBatch: "Unit 3 - 2023-27",
    eventsAttended: 22,
    serviceHours: 134,
    status: "Verified",
    joinDate: "2023-09-01",
    contributions: [
      {
        id: "c501",
        title: "Maternal Health & Nutrition Awareness in Slum Clusters",
        date: "2024-07-19",
        hours: 26,
        description: "Distributed iron-folic acid supplements and dietary charts to 80 expecting mothers in Salia Sahi.",
        type: "Healthcare"
      }
    ],
    achievements: [
      {
        id: "a501",
        title: "Florence Nightingale Star",
        category: "Healthcare",
        icon: "HeartHandshake",
        color: "text-pink-400",
        bg: "from-pink-500/20 to-rose-600/10",
        desc: "Exemplary healthcare delivery in urban community areas",
        date: "Jul 2024"
      }
    ]
  },
  {
    id: "SOA2022NSS610",
    name: "Soumyaranjan Mishra",
    email: "soumya.sps@soa.ac.in",
    phone: "+91 98533 44102",
    bloodGroup: "B-",
    college: "SOA NSS SPS",
    unitBatch: "Unit 6 - 2022-26",
    eventsAttended: 17,
    serviceHours: 102,
    status: "Verified",
    joinDate: "2022-10-10",
    contributions: [
      {
        id: "c601",
        title: "Safe Medication Use & Antibiotic Resistance Drive",
        date: "2024-05-30",
        hours: 18,
        description: "Counseled senior citizens on proper storage and dangers of antibiotic self-medication.",
        type: "Pharmacy"
      }
    ],
    achievements: [
      {
        id: "a601",
        title: "Pharma Care Badge",
        category: "Pharmacy",
        icon: "Pill",
        color: "text-cyan-400",
        bg: "from-cyan-500/20 to-blue-600/10",
        desc: "Spearheaded community health counseling sessions",
        date: "May 2024"
      }
    ]
  },
  {
    id: "SOA2023NSS721",
    name: "Debashree Ray",
    email: "debashree.ibcs@soa.ac.in",
    phone: "+91 99371 90123",
    bloodGroup: "A-",
    college: "SOA NSS IBCS",
    unitBatch: "Unit 7 - 2023-25",
    eventsAttended: 15,
    serviceHours: 94,
    status: "Verified",
    joinDate: "2023-08-25",
    contributions: [
      {
        id: "c701",
        title: "Financial Inclusion & UPI Literacy Drive for Street Vendors",
        date: "2024-06-25",
        hours: 24,
        description: "Assisted 40 small vendors in setting up soundboxes, zero-fee bank accounts, and safety habits.",
        type: "Financial Literacy"
      }
    ],
    achievements: [
      {
        id: "a701",
        title: "Youth Leadership Medal",
        category: "Leadership",
        icon: "Award",
        color: "text-violet-400",
        bg: "from-violet-500/20 to-purple-600/10",
        desc: "Coordinated cross-college financial literacy workshop",
        date: "Jun 2024"
      }
    ]
  },
  {
    id: "SOA2024NSS805",
    name: "Aditya Narayan Nayak",
    email: "aditya.shm@soa.ac.in",
    phone: "+91 94399 11029",
    bloodGroup: "O+",
    college: "SOA SHM NS",
    unitBatch: "Unit 8 - 2024-27",
    eventsAttended: 12,
    serviceHours: 76,
    status: "Verified",
    joinDate: "2024-02-01",
    contributions: [
      {
        id: "c801",
        title: "Food Waste Management & Community Annakshetra Support",
        date: "2024-07-14",
        hours: 20,
        description: "Partnered with local NGOs to redirect excess quality buffet food to shelter homes safely.",
        type: "Community Food"
      }
    ],
    achievements: [
      {
        id: "a801",
        title: "Zero Hunger Champion",
        category: "Hospitality",
        icon: "Utensils",
        color: "text-amber-400",
        bg: "from-amber-500/20 to-yellow-600/10",
        desc: "Salvaged over 400 meals without wastage",
        date: "Jul 2024"
      }
    ]
  },
  {
    id: "SOA2024NSS914",
    name: "Pooja Panigrahi",
    email: "pooja.ivs@soa.ac.in",
    phone: "+91 97762 33418",
    bloodGroup: "B+",
    college: "IVS.NSS",
    unitBatch: "Unit 9 - 2024-29",
    eventsAttended: 16,
    serviceHours: 98,
    status: "Verified",
    joinDate: "2024-01-20",
    contributions: [
      {
        id: "c901",
        title: "Stray Animal Anti-Rabies Vaccination & Deworming Camp",
        date: "2024-08-05",
        hours: 25,
        description: "Vaccinated 110 community dogs against rabies and treated minor injuries in Khandagiri zone.",
        type: "Animal Welfare"
      }
    ],
    achievements: [
      {
        id: "a901",
        title: "Karuna Animal Care Medal",
        category: "Animal Welfare",
        icon: "Heart",
        color: "text-emerald-400",
        bg: "from-emerald-500/20 to-teal-600/10",
        desc: "Over 80 community animals treated and vaccinated",
        date: "Aug 2024"
      }
    ]
  }
];

const STORAGE_KEY_STUDENTS = 'soa_nss_students_v1';
const STORAGE_KEY_AUTH = 'soa_nss_auth_user_v1';

export function initializeDataStore() {
  const existing = localStorage.getItem(STORAGE_KEY_STUDENTS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  }
}

export function getAllStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    return raw ? JSON.parse(raw) : INITIAL_STUDENTS;
  } catch (e) {
    console.error("Failed to load students", e);
    return INITIAL_STUDENTS;
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
}

export function getStudentById(id) {
  const list = getAllStudents();
  return list.find(s => s.id.toLowerCase() === id.toLowerCase()) || null;
}

export function getCurrentAuthUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentAuthUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  }
}

export function loginUser({ userId, password, role }) {
  // Demo check
  if (role === 'admin') {
    if (userId.toLowerCase().includes('admin') || userId.toLowerCase().includes('soa') || userId.length >= 3) {
      const adminUser = {
        id: "ADMIN-SOA-001",
        name: "Prof. (Dr.) Jyoti Ranjan Das",
        role: "admin",
        designation: "Dean & Program Coordinator, SOA NSS Cell",
        email: "nsscoordinator@soa.ac.in",
        phone: "+91 94370 12345"
      };
      setCurrentAuthUser(adminUser);
      return { success: true, user: adminUser };
    }
  }

  // Student check
  const students = getAllStudents();
  let student = students.find(s => s.id.toLowerCase() === userId.toLowerCase());
  
  if (!student) {
    // If not found by exact ID, find by name or fallback to first student for smooth demo
    student = students.find(s => s.name.toLowerCase().includes(userId.toLowerCase()));
  }
  
  if (!student) {
    // Return the default student for frictionless demo if ID matches test
    if (userId.toLowerCase().includes('demo') || userId.toLowerCase().includes('student') || userId === 'SOA2022NSS101') {
      student = students[0];
    }
  }

  if (student) {
    const studentUser = {
      ...student,
      role: 'student'
    };
    setCurrentAuthUser(studentUser);
    return { success: true, user: studentUser };
  }

  return {
    success: false,
    message: "Invalid credentials. Try demo student 'SOA2022NSS101' or demo admin 'admin'."
  };
}

export function registerStudent({ name, id, email, phone, bloodGroup, college }) {
  const students = getAllStudents();
  
  const existing = students.find(s => s.id.toLowerCase() === id.toLowerCase() || s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, message: "A volunteer with this Registration ID or Email already exists." };
  }

  const newStudent = {
    id: id.toUpperCase(),
    name,
    email,
    phone: phone || "+91 98000 00000",
    bloodGroup: bloodGroup || "O+",
    college,
    unitBatch: `${college.split(' ')[0]} Unit - 2024-28`,
    eventsAttended: 1,
    serviceHours: 8,
    status: "Verified",
    joinDate: new Date().toISOString().split('T')[0],
    contributions: [
      {
        id: 'c_' + Date.now(),
        title: "NSS Orientation & Campus Induction Drive",
        date: new Date().toISOString().split('T')[0],
        hours: 8,
        description: `Successfully completed NSS induction, code of conduct pledge, and orientation at ${college}.`,
        type: "Induction"
      }
    ],
    achievements: [
      {
        id: 'a_' + Date.now(),
        title: "NSS New Recruit Badge",
        category: "Orientation",
        icon: "ShieldCheck",
        color: "text-blue-400",
        bg: "from-blue-500/20 to-indigo-600/10",
        desc: "Inducted into SOA NSS University Corps",
        date: "Sep 2024"
      }
    ]
  };

  const updated = [newStudent, ...students];
  saveStudents(updated);
  const user = { ...newStudent, role: 'student' };
  setCurrentAuthUser(user);
  return { success: true, user };
}

export function addStudentContribution(studentId, { title, hours, date, description, type }) {
  const students = getAllStudents();
  const index = students.findIndex(s => s.id.toLowerCase() === studentId.toLowerCase());
  if (index === -1) return { success: false, message: "Student not found" };

  const newContribution = {
    id: 'c_' + Date.now(),
    title,
    hours: Number(hours) || 0,
    date: date || new Date().toISOString().split('T')[0],
    description,
    type: type || "Community Service"
  };

  const current = students[index];
  const updatedContributions = [newContribution, ...(current.contributions || [])];
  const updatedHours = (current.serviceHours || 0) + Number(hours);
  const updatedEvents = (current.eventsAttended || 0) + 1;

  // Potential milestone achievement
  let updatedAchievements = [...(current.achievements || [])];
  if (updatedHours >= 150 && !updatedAchievements.some(a => a.title.includes("Centurion"))) {
    updatedAchievements.unshift({
      id: 'a_' + Date.now(),
      title: "Centurion Service Shield (150+ Hours)",
      category: "Milestone",
      icon: "Award",
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-amber-600/10",
      desc: "Completed over 150 hours of selfless community welfare",
      date: "Sep 2024"
    });
  }

  const updatedStudent = {
    ...current,
    serviceHours: updatedHours,
    eventsAttended: updatedEvents,
    contributions: updatedContributions,
    achievements: updatedAchievements
  };

  students[index] = updatedStudent;
  saveStudents(students);

  // Update session if current user
  const auth = getCurrentAuthUser();
  if (auth && auth.id.toLowerCase() === studentId.toLowerCase()) {
    setCurrentAuthUser({ ...updatedStudent, role: auth.role });
  }

  return { success: true, student: updatedStudent };
}

export function updateStudentStatus(studentId, newStatus) {
  const students = getAllStudents();
  const index = students.findIndex(s => s.id.toLowerCase() === studentId.toLowerCase());
  if (index === -1) return false;
  students[index].status = newStatus;
  saveStudents(students);
  return true;
}

export function exportRecordsToCSV(records) {
  const headers = [
    "Registration ID",
    "Student Name",
    "Email",
    "Phone",
    "Blood Group",
    "Selected College",
    "Unit / Batch",
    "Events Attended",
    "Total Service Hours",
    "Status",
    "Join Date",
    "Latest Contribution Title",
    "Latest Contribution Summary"
  ];

  const rows = records.map(s => {
    const latestC = (s.contributions && s.contributions[0]) || {};
    return [
      `"${s.id}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.phone || ''}"`,
      `"${s.bloodGroup || 'N/A'}"`,
      `"${s.college}"`,
      `"${s.unitBatch || ''}"`,
      s.eventsAttended || 0,
      s.serviceHours || 0,
      `"${s.status || 'Verified'}"`,
      `"${s.joinDate || ''}"`,
      `"${(latestC.title || '').replace(/"/g, '""')}"`,
      `"${(latestC.description || '').replace(/"/g, '""')}"`
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `SOA_NSS_Volunteer_Records_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
}
