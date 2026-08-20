// js/data.js - Centralized Data Store for MJ Solutions

const categories = [
  { id: 'ai-llm', name: 'AI & LLM', desc: 'Learn modern AI and Large Language Models.', icon: '🧠', count: 20 },
  { id: 'network', name: 'Network & Firewall', desc: 'Learn networking, firewalls, VPNs, routing and switching.', icon: '🌐', count: 11 },
  { id: 'servers', name: 'Servers', desc: 'Learn Windows, Linux, virtualization and infrastructure.', icon: '🖥️', count: 14 },
  { id: 'cybersecurity', name: 'Cybersecurity', desc: 'Learn security concepts and practical security operations.', icon: '🛡️', count: 6 },
  { id: 'cloud', name: 'Cloud', desc: 'Learn cloud infrastructure and cloud security.', icon: '☁️', count: 7 },
  { id: 'operations', name: 'IT Operations', desc: 'Learn monitoring, backup, automation and endpoint management.', icon: '⚙️', count: 10 },
  { id: 'itsm', name: 'ITSM', desc: 'Learn IT service management, ITIL, SLA and service desk operations.', icon: '📊', count: 9 },
  { id: 'tools', name: 'Tools', desc: 'Explore useful IT tools and utilities.', icon: '🧰', count: 12 }
];

const topics = [
  // AI & LLM
  {
    id: "what-is-llm",
    title: "What is an LLM?",
    desc: "Understand the basics of Large Language Models and how they process language.",
    category: "AI & LLM",
    difficulty: "Beginner",
    icon: "🧠",
    content: {
      overview: "A Large Language Model (LLM) is an artificial intelligence system designed to understand, generate, and interact with human language.",
      whyItMatters: "LLMs are the foundation of modern AI applications like ChatGPT.",
      howItWorks: "They use neural networks (Transformers) to predict the next word based on context.",
      keyConcepts: ["Neural Networks", "Pre-training", "Next-token prediction"],
      example: "When you type 'The sky is', the LLM predicts 'blue'.",
      advantages: ["Versatility", "Human-like text", "Rapid learning"],
      limitations: ["Hallucinations", "High compute cost", "No true reasoning"],
      security: ["Susceptible to prompt injection", "May leak training data"],
      bestPractices: ["Use system prompts to guide behavior", "Filter outputs"],
      related: ["Generative AI", "Transformers"]
    }
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    desc: "AI systems capable of generating new text, images, or other media.",
    category: "AI & LLM",
    difficulty: "Beginner",
    icon: "✨",
    content: {
      overview: "Generative AI creates new content based on learned patterns from massive datasets.",
      whyItMatters: "Automates content creation, coding, and problem-solving.",
      howItWorks: "Using foundation models like GANs, Diffusion, or Transformers.",
      keyConcepts: ["Foundation Models", "GANs", "Diffusion"],
      example: "Using Midjourney to generate an image from text.",
      advantages: ["Creativity", "Speed", "Scale"],
      limitations: ["Quality control", "Copyright issues"],
      security: ["Deepfakes", "Phishing"],
      bestPractices: ["Human in the loop validation"],
      related: ["What is an LLM?"]
    }
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    desc: "The art and science of writing effective instructions for AI models.",
    category: "AI & LLM",
    difficulty: "Beginner",
    icon: "✍️",
    content: {
      overview: "Structuring text that can be interpreted and understood by a generative AI model.",
      whyItMatters: "Determines the quality, accuracy, and usefulness of the output.",
      howItWorks: "Providing context, constraints, and examples.",
      keyConcepts: ["Zero-shot", "Few-shot", "Chain of thought"],
      example: "Instead of 'Write a story', use 'Write a 500-word sci-fi story about a robot...'",
      advantages: ["Improves accuracy", "No coding needed"],
      limitations: ["Model dependent", "Trial and error"],
      security: ["Prompt Injection"],
      bestPractices: ["Be specific", "Give examples", "Define the persona"],
      related: ["LLM Security"]
    }
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation (RAG)",
    desc: "Connecting LLMs to your private data to reduce hallucinations.",
    category: "AI & LLM",
    difficulty: "Intermediate",
    icon: "🔍",
    content: {
      overview: "RAG improves LLM responses by grounding the model on external knowledge sources.",
      whyItMatters: "Prevents hallucinations and allows querying private data.",
      howItWorks: "Searches a database for relevant documents, then sends question + documents to LLM.",
      keyConcepts: ["Vector Search", "Embeddings", "Chunking"],
      example: "Querying a company handbook using a chatbot.",
      advantages: ["Reduces hallucinations", "Data remains private"],
      limitations: ["Relies on search quality"],
      security: ["RAG Data Poisoning", "Access control bypass"],
      bestPractices: ["Optimize chunk sizes", "Implement RBAC on document retrieval"],
      related: ["Vector Databases", "Embeddings"]
    },
    visualFlow: "Documents → Chunking → Embeddings → Vector Database → Retrieval → LLM → Response"
  },
  // Network & Firewall
  {
    id: "fortigate-basics",
    title: "FortiGate Firewall Basics",
    desc: "Understanding core Fortinet firewall concepts and policies.",
    category: "Network & Firewall",
    difficulty: "Intermediate",
    icon: "🧱",
    content: {
      overview: "FortiGate is a Next-Generation Firewall (NGFW) providing routing, switching, and security.",
      whyItMatters: "Protects enterprise networks from internal and external threats.",
      howItWorks: "Uses stateful inspection, IPS, web filtering, and app control based on configured policies.",
      keyConcepts: ["Firewall Policies", "NAT", "Security Profiles", "VDOMs"],
      example: "Creating a policy to allow internal VLAN 10 to access the internet while blocking social media.",
      advantages: ["Unified Threat Management", "ASIC hardware acceleration"],
      limitations: ["Complex licensing", "Steep learning curve for advanced features"],
      security: ["Ensure implicit deny is active", "Update firmware regularly"],
      bestPractices: ["Use zones", "Enable logging on deny policies", "Use objects instead of raw IPs"],
      related: ["VLAN", "VPN"]
    }
  },
  // Servers
  {
    id: "linux-basics",
    title: "Linux Basics",
    desc: "Core concepts of Linux server administration.",
    category: "Servers",
    difficulty: "Beginner",
    icon: "🐧",
    content: {
      overview: "Linux is an open-source operating system widely used for web servers, databases, and cloud infrastructure.",
      whyItMatters: "It powers the majority of the internet and enterprise backend systems.",
      howItWorks: "Uses a monolithic kernel with GNU utilities. Configured via text files in /etc/.",
      keyConcepts: ["File Permissions", "Processes", "Package Management", "Systemd"],
      example: "Using 'systemctl restart nginx' to restart the web server.",
      advantages: ["Free", "Stable", "Highly customizable", "Secure"],
      limitations: ["Steep learning curve for beginners", "Less GUI management than Windows"],
      security: ["Use SSH keys", "Disable root login", "Configure firewall (UFW/firewalld)"],
      bestPractices: ["Follow principle of least privilege", "Automate with bash/ansible"],
      related: ["Web Server", "Proxmox"]
    }
  },
  // Cybersecurity
  {
    id: "zero-trust",
    title: "Zero Trust Architecture",
    desc: "Never trust, always verify.",
    category: "Cybersecurity",
    difficulty: "Intermediate",
    icon: "🔐",
    content: {
      overview: "A security model that requires strict identity verification for every person and device trying to access resources.",
      whyItMatters: "Traditional perimeter security (VPNs/Firewalls) is no longer sufficient due to cloud and remote work.",
      howItWorks: "Uses Micro-segmentation, MFA, and continuous monitoring.",
      keyConcepts: ["Identity Access Management", "Micro-segmentation", "Least Privilege"],
      example: "Requiring MFA and checking device compliance before allowing access to an internal application, even if the user is on the corporate network.",
      advantages: ["Minimizes blast radius of a breach", "Supports remote work securely"],
      limitations: ["Complex to implement", "Can cause user friction if not done well"],
      security: ["It IS the security framework"],
      bestPractices: ["Start with identity", "Segment networks", "Log everything"],
      related: ["IAM", "Firewalls"]
    }
  }
];

const paths = [
  {
    id: "beginner-it",
    title: "Beginner IT Path",
    level: "Beginner",
    topicsCount: 5,
    time: "~5 hours",
    items: ["Networking Basics", "Linux Basics", "Windows Basics", "Server Fundamentals", "Cybersecurity Fundamentals"]
  },
  {
    id: "network-engineer",
    title: "Network Engineer Path",
    level: "Intermediate",
    topicsCount: 7,
    time: "~12 hours",
    items: ["Networking Fundamentals", "VLAN", "Routing", "Switching", "Firewall", "VPN", "Monitoring"]
  },
  {
    id: "sysadmin",
    title: "System Administrator Path",
    level: "Intermediate",
    topicsCount: 7,
    time: "~15 hours",
    items: ["Linux", "Windows Server", "Active Directory", "DNS", "DHCP", "Backup", "Monitoring"]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer Path",
    level: "Advanced",
    topicsCount: 7,
    time: "~20 hours",
    items: ["AI Fundamentals", "LLM", "Prompt Engineering", "Embeddings", "RAG", "Vector Databases", "AI Agents"]
  }
];

const commands = [
  { cmd: "ls -la", desc: "List all files in long format, including hidden files.", category: "Linux", example: "ls -la /var/log", warning: "" },
  { cmd: "df -h", desc: "Display disk space usage in human-readable format.", category: "Linux", example: "df -h", warning: "" },
  { cmd: "systemctl status <service>", desc: "Check the status of a systemd service.", category: "Linux", example: "systemctl status sshd", warning: "" },
  { cmd: "ipconfig /all", desc: "Display full TCP/IP configuration for all adapters.", category: "Windows", example: "ipconfig /all", warning: "" },
  { cmd: "tracert <domain>", desc: "Trace the route packets take to a network host.", category: "Windows", example: "tracert google.com", warning: "" },
  { cmd: "ping <ip>", desc: "Test reachability of a host on an IP network.", category: "Network", example: "ping 8.8.8.8", warning: "" }
];

const glossary = [
  { term: "AI", definition: "Artificial Intelligence. Systems that mimic human intelligence." },
  { term: "LLM", definition: "Large Language Model. AI trained on vast amounts of text to understand and generate human language." },
  { term: "VLAN", definition: "Virtual Local Area Network. A logical subnetwork that groups a collection of devices on separate physical LANs." },
  { term: "VPN", definition: "Virtual Private Network. Extends a private network across a public network securely." },
  { term: "Active Directory", definition: "Microsoft directory service for Windows domain networks." },
  { term: "RAG", definition: "Retrieval-Augmented Generation. Giving an LLM access to external databases to answer questions." },
  { term: "SIEM", definition: "Security Information and Event Management. Real-time analysis of security alerts generated by network hardware and applications." },
  { term: "Zero Trust", definition: "Security framework requiring all users to be authenticated and authorized before being granted access." }
];

// Provide global access
window.knowledgeData = { categories, topics, paths, commands, glossary };
