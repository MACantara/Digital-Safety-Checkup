import type { LucideIcon } from "lucide-react";
import { ShieldAlert, ShieldCheck, KeyRound } from "lucide-react";

// â”€â”€â”€ Domain types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type Severity = "critical" | "high" | "medium" | "low";

export interface Tip {
  title: string;
  body: string;
  action?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  severity: Severity;
  tip: Tip;
}

export interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  items: ChecklistItem[];
}

export interface ScoreLabel {
  label: string;
  color: string;
}

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const categories: Category[] = [
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Phase 1 â€” Scam Awareness (5 min)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "scams",
    title: "Scam Awareness",
    icon: ShieldAlert,
    description: "Know 4 red flags and youâ€™ll spot 90% of scams before they trick you.",
    items: [
      {
        id: "s1",
        text: "I can recognise urgency-based scams (â€œAct now or your account will be lockedâ€)",
        severity: "critical",
        tip: {
          title: "Urgency is the scammerâ€™s #1 weapon",
          body: "Scammers manufacture panic so you act before thinking. Legitimate banks, government agencies, and apps never demand immediate action over SMS or email. The rush itself is the red flag.",
          action: "Next time a message makes you feel rushed â€” pause for 10 seconds and ask: â€œDid I initiate this contact?â€ If not, treat it as a scam until proven otherwise.",
        },
      },
      {
        id: "s2",
        text: "I can spot emotional manipulation â€” fear, unexpected prizes, or sudden romance from strangers",
        severity: "critical",
        tip: {
          title: "They target your emotions, not your logic",
          body: "Fear (â€œYour account is compromisedâ€), greed (â€œYouâ€™ve won 50,000 pesos!â€), and romance scams all work by bypassing rational thinking. If a message makes your heart race â€” that racing feeling is the warning sign.",
          action: "Ask yourself: â€œWhy is a stranger so eager to help me or give me something?â€ Real windfalls and real romances donâ€™t begin with an unsolicited message.",
        },
      },
      {
        id: "s3",
        text: "I check links and sender domains before clicking (e.g. â€œamaz0n-support.comâ€ is fake; â€œamazon.comâ€ is real)",
        severity: "critical",
        tip: {
          title: "The domain is the truth â€” check it every time",
          body: "Scammers misspell or extend real brands: paypa1.com, bdo-verify-ph.net, gcash-support.xyz. On mobile, press and hold a link to preview its real destination. On desktop, hover before you click. The real site is always the shortest, cleanest version of the name.",
          action: "Before clicking any link in a message: ask â€œIs this the exact official domain?â€ When in doubt, open your browser and type the address manually.",
        },
      },
      {
        id: "s4",
        text: "I never share OTPs, passwords, or personal info â€” even with people claiming to be from customer support",
        severity: "critical",
        tip: {
          title: "No legitimate company will ever ask for your OTP",
          body: "One-Time Passwords exist so only you can use them. The moment anyone asks for yours â€” over a call, chat, or message â€” they are a scammer. No exceptions. Banks, GCash, Grab, and all legitimate services know this rule and never break it.",
          action: "If anyone asks for your OTP or password: hang up or end the chat immediately. Then change your password and report the number or account.",
        },
      },
      {
        id: "s5",
        text: "I can spot a fake SMS: unknown sender, suspicious link, urgency or prize",
        severity: "high",
        tip: {
          title: "Smishing (SMS phishing) â€” example to study",
          body: 'Fake SMS: â€œBDO ALERT: Unauthorized login detected. Verify immediately or account will be suspended: bdo-secure-ph.net/verifyâ€\n\nRed flags: (1) You didnâ€™t expect it. (2) Thereâ€™s an external link â€” real banks never send links, they tell you to open the app. (3) Urgency + threat of loss.',
          action: "Look at your last 3 messages from unknown numbers. Can you find: an external link, urgency language, or a request for personal info? Those are the 3 signs.",
        },
      },
      {
        id: "s6",
        text: "I can identify a phishing email: mismatched sender address, generic greeting, suspicious link",
        severity: "high",
        tip: {
          title: "Phishing emails â€” 3 things to check",
          body: '(1) Sender address: â€œsupport@paypal-helpdesk.comâ€ is NOT PayPal. The real sender ends in @paypal.com exactly.\n(2) Greeting: â€œDear Customerâ€ instead of your actual name â€” they donâ€™t know who you are.\n(3) Hover the link (donâ€™t click): the real destination shows in your browserâ€™s status bar and rarely matches the button text.',
          action: "Open your spam folder and find one suspicious email. Identify which of the 3 red flags it has. That practice makes detection automatic.",
        },
      },
      {
        id: "s7",
        text: "I can recognise fake social media DMs: unsolicited offers, account â€˜verificationâ€™ requests, or friends asking for money",
        severity: "medium",
        tip: {
          title: "Social media DM scams â€” 3 common scripts",
          body: '(1) â€œYour Page violates our policies and will be disabled. Click here to appeal.â€ â€” Facebook will never DM you.\n(2) â€œI can help you earn money, just send a small registration fee.â€\n(3) A â€œfriendâ€ messages asking to borrow money or share a code â€” their account is hacked.',
          action: "If a friend sends an unusual DM asking for money or a code, call them directly by voice before doing anything. One call stops the scam.",
        },
      },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Phase 2 â€” Data Protection Basics (5 min)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "protection",
    title: "Data Protection Basics",
    icon: ShieldCheck,
    description: "5 behaviours that protect your accounts and devices â€” practical steps, not theory.",
    items: [
      {
        id: "d1",
        text: "I donâ€™t click unknown links in messages, emails, or social media",
        severity: "critical",
        tip: {
          title: "One wrong click is all it takes",
          body: "Malicious links can install malware, steal your cookies, or dump you on a fake login page â€” all silently. The habit is simple: if you didnâ€™t ask for it, donâ€™t click it. Go directly to the website instead.",
          action: "Set a personal rule right now: â€œI will never click a link from an unexpected message.â€ Even from a friend. Even if it looks real.",
        },
      },
      {
        id: "d2",
        text: "I avoid logging into banking, GCash, or email accounts on public Wi-Fi",
        severity: "high",
        tip: {
          title: "Public Wi-Fi can be monitored or faked",
          body: "Attackers set up hotspots named â€œMall_Free_WiFiâ€ or â€œCafe_Guestâ€ that look legitimate. Even on real public networks, unencrypted traffic can be intercepted. Browsing news is fine â€” logging into anything sensitive is not.",
          action: "On public Wi-Fi: browse freely, but switch to mobile data for banking, GCash, or email logins. Itâ€™s a 3-second habit that protects everything.",
        },
      },
      {
        id: "d3",
        text: "Automatic updates are turned on for my phone and computer",
        severity: "high",
        tip: {
          title: "Updates patch the holes hackers walk through",
          body: "Every software vulnerability is a potential doorway for attackers. When a patch is released, hackers immediately start targeting all unpatched devices. Automatic updates close that window before you even know one existed.",
          action: "iOS: Settings â†’ General â†’ Software Update â†’ Automatic Updates ON.\nAndroid: Settings â†’ System â†’ System Update.\nDo it now â€” takes under a minute.",
        },
      },
      {
        id: "d4",
        text: "I have 2FA (two-factor authentication) enabled on my email and main social media accounts",
        severity: "critical",
        tip: {
          title: "2FA stops account takeovers even when your password is stolen",
          body: "With 2FA on, even if someone has your password they still canâ€™t log in without your phone. Your email is the master key â€” whoever controls it can reset every other account you own. Protect it first.",
          action: "Go to your emailâ€™s Security Settings right now and enable 2-Step Verification. An authenticator app (Google Authenticator, Aegis) is stronger than SMS. Takes under 2 minutes.",
        },
      },
      {
        id: "d5",
        text: "My phone has a screen lock (PIN of at least 6 digits, pattern, or biometric)",
        severity: "high",
        tip: {
          title: "Your unlocked phone is a treasure chest",
          body: "A lost phone without a lock gives a stranger instant access to GCash, banking apps, your email, and every saved password in your browser. A 6-digit PIN takes 5 seconds to set and protects everything.",
          action: "Settings â†’ Security â†’ Screen Lock. Set a PIN of at least 6 digits, or enable fingerprint/face unlock. Do it before you close this app.",
        },
      },
      {
        id: "d6",
        text: "I know the 3 immediate steps to take if one of my accounts gets hacked",
        severity: "medium",
        tip: {
          title: "The first 5 minutes after a hack determine the damage",
          body: "Step 1: Change your password immediately â€” use a strong, unique one.\nStep 2: Enable 2FA if it wasnâ€™t already on.\nStep 3: Go to â€œLogin Activityâ€ or â€œActive Sessionsâ€ and log out all other devices. Then check if you reused that password anywhere else.",
          action: "Go to your most important account right now and find its â€œActive Sessionsâ€ page. Knowing where it is before you need it saves panic later.",
        },
      },
    ],
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Phase 3 â€” Password Upgrade (5 min)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "passwords",
    title: "Password Upgrade",
    icon: KeyRound,
    description: "One formula for passwords that are both uncrackable and memorable â€” apply it in 5 minutes.",
    items: [
      {
        id: "p1",
        text: "My passwords are long passphrases, not short words with numbers (e.g. River-Coffee-Sunset-92!)",
        severity: "critical",
        tip: {
          title: "Length beats complexity every time",
          body: "Hackersâ€™ tools try billions of combinations per second. â€œMaria123â€ is cracked in under a second. â€œRiver-Coffee-Sunset-92!â€ would take centuries â€” and itâ€™s easier to remember.\n\nThe formula: 3â€“4 unrelated words + a number + a symbol. Thatâ€™s it.",
          action: "Think of 3 random words that form a mental image â€” like Blue-Mango-Stairs. Add a number and a symbol: Blue-Mango-Stairs-7! Thatâ€™s your new password formula.",
        },
      },
      {
        id: "p2",
        text: "I use a different password for every important account (email, banking, social media)",
        severity: "critical",
        tip: {
          title: "One reused password = all accounts exposed",
          body: "Websites get hacked constantly. When they do, attackers take those username/password pairs and automatically try them on Gmail, Facebook, GCash, and your bank. If you reuse passwords, one breach costs you everything.",
          action: "Identify your 3 most important accounts. Do any share a password? If yes, change the weakest one today using the passphrase formula. Start there â€” you donâ€™t need to change everything at once.",
        },
      },
      {
        id: "p3",
        text: "I use or plan to use a password manager such as Bitwarden (free)",
        severity: "medium",
        tip: {
          title: "A password manager solves the â€˜I canâ€™t rememberâ€™ problem completely",
          body: "A password manager generates and stores a unique strong password for every site. You only memorise one master passphrase. Bitwarden is free, open-source, trusted, and works across all devices and browsers.",
          action: "Download Bitwarden at bitwarden.com â€” itâ€™s free. Add your top 5 accounts. Your master password should be a passphrase (4 words + number + symbol). Done.",
        },
      },
      {
        id: "p4",
        text: "I have enabled 2FA on at least one important account today",
        severity: "high",
        tip: {
          title: "2FA is your safety net for when passwords fail",
          body: "Passwords can be guessed, phished, or stolen from breached databases. 2FA means a stolen password is useless alone â€” the attacker still needs your phone. Enable it on your email first: itâ€™s the account that unlocks all others.",
          action: "Right now: go to your emailâ€™s Security Settings and enable 2-Step Verification. It takes under 2 minutes and is the single highest-impact security action you can take today.",
        },
      },
      {
        id: "p5",
        text: "I have mentally improved â€” or committed to improving â€” at least one of my current passwords",
        severity: "low",
        tip: {
          title: "Start with one. Thatâ€™s how the habit builds.",
          body: "You donâ€™t have to change everything at once. Pick your most important account â€” probably your email. Apply the formula: [Word]-[Word]-[Word]-[Number][Symbol]. Write it somewhere safe while you memorise it over the next few days.",
          action: "Pick one account right now. Open its password-change page. Apply the passphrase formula. Close this app only after youâ€™ve done it.",
        },
      },
    ],
  },
];

export const totalItems = categories.reduce(
  (sum, cat) => sum + cat.items.length,
  0
);

export const severityWeight: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function calculateScore(checkedIds: Set<string>): number {
  let earned = 0;
  let possible = 0;
  for (const cat of categories) {
    for (const item of cat.items) {
      const w = severityWeight[item.severity];
      possible += w;
      if (checkedIds.has(item.id)) earned += w;
    }
  }
  return possible === 0 ? 0 : Math.round((earned / possible) * 100);
}

export function getScoreLabel(score: number): ScoreLabel {
  if (score >= 90) return { label: "Excellent", color: "#22c55e" };
  if (score >= 70) return { label: "Good", color: "#84cc16" };
  if (score >= 50) return { label: "Fair", color: "#f59e0b" };
  if (score >= 30) return { label: "Needs Work", color: "#f97316" };
  return { label: "At Risk", color: "#ef4444" };
}
