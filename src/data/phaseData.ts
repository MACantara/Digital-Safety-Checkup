import type { LucideIcon } from "lucide-react";
import { ShieldAlert, ShieldCheck, KeyRound } from "lucide-react";

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Principle {
  id: string;
  title: string;
  what: string;
  how: string;
  why: string;
}

export interface ExampleMessage {
  type: "sms" | "email" | "dm";
  label: string;
  sender: string;
  subject?: string;
  content: string;
  redFlagIds: string[]; // which principle IDs are visible here
}

export interface ActivityOption {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface Activity {
  question: string;
  contextLabel?: string;
  context?: string;
  options: ActivityOption[];
  multiSelect: boolean;
  correctExplanation: string;
}

export interface ContextItem {
  rank: number;
  label: string;
  detail: string;
  badge?: string;
}

export interface PhaseContext {
  slideTitle: string;
  subtitle?: string;
  items: ContextItem[];
  footnote?: string;
}

export interface PreventionTool {
  name: string;
  category: string;
  description: string;
  free?: boolean;
  badge?: string;
}

export interface PreventionSection {
  slideTitle: string;
  subtitle?: string;
  tools: PreventionTool[];
  actionTip: string;
}

export interface Phase {
  id: number;
  title: string;
  duration: string;
  icon: LucideIcon;
  tagline: string;
  principles: Principle[];
  context?: PhaseContext;
  examples?: ExampleMessage[];
  prevention?: PreventionSection;
  activity: Activity;
  summaryTakeaway: string;
  summaryAction: string;
}

// ─── Phase Data ───────────────────────────────────────────────────────────────

export const phases: Phase[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // Phase 1 – Scam Awareness
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Scam Awareness",
    duration: "5 min",
    icon: ShieldAlert,
    tagline: "Know 4 red flags and you'll spot 90% of scams before they trick you.",
    principles: [
      {
        id: "rf1",
        title: "Urgency",
        what: "Messages that pressure you to act immediately — \"Act now or your account will be locked.\"",
        how: "Scammers create fake deadlines and emergencies: \"You have 24 hours to verify,\" \"Final warning,\" \"Respond immediately.\"",
        why: "Urgency bypasses rational thinking. When you feel rushed, you stop questioning. That's exactly what they want — act before you think.",
      },
      {
        id: "rf2",
        title: "Emotional Manipulation",
        what: "Messages triggering strong emotions — fear of losing something, excitement about a prize, or sudden romantic interest from a stranger.",
        how: "Fear: \"Your account has been compromised.\" Greed: \"You've won ₱50,000!\" Romance: a stranger who becomes unexpectedly close, then asks for help.",
        why: "Strong emotions shut down critical thinking. If your heart is racing from a message, your guard is already down — which is the goal.",
      },
      {
        id: "rf3",
        title: "Suspicious Links or Domains",
        what: "URLs that look almost like real brands — amaz0n-support.com, bdo-secure-ph.net, gcash-support.xyz.",
        how: "They swap letters (0 for o), add words like -support or -verify, or use unexpected domain extensions (.net, .xyz instead of .com).",
        why: "Once you click, the fake site looks identical to the real one. You enter your credentials not realising you're handing them directly to a scammer.",
      },
      {
        id: "rf4",
        title: "Asking for OTP or Personal Info",
        what: "Anyone asking for your One-Time Password, password, or ID — even if they claim to be from your bank's security team.",
        how: "The script: \"Hi, I'm from BDO security. We detected unusual activity. Please share the OTP just sent to you so we can verify your identity.\"",
        why: "No legitimate bank, app, or government agency will ever ask for your OTP. The entire purpose of an OTP is that only you should ever see it.",
      },
    ],
    examples: [
      {
        type: "sms",
        label: "Fake SMS",
        sender: "BDO BANK",
        content:
          "BDO ALERT: Unauthorized login detected on your account. Verify immediately to avoid suspension:\nbdo-secure-ph.net/verify\n\nReply STOP to unsubscribe.",
        redFlagIds: ["rf1", "rf3"],
      },
      {
        type: "email",
        label: "Phishing Email",
        sender: "support@paypal-helpdesk.com",
        subject: "Action Required: Unusual activity on your account",
        content:
          "Dear Customer,\n\nWe detected suspicious activity on your PayPal account. Your account will be permanently limited within 24 hours unless you verify your information immediately.\n\nClick here to verify: paypa1-secure.com/verify\n\nPayPal Security Team",
        redFlagIds: ["rf1", "rf3"],
      },
      {
        type: "dm",
        label: "Fake Social Media DM",
        sender: "Facebook for Pages ✓",
        content:
          "Your Page has been reported for violating our Community Standards and will be permanently disabled within 24 hours.\n\nTo appeal this decision and restore your Page, click below immediately:\n\nfacebook-appeals-ph.com/appeal\n\nFailure to act will result in permanent removal.",
        redFlagIds: ["rf1", "rf3"],
      },
    ],
    prevention: {
      slideTitle: "How to Protect Yourself from Scams",
      subtitle: "Free tools and habits that block the most common scam techniques.",
      tools: [
        {
          name: "Go Direct — Never Click Links",
          category: "Habit",
          description: "Open your bank app or official website manually. If there's a real alert, it will show there too. This one habit blocks nearly all phishing attacks.",
          badge: "Most Effective",
        },
        {
          name: "VirusTotal (virustotal.com)",
          category: "Website",
          description: "Free link scanner. Paste any suspicious URL before clicking — it checks against 70+ security databases in seconds.",
          free: true,
        },
        {
          name: "Google Safe Browsing",
          category: "Built-in",
          description: "Automatically active in Chrome, Gmail, and Android. It warns you before you visit a known phishing or malware site.",
          free: true,
          badge: "Already Enabled",
        },
        {
          name: "SMS Spam Filter (Android)",
          category: "Setting",
          description: "Google Messages: open the app → Settings → Spam protection → turn ON. Automatically filters suspicious messages into a spam folder.",
          free: true,
        },
        {
          name: "Report Scams: PNP-ACG",
          category: "Report",
          description: "Report cybercrime to the PNP Anti-Cybercrime Group at cybercrime.gov.ph or call 1800-1888-5600. Reports help protect others.",
          free: true,
        },
        {
          name: "Report Scams: DICT",
          category: "Report",
          description: "File a report at reportascam.dict.gov.ph — the Philippine government's official anti-scam reporting portal.",
          free: true,
        },
      ],
      actionTip: "Install VirusTotal's browser extension — it automatically flags dangerous links before you click them. Takes 30 seconds to set up.",
    },
    activity: {
      question: "Look at this SMS carefully. Which red flag(s) do you see?",
      contextLabel: "Suspicious Message:",
      context:
        "GCASH: Your account has been flagged for unusual activity. To avoid account suspension, verify your identity NOW at gcash-secure-verify.net/ph",
      options: [
        {
          id: "a1",
          text: "Urgency — \"NOW\" + threat of account suspension",
          correct: true,
          feedback:
            "Yes. \"NOW\" combined with a threat of losing your account is manufactured urgency — the scammer's most reliable weapon. Pause whenever you feel this.",
        },
        {
          id: "a2",
          text: "Suspicious link — gcash-secure-verify.net is not GCash's real domain",
          correct: true,
          feedback:
            "Correct. The real GCash domain is gcash.com. Extra words like -secure-verify are added to look official. Always check the core domain.",
        },
        {
          id: "a3",
          text: "This looks normal — GCash sends these regularly",
          correct: false,
          feedback:
            "This is a scam. GCash never sends links asking you to verify outside their official app. The two red flags: urgency (\"NOW\") and a fake domain.",
        },
        {
          id: "a4",
          text: "The sender number is unknown",
          correct: false,
          feedback:
            "That's a minor clue, but scammers can spoof official sender names (you can receive fake messages appearing to come from \"GCASH\"). The stronger flags are urgency and the fake domain.",
        },
      ],
      multiSelect: true,
      correctExplanation:
        "Two red flags: (1) Urgency — \"NOW\" and threat of suspension force you to act without thinking. (2) Fake domain — gcash-secure-verify.net is not gcash.com. Real GCash never sends links outside their app.",
    },
    context: {
      slideTitle: "Top 10 Online Scams in the Philippines",
      subtitle: "These are the scams most frequently reported to BSP, NBI, and PNP-ACG.",
      items: [
        {
          rank: 1,
          label: "OTP / Account Takeover",
          detail: "A fake \"bank agent\" calls and asks for the OTP just sent to your phone to \"verify\" your account.",
          badge: "#1 Most Reported",
        },
        {
          rank: 2,
          label: "Online Selling Fraud",
          detail: "Fake sellers or buyers on Facebook Marketplace and OLX — payment made, goods never arrive (or vice versa).",
          badge: "₱Billions Lost",
        },
        {
          rank: 3,
          label: "SMS & Email Phishing",
          detail: "Links disguised as bank alerts (BDO, BPI, Metrobank), GCash notices, or government messages.",
        },
        {
          rank: 4,
          label: "Fake Job Offers",
          detail: "High-paying work-from-home roles that require an upfront \"processing fee\" or government ID before you can start.",
          badge: "Targets Fresh Grads",
        },
        {
          rank: 5,
          label: "Investment / Ponzi Schemes",
          detail: "Social media ads and influencer posts promising 20–50% monthly returns on crypto or \"managed funds.\"",
          badge: "₱8B+ Lost (2023)",
        },
        {
          rank: 6,
          label: "Vishing (Voice Phishing)",
          detail: "Callers impersonate BSP, BIR, SSS, or PAGCOR officers and threaten arrest unless you pay or share info.",
        },
        {
          rank: 7,
          label: "Romance Scams",
          detail: "Strangers build weeks of online intimacy, then ask for money, a \"plane ticket,\" or crypto for an emergency.",
          badge: "Pig Butchering",
        },
        {
          rank: 8,
          label: "Tech Support Scams",
          detail: "\"Microsoft\" or \"Google\" calls warning your device is infected — they request remote access to \"fix\" it.",
        },
        {
          rank: 9,
          label: "Loan App Scams",
          detail: "Apps that grant small loans then harvest your contacts and photos, using them for harassment and extortion.",
          badge: "Data Theft Risk",
        },
        {
          rank: 10,
          label: "QR Code Fraud",
          detail: "Tampered QR codes at restaurants, stalls, or fundraisers that redirect your GCash payment to the scammer.",
        },
      ],
      footnote:
        "Sources: BSP Consumer Assistance Mechanism 2024 · NBI Cybercrime Division · PNP Anti-Cybercrime Group (PNP-ACG) · DICT 2023 Cybersecurity Report",
    },
    summaryTakeaway:
      "Manufactured urgency + a suspicious domain = scam. Pause before you click anything.",
    summaryAction:
      "Next time a message makes you feel rushed, wait 10 seconds and ask: \"Did I initiate this contact?\" If not, it's a scam.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Phase 2 – Data Protection Basics
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Data Protection Basics",
    duration: "5 min",
    icon: ShieldCheck,
    tagline: "5 behaviours that protect your accounts and devices — practical steps, not theory.",
    principles: [
      {
        id: "dp1",
        title: "Don't Click Unknown Links",
        what: "If you didn't expect the message, don't click the link — regardless of who it appears to be from.",
        how: "Open the official app or website directly. If someone says your account has a problem, navigate to it yourself — never through their link.",
        why: "One wrong click can silently install malware, steal your session cookies, or redirect you to a perfect replica of a login page.",
      },
      {
        id: "dp2",
        title: "Be Cautious on Public Wi-Fi",
        what: "Avoid logging into banking, GCash, or email on public or unknown Wi-Fi networks.",
        how: "Browse freely on public Wi-Fi. Switch to mobile data when accessing anything sensitive — it takes 3 seconds.",
        why: "Attackers create fake hotspots (\"Mall_Free_WiFi\") that look real. Even on legitimate public networks, unencrypted traffic can be read.",
      },
      {
        id: "dp3",
        title: "Turn On Auto-Updates",
        what: "Keep your phone and apps set to update automatically, without waiting to do it manually.",
        how: "iOS: Settings → General → Software Update → Automatic Updates ON.\nAndroid: Settings → System → System Update → enable auto.",
        why: "Every unpatched vulnerability is a door attackers can walk through. Updates close those doors. Hackers actively target unpatched devices.",
      },
      {
        id: "dp4",
        title: "Enable 2FA on Key Accounts",
        what: "Two-Factor Authentication adds a second layer — even if your password is stolen, the attacker still can't log in.",
        how: "Go to Security Settings on your email and enable 2-Step Verification. Use an authenticator app (Google Authenticator, Aegis) rather than SMS when possible.",
        why: "Your email is the master key to everything — it can reset every other account you own. Whoever controls it, controls your digital life.",
      },
      {
        id: "dp5",
        title: "Lock Your Phone",
        what: "Set a screen lock: minimum 6-digit PIN, or biometric (fingerprint or face unlock).",
        how: "Settings → Security → Screen Lock. Takes under 30 seconds to set up.",
        why: "A lost or stolen phone without a screen lock gives a stranger instant access to GCash, banking apps, email, and all saved passwords.",
      },
    ],
    prevention: {
      slideTitle: "Your Digital Security Toolkit",
      subtitle: "Free tools that do the heavy lifting so you don't have to think about it.",
      tools: [
        {
          name: "Google Authenticator / Aegis",
          category: "App",
          description: "Free 2FA authenticator apps. Generate time-based one-time codes that are far more secure than SMS OTPs. Aegis (Android) is open-source and recommended.",
          free: true,
          badge: "Recommended",
        },
        {
          name: "Microsoft Authenticator",
          category: "App",
          description: "Free 2FA app for iOS and Android. Supports push-notification approvals, making 2FA as easy as tapping a button.",
          free: true,
        },
        {
          name: "HaveIBeenPwned.com",
          category: "Website",
          description: "Enter your email to instantly see if it appeared in any known data breach. Free, trusted by security professionals worldwide.",
          free: true,
          badge: "Check Now",
        },
        {
          name: "Google Security Checkup",
          category: "Built-in",
          description: "Visit myaccount.google.com/security-checkup — reviews your Gmail 2FA, connected apps, and suspicious activity in one place.",
          free: true,
          badge: "Already Available",
        },
        {
          name: "ProtonVPN / Cloudflare WARP",
          category: "App",
          description: "Free VPN apps for safer browsing on public Wi-Fi. Cloudflare WARP is especially fast. Use either when you cannot switch to mobile data.",
          free: true,
        },
        {
          name: "Google Find My Device / Apple Find My",
          category: "Built-in",
          description: "Remotely locate, lock, or erase a lost or stolen phone. Enable now: Android at android.com/find · iPhone at icloud.com/find.",
          free: true,
          badge: "Enable Today",
        },
      ],
      actionTip: "Check your email at HaveIBeenPwned.com right now. If it appears in a breach, change that password and enable 2FA immediately.",
    },
    activity: {
      question:
        "Which set of actions gives you the strongest day-to-day protection for your accounts?",
      options: [
        {
          id: "b1",
          text: "Enable a 2FA authenticator app + use mobile data (not public Wi-Fi) for banking + lock your phone with a PIN",
          correct: true,
          feedback:
            "This is the trifecta. A 2FA authenticator app blocks account takeover even if your password is stolen. Avoiding public Wi-Fi removes network interception risk. A locked phone prevents physical access to your apps — all three work together.",
        },
        {
          id: "b2",
          text: "Use a long password + check messages daily + update apps manually once a month",
          correct: false,
          feedback:
            "Good instincts, but monthly updates leave you exposed for weeks. Enable auto-updates so your device patches security vulnerabilities the same day they're released — not a month later.",
        },
        {
          id: "b3",
          text: "Enable auto-updates only + rely on your bank's fraud detection to catch problems",
          correct: false,
          feedback:
            "Auto-updates are essential, but relying solely on fraud detection is passive defence. Banks may take days to detect suspicious activity. 2FA and a locked phone mean the attacker never gets in at all.",
        },
        {
          id: "b4",
          text: "Use a VPN at all times + check HaveIBeenPwned monthly + use a 4-digit PIN",
          correct: false,
          feedback:
            "Checking HaveIBeenPwned is smart, but a 4-digit PIN offers far less protection than a 6-digit PIN or biometric lock. And while a VPN helps on public Wi-Fi, switching to mobile data for banking is simpler and equally safe.",
        },
      ],
      multiSelect: false,
      correctExplanation:
        "The three highest-impact daily habits: (1) Use a 2FA authenticator app on key accounts. (2) Switch to mobile data when accessing banking or GCash — never public Wi-Fi. (3) Set a 6-digit PIN or biometric lock on your phone. These three actions block the most common attack vectors.",
    },
    context: {
      slideTitle: "Why Data Protection Matters: The Numbers",
      subtitle: "These are not hypothetical risks — they have already happened, including here in the Philippines.",
      items: [
        {
          rank: 1,
          label: "90 Million+ Filipinos",
          detail: "Voter records leaked from a 2016 COMELEC breach — full names, birthdays, addresses, fingerprints. One of Asia's largest ever.",
          badge: "Largest PH Breach",
        },
        {
          rank: 2,
          label: "₱3.8 Billion Lost",
          detail: "Cybercrime losses reported to BSP in 2023 alone — up from ₱791 million in 2022. A nearly 5× increase in one year.",
          badge: "5× Increase",
        },
        {
          rank: 3,
          label: "81% of Breaches",
          detail: "Involve stolen or weak passwords (Verizon DBIR 2024). Your password is the first line of defence — and the most common failure point.",
          badge: "Key Stat",
        },
        {
          rank: 4,
          label: "207 Days on Average",
          detail: "How long it takes a company to even detect a data breach (IBM 2024). Your data may have been stolen months before anyone tells you.",
        },
        {
          rank: 5,
          label: "1 in 3 Filipinos",
          detail: "Have clicked a phishing link, according to a 2023 DICT cybersecurity survey — making Filipinos among the most targeted in Southeast Asia.",
          badge: "Local Finding",
        },
        {
          rank: 6,
          label: "30 Seconds",
          detail: "How long it takes a thief to open GCash on an unlocked stolen phone and transfer your entire balance to an anonymous account.",
          badge: "Lock Your Phone",
        },
      ],
      footnote:
        "Sources: IBM Cost of Data Breach Report 2024 · Verizon DBIR 2024 · BSP Consumer Protection Report 2024 · DICT 2023 Cybersecurity Survey · COMELEC Incident Report 2016",
    },
    summaryTakeaway:
      "Your email + 2FA = your most important security combination. Whoever controls your email controls everything.",
    summaryAction:
      "Go to your email's Security Settings and enable 2-Step Verification right now. It takes under 2 minutes.",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Phase 3 – Password Upgrade
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Password Upgrade",
    duration: "5 min",
    icon: KeyRound,
    tagline: "One formula for passwords that are both uncrackable and memorable.",
    principles: [
      {
        id: "pw1",
        title: "Length Beats Complexity",
        what: "A long passphrase with simple words is far stronger than a short password full of symbols.",
        how: "Formula: [Word]-[Word]-[Word]-[Number][Symbol]\nWeak: Maria123\nStrong: River-Coffee-Sunset-92!",
        why: "Hacking tools try billions of combinations per second. \"Maria123\" is cracked in under a second. \"River-Coffee-Sunset-92!\" would take centuries — and it's actually easier to remember.",
      },
      {
        id: "pw2",
        title: "Never Reuse Passwords",
        what: "Every important account — email, banking, social media — needs its own unique password.",
        how: "Think of it like keys: you wouldn't use the same key for your house, car, and office. Each door of your digital life needs a different key.",
        why: "Websites get breached constantly. When they do, attackers automatically try those stolen passwords on Gmail, Facebook, GCash, and banking sites. One reused password = all accounts exposed.",
      },
      {
        id: "pw3",
        title: "Use a Password Manager",
        what: "A password manager generates and stores a unique strong password for every site — you only memorise one master passphrase.",
        how: "Bitwarden (free, open-source): install the app and browser extension, create a master passphrase using the formula, then add your accounts. The app remembers everything else.",
        why: "The only realistic way to have a unique strong password for every account is to let software manage them. Nobody can memorise 50 different passphrases — but you only need to memorise one.",
      },
    ],
    prevention: {
      slideTitle: "Password Tools & Resources",
      subtitle: "You only need to remember one passphrase — let these tools handle the rest.",
      tools: [
        {
          name: "Bitwarden",
          category: "App",
          description: "Free, open-source password manager. Generates and stores a unique strong password for every account. Works on all devices with a browser extension. Install at bitwarden.com.",
          free: true,
          badge: "Highly Recommended",
        },
        {
          name: "Google Password Manager",
          category: "Built-in",
          description: "Built into Chrome and Android. Saves passwords automatically and warns you about reused or compromised ones. A great starting point if you use Google accounts.",
          free: true,
          badge: "Already Available",
        },
        {
          name: "Apple Passwords App",
          category: "Built-in",
          description: "Built into iOS 18+ and macOS Sequoia. Stores passwords, passkeys, and Wi-Fi credentials. Alerts you if any saved passwords appear in known data breaches.",
          free: true,
          badge: "iOS / macOS",
        },
        {
          name: "HaveIBeenPwned — Passwords",
          category: "Website",
          description: "Check if a specific password was exposed in a breach at haveibeenpwned.com/passwords. If it appears, never use it — attackers have it in their lists.",
          free: true,
        },
        {
          name: "Hive Systems Password Table",
          category: "Website",
          description: "Visual guide showing exactly how long passwords take to crack based on length and complexity. Visit hivesystems.com/password-table to see why length always wins.",
          free: true,
        },
        {
          name: "KeePassXC",
          category: "App",
          description: "Free, offline-only, open-source password manager. Stores your password database locally — nothing goes to the cloud. Best for privacy-first users.",
          free: true,
        },
      ],
      actionTip: "Install Bitwarden today and add your email and banking accounts first. Use the passphrase formula for your master password: [Word]-[Word]-[Word]-[Number][Symbol].",
    },
    activity: {
      question:
        "Which of these passwords would take a computer the longest to crack?",
      options: [
        {
          id: "c1",
          text: "P@ssw0rd123! — 12 characters with symbols and number substitutions",
          correct: false,
          feedback:
            "This looks strong but it's a well-known pattern. Hacking tools have entire dictionaries of \"complex\" passwords with substitutions (@ for a, 0 for o). It's cracked much faster than it looks.",
        },
        {
          id: "c2",
          text: "Maria1990! — 10 characters using personal information",
          correct: false,
          feedback:
            "Personal info (names, birth years) is the very first thing attackers try. This would be cracked in seconds using basic dictionary attacks combined with personal data found online.",
        },
        {
          id: "c3",
          text: "River-Coffee-Sunset-92! — 23 characters, 3 unrelated words",
          correct: true,
          feedback:
            "This is the winner. 23 characters with no predictable pattern. At billions of guesses per second, this still takes centuries to crack — yet it's memorable because you can picture the words.",
        },
        {
          id: "c4",
          text: "Tr0ub4dor&3 — 11 characters, mixed case and symbols",
          correct: false,
          feedback:
            "Better than Maria1990!, but only 11 characters. Length is the dominant factor. River-Coffee-Sunset-92! is twice as long, making it exponentially harder to crack.",
        },
      ],
      multiSelect: false,
      correctExplanation:
        "River-Coffee-Sunset-92! wins because of length — 23 characters. At billions of guesses per second, it still takes centuries. Use the formula: 3 unrelated words + number + symbol. That's it.",
    },
    context: {
      slideTitle: "World's Most Common Passwords (2024)",
      subtitle: "These are the actual passwords used most often worldwide — and how fast a modern computer cracks each one.",
      items: [
        {
          rank: 1,
          label: "123456",
          detail: "Pure consecutive numbers — the most predictable sequence imaginable.",
          badge: "< 1 second",
        },
        {
          rank: 2,
          label: "password",
          detail: "The word \"password\" as a password. Hacking tools check this before anything else.",
          badge: "< 1 second",
        },
        {
          rank: 3,
          label: "123456789",
          detail: "Longer number sequence — still zero randomness, still cracked instantly.",
          badge: "< 1 second",
        },
        {
          rank: 4,
          label: "12345678",
          detail: "One digit shorter than the above. Equally instant.",
          badge: "< 1 second",
        },
        {
          rank: 5,
          label: "12345",
          detail: "Used by millions despite being only 5 characters with no variation.",
          badge: "< 1 second",
        },
        {
          rank: 6,
          label: "qwerty123",
          detail: "Keyboard rows feel random but are the first patterns hacking tools try.",
          badge: "< 1 second",
        },
        {
          rank: 7,
          label: "000000",
          detail: "Six zeroes. Often the default left unchanged on new accounts and devices.",
          badge: "< 1 second",
        },
        {
          rank: 8,
          label: "iloveyou",
          detail: "Common phrase — all dictionary-style passwords fall in under a millisecond.",
          badge: "< 1 second",
        },
        {
          rank: 9,
          label: "admin",
          detail: "Default system username and password — unchanged by millions of users and router owners.",
          badge: "< 1 second",
        },
        {
          rank: 10,
          label: "abc123",
          detail: "Alphabet start + numbers. One of the most common \"I made it harder\" passwords that isn't harder at all.",
          badge: "< 1 second",
        },
      ],
      footnote:
        "Source: NordPass Most Common Passwords 2024 · HaveIBeenPwned.com · Hive Systems Password Table 2024. Crack times assume a modern GPU attack at ~10 billion guesses/second.",
    },
    summaryTakeaway:
      "Passphrase formula: [Word]-[Word]-[Word]-[Number][Symbol]. Longer is always stronger. Never reuse.",
    summaryAction:
      "Pick your most important account right now. Apply the passphrase formula. If you enable 2FA today — that's a win.",
  },
];

export const totalPhases = phases.length;
