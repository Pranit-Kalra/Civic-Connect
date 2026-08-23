export const initialDepartments = [
  { id: 1, name: "Road & Transport", code: "RT", icon: "🛣️", totalStaff: 12 },
  { id: 2, name: "Sanitation & Waste Management", code: "SWM", icon: "🗑️", totalStaff: 18 },
  { id: 3, name: "Water Supply & Drainage", code: "WSD", icon: "🚰", totalStaff: 15 },
  { id: 4, name: "Electricity & Lighting", code: "EL", icon: "💡", totalStaff: 10 },
  { id: 5, name: "Public Parks & Property", code: "PPP", icon: "🌳", totalStaff: 8 }
];

export const initialResolvers = [
  {
    id: 101,
    name: "Rahul Sharma",
    email: "rahul.sharma@civicconnect.gov",
    password: "resolver123",
    department: "Road & Transport",
    departmentId: 1,
    role: "resolver",
    phone: "+91 98765 43210",
    assignedIssuesCount: 4,
    status: "Active"
  },
  {
    id: 102,
    name: "Priya Patel",
    email: "priya.patel@civicconnect.gov",
    password: "resolver123",
    department: "Sanitation & Waste Management",
    departmentId: 2,
    role: "resolver",
    phone: "+91 98765 43211",
    assignedIssuesCount: 3,
    status: "Active"
  },
  {
    id: 103,
    name: "Vikram Singh",
    email: "vikram.singh@civicconnect.gov",
    password: "resolver123",
    department: "Water Supply & Drainage",
    departmentId: 3,
    role: "resolver",
    phone: "+91 98765 43212",
    assignedIssuesCount: 2,
    status: "Active"
  },
  {
    id: 104,
    name: "Anita Roy",
    email: "anita.roy@civicconnect.gov",
    password: "resolver123",
    department: "Electricity & Lighting",
    departmentId: 4,
    role: "resolver",
    phone: "+91 98765 43213",
    assignedIssuesCount: 3,
    status: "Active"
  }
];

export const initialUsers = [];

export const verifyPassword = (email, password, resolversList = initialResolvers, usersList = initialUsers) => {
  if (!email || typeof email !== 'string') {
    return { success: false, message: 'Please enter a valid email address.', user: null };
  }
  if (!password || typeof password !== 'string') {
    return { success: false, message: 'Please enter your password.', user: null };
  }

  const cleanEmail = email.trim().toLowerCase();

  if (cleanEmail === 'admin@civicconnect.gov') {
    if (password !== 'admin123') {
      return { success: false, message: 'Incorrect password for Admin account.', user: null };
    }
    return {
      success: true,
      message: 'Admin password verified.',
      user: {
        id: 999,
        name: 'Admin User',
        email: 'admin@civicconnect.gov',
        role: 'admin',
        phone: '+91 99999 00000',
        city: 'Headquarters',
        joinedDate: '01 Jan 2026'
      }
    };
  }

  let found = resolversList ? resolversList.find(r => r.email && r.email.trim().toLowerCase() === cleanEmail) : null;

  if (!found && usersList) {
    found = usersList.find(u => u.email && u.email.trim().toLowerCase() === cleanEmail);
  }

  if (!found) {
    return { success: false, message: `No account registered with email address "${email}". Please create a new account first.`, user: null };
  }

  const storedPassword = found.password || (found.role === 'resolver' ? 'resolver123' : 'password123');

  if (password !== storedPassword) {
    return { success: false, message: `Incorrect password entered for ${email}.`, user: null };
  }

  return { success: true, message: 'Password verified successfully!', user: found };
};

export const verifyResolverPassword = (email, password, resolversList = initialResolvers) => {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.', user: null };
  }

  const cleanEmail = email.trim().toLowerCase();
  const resolver = resolversList ? resolversList.find(r => r.email && r.email.trim().toLowerCase() === cleanEmail) : null;

  if (!resolver) {
    return { success: false, message: `No resolver account found with email address "${email}".`, user: null };
  }

  const storedPassword = resolver.password || 'resolver123';
  if (password !== storedPassword) {
    return { success: false, message: `Incorrect password for resolver account "${email}".`, user: null };
  }

  return { success: true, message: 'Resolver password verified successfully!', user: resolver };
};

export const initialIssues = [
  {
    id: 1,
    title: "Large pothole near main market road",
    description: "Deep pothole causing severe traffic slowdown and risk of two-wheeler accidents near Central Market Gate 2.",
    category: "Road",
    location: "Market Road, Sector 4",
    status: "In Progress",
    reportedBy: "Amit Kumar",
    citizenId: 1,
    assignedTo: "Rahul Sharma",
    resolverId: 101,
    date: "18 Aug 2026",
    resolutionNote: "Work order created. Repair crew dispatched to fill asphalt.",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Uncollected garbage heap behind Community Center",
    description: "Trash has not been cleared for 4 days. Foul smell and stray animal gathering near residential homes.",
    category: "Garbage",
    location: "Block B, Green Park",
    status: "Pending",
    reportedBy: "Neha Gupta",
    citizenId: 2,
    assignedTo: "Priya Patel",
    resolverId: 102,
    date: "17 Aug 2026",
    resolutionNote: "",
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Broken streetlight in Sector 7 Main Avenue",
    description: "Dark stretch of road due to 3 continuous non-functional street lamps causing safety concerns at night.",
    category: "Electricity",
    location: "Sector 7, Avenue 3",
    status: "Assigned",
    reportedBy: "Amit Kumar",
    citizenId: 1,
    assignedTo: "Anita Roy",
    resolverId: 104,
    date: "16 Aug 2026",
    resolutionNote: "Inspection scheduled for evening.",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Water pipeline leak near Bus Stop #12",
    description: "Clean drinking water leaking continuously onto the road for the past 24 hours.",
    category: "Water",
    location: "Station Road, Near Bus Stop 12",
    status: "Resolved",
    reportedBy: "Neha Gupta",
    citizenId: 2,
    assignedTo: "Vikram Singh",
    resolverId: 103,
    date: "12 Aug 2026",
    resolutionNote: "Main pipe valve repaired and sealed permanently by line crew.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Damaged bench and fence in Children's Park",
    description: "Wooden seating bench broken and metal mesh fence sagging near park entry.",
    category: "Public Property",
    location: "Civic Children's Park",
    status: "Pending",
    reportedBy: "Amit Kumar",
    citizenId: 1,
    assignedTo: null,
    resolverId: null,
    date: "19 Aug 2026",
    resolutionNote: "",
    imageUrl: ""
  }
];
