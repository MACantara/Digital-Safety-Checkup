export const categories = [
  {
    id: "passwords",
    title: "Passwords & Authentication",
    icon: "🔑",
    description: "Strong, unique passwords are your first line of defense.",
    items: [
      {
        id: "p1",
        text: "I use a unique password for every account",
        severity: "critical",
        tip: {
          title: "Why unique passwords matter",
          body: "If one site is breached and you reuse passwords, attackers can access all your other accounts using a technique called 'credential stuffing'. Use a password manager — it does the heavy lifting for you.",
          action: "Recommended managers: Bitwarden, Proton Pass.",
        },
      },
      {
        id: "p2",
        text: "All my passwords are at least 16 characters long",
        severity: "critical",
        tip: {
          title: "Password length beats complexity",
          body: "A 16-character random passphrase is exponentially harder to crack than an 8-character 'complex' password. Modern attacks can crack short passwords in seconds.",
          action: "Aim for 16+ characters. Passphrases like 'correct-horse-battery-staple' work great.",
        },
      },
      {
        id: "p3",
        text: "I use a password manager",
        severity: "high",
        tip: {
          title: "Let a password manager do the work",
          body: "A password manager securely stores and auto-fills complex passwords so you don't have to remember them all. It's the single biggest upgrade you can make to your security.",
          action: "Try Bitwarden (free & open-source) or Proton Pass.",
        },
      },
      {
        id: "p4",
        text: "I have checked my email/passwords against known breaches",
        severity: "medium",
        tip: {
          title: "See if you've been breached",
          body: "Services like 'Have I Been Pwned' let you check if your email or passwords have appeared in known data breaches. Many breaches go unnoticed for years.",
          action: "Visit haveibeenpwned.com and check your email addresses.",
        },
      },
      {
        id: "p5",
        text: "I have changed passwords that were exposed in breaches",
        severity: "critical",
        tip: {
          title: "Exposed passwords are compromised passwords",
          body: "Once a password appears in a breach database, attackers use automated tools to try it across thousands of sites. Change exposed passwords immediately.",
          action: "Check haveibeenpwned.com → Passwords to see if specific passwords were leaked.",
        },
      },
    ],
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    icon: "📱",
    description:
      "Add a second lock to your accounts so passwords alone aren't enough.",
    items: [
      {
        id: "2fa1",
        text: "I use 2FA on my email account(s)",
        severity: "critical",
        tip: {
          title: "Your email is the master key",
          body: "Most accounts can be recovered via email. If an attacker gains access to your email, they can reset passwords for your bank, social media, and more. Protect it with 2FA.",
          action: "Enable 2FA in your email's security settings. Prefer an authenticator app over SMS.",
        },
      },
      {
        id: "2fa2",
        text: "I use 2FA on my bank and financial accounts",
        severity: "critical",
        tip: {
          title: "Protect your money directly",
          body: "Financial accounts are high-value targets. Even if an attacker obtains your password, 2FA stops them from completing a login without your second factor.",
          action: "Log into each bank or financial app and enable 2FA under Security settings.",
        },
      },
      {
        id: "2fa3",
        text: "I use an authenticator app (not SMS) for 2FA where possible",
        severity: "high",
        tip: {
          title: "Authenticator apps > SMS codes",
          body: "SMS-based 2FA can be bypassed via SIM-swapping attacks where criminals convince your carrier to transfer your phone number to their device. Authenticator apps like Aegis or Google Authenticator are immune to this.",
          action: "Use Aegis (Android), Raivo (iOS), or Google/Microsoft Authenticator.",
        },
      },
      {
        id: "2fa4",
        text: "I have saved 2FA backup codes in a secure place",
        severity: "high",
        tip: {
          title: "Don't get locked out",
          body: "If you lose your phone or authenticator app, backup codes are your only way back in. Store them offline in a safe place — not in your email or on your desktop.",
          action: "Print or write down backup codes and store them in a safe or secure location.",
        },
      },
      {
        id: "2fa5",
        text: "I use 2FA on major social media accounts",
        severity: "medium",
        tip: {
          title: "Account takeovers happen at scale",
          body: "Social media account hijacking is common. Attackers use them to scam your contacts, spread misinformation, or sell the account. 2FA makes this significantly harder.",
          action: "Enable 2FA in the security settings of Facebook, Instagram, Twitter/X, LinkedIn, etc.",
        },
      },
    ],
  },
  {
    id: "updates",
    title: "Software & Device Updates",
    icon: "🔄",
    description:
      "Keeping software updated closes security holes before attackers exploit them.",
    items: [
      {
        id: "u1",
        text: "My operating system is set to install updates automatically",
        severity: "critical",
        tip: {
          title: "Unpatched systems are easy targets",
          body: "Security vulnerabilities are discovered regularly. OS vendors release patches, but attackers quickly weaponize newly disclosed flaws. Automatic updates ensure you're protected.",
          action: "Windows: Settings → Windows Update → Turn on automatic updates. macOS: System Settings → General → Software Update.",
        },
      },
      {
        id: "u2",
        text: "All my apps and browsers are up to date",
        severity: "high",
        tip: {
          title: "Apps are attack surface too",
          body: "Vulnerabilities in browsers and apps are frequently exploited. Browser exploits can install malware just by visiting a page. Keep everything updated.",
          action: "Enable auto-updates in your browser and regularly check your app store for pending updates.",
        },
      },
      {
        id: "u3",
        text: "My phone/tablet firmware and OS are up to date",
        severity: "high",
        tip: {
          title: "Mobile devices need updates too",
          body: "Phones contain your messages, photos, banking apps, and location history. Mobile OS updates patch critical security flaws that attackers actively exploit.",
          action: "iOS: Settings → General → Software Update. Android: Settings → System → System Update.",
        },
      },
      {
        id: "u4",
        text: "I have removed software and apps I no longer use",
        severity: "medium",
        tip: {
          title: "Unused software is a silent risk",
          body: "Forgotten apps stop receiving updates and accumulate vulnerabilities over time. They also may still have permissions to your data, microphone, or camera.",
          action: "Audit your installed programs and apps. Remove anything you haven't used in 3+ months.",
        },
      },
    ],
  },
  {
    id: "phishing",
    title: "Email & Phishing Awareness",
    icon: "🎣",
    description:
      "Phishing is the #1 way attackers gain access — learn to spot it.",
    items: [
      {
        id: "ph1",
        text: "I verify sender addresses before clicking links in emails",
        severity: "critical",
        tip: {
          title: "Spoofed addresses look real at a glance",
          body: "Phishing emails often mimick legitimate senders. Always check the full email address (not just the display name). 'Amazon Support <support@amaz0n-helpdesk.com>' is not real.",
          action: "Hover (don't click) over links to preview the destination URL. When in doubt, go directly to the website.",
        },
      },
      {
        id: "ph2",
        text: "I never enter credentials after clicking an email link",
        severity: "critical",
        tip: {
          title: "Phishing sites are convincing",
          body: "Attackers create pixel-perfect copies of login pages. Always navigate to sites directly via your browser or bookmarks rather than through email links.",
          action: "If you get a 'verify your account' email, close it and manually navigate to the site.",
        },
      },
      {
        id: "ph3",
        text: "I am cautious of unexpected attachments (even from known people)",
        severity: "high",
        tip: {
          title: "Malicious attachments bypass many defenses",
          body: "Email accounts get compromised and used to send malware to contacts. Even if you recognize the sender, an unexpected attachment with urgency is a red flag.",
          action: "Verify unexpected attachments by calling or messaging the sender through a separate channel.",
        },
      },
      {
        id: "ph4",
        text: "I know how to identify phishing red flags (urgency, threats, odd links)",
        severity: "high",
        tip: {
          title: "Common phishing patterns",
          body: "Watch for: urgent language ('Act now!'), threats ('Your account will be closed'), requests for personal data, suspicious links, and poor grammar. Legitimate organizations don't pressure you this way.",
          action: "Take a free phishing awareness quiz at phishingquiz.withgoogle.com to test your skills.",
        },
      },
      {
        id: "ph5",
        text: "I report suspicious emails rather than just deleting them",
        severity: "low",
        tip: {
          title: "Reporting helps protect others",
          body: "Reporting phishing emails helps your email provider improve filters, potentially protecting your colleagues and other users from the same attack.",
          action: "Most email clients have a 'Report phishing' or 'Report spam' option. Use it.",
        },
      },
    ],
  },
  {
    id: "device",
    title: "Device & Network Security",
    icon: "💻",
    description:
      "Secure your physical devices and network connections.",
    items: [
      {
        id: "d1",
        text: "All my devices have a screen lock (PIN, biometric, or password)",
        severity: "critical",
        tip: {
          title: "Physical access = full access",
          body: "Without a screen lock, anyone who finds or steals your device has instant access to your emails, banking apps, photos, and more. A PIN or biometric lock is a must.",
          action: "Set a 6+ digit PIN or enable fingerprint/face unlock, and set a short auto-lock timeout (e.g., 1 minute).",
        },
      },
      {
        id: "d2",
        text: "My computer's hard drive is encrypted",
        severity: "high",
        tip: {
          title: "Encryption protects stolen devices",
          body: "Without disk encryption, a thief can remove your hard drive and access all your data. Encryption makes the data unreadable without your password.",
          action: "Windows: Enable BitLocker (Pro/Enterprise) or use VeraCrypt. macOS: Enable FileVault in System Settings → Privacy & Security.",
        },
      },
      {
        id: "d3",
        text: "I avoid using public Wi-Fi for sensitive tasks, or use a VPN",
        severity: "high",
        tip: {
          title: "Public Wi-Fi can be monitored",
          body: "Public networks can be compromised or faked by attackers (evil twin attacks). Avoid banking or entering passwords on public Wi-Fi. A VPN encrypts your traffic.",
          action: "Use a reputable VPN (Mullvad, ProtonVPN) on public networks. At minimum, ensure sites use HTTPS.",
        },
      },
      {
        id: "d4",
        text: "My home Wi-Fi router uses WPA2 or WPA3 encryption",
        severity: "high",
        tip: {
          title: "WEP and open networks are unsafe",
          body: "Older encryption standards (WEP) are trivially crackable. WPA2 and WPA3 provide strong protection for your home network.",
          action: "Log into your router admin panel and check the wireless security settings. Set to WPA2-AES or WPA3.",
        },
      },
      {
        id: "d5",
        text: "I have changed my router's default admin password",
        severity: "high",
        tip: {
          title: "Default passwords are public knowledge",
          body: "Default router credentials ('admin/admin', 'admin/password') are published online. Anyone on your network — or with physical access — can take control of your router.",
          action: "Access your router's admin panel (usually 192.168.1.1) and change the admin password to something strong and unique.",
        },
      },
      {
        id: "d6",
        text: "I have a firewall enabled on my computer",
        severity: "medium",
        tip: {
          title: "Firewalls block unsolicited connections",
          body: "A firewall monitors incoming and outgoing network traffic and blocks suspicious connections. Most OS firewalls are sufficient for home use — just make sure they're on.",
          action: "Windows: Settings → Windows Security → Firewall & network protection. macOS: System Settings → Network → Firewall.",
        },
      },
    ],
  },
  {
    id: "privacy",
    title: "Social Media & Privacy",
    icon: "🔒",
    description:
      "Control what you share and who can see it online.",
    items: [
      {
        id: "pr1",
        text: "My social media profiles are set to private or friends-only",
        severity: "medium",
        tip: {
          title: "Public profiles fuel targeted attacks",
          body: "Publicly visible information (workplace, location, birthday, phone) can be used for phishing, social engineering, or identity theft. Review your profile visibility.",
          action: "Audit privacy settings on Facebook, Instagram, LinkedIn, and Twitter/X. Make personal details private.",
        },
      },
      {
        id: "pr2",
        text: "I review app permissions regularly (camera, location, microphone)",
        severity: "medium",
        tip: {
          title: "Apps often over-request permissions",
          body: "Many apps request permissions they don't need (a flashlight app wanting your contacts, for example). Review and revoke unnecessary permissions.",
          action: "iOS: Settings → Privacy & Security. Android: Settings → Apps → Permissions. Revoke any that seem excessive.",
        },
      },
      {
        id: "pr3",
        text: "I limit the personal info I share in online forms and sign-ups",
        severity: "low",
        tip: {
          title: "Data minimization reduces your risk",
          body: "Every form you fill out adds to your data footprint. Only provide mandatory fields. Use an alias email or a disposable address for non-critical sign-ups.",
          action: "Use services like SimpleLogin or AnonAddy for disposable email aliases to sign up for services.",
        },
      },
      {
        id: "pr4",
        text: "I have searched for my personal info online and requested removal where possible",
        severity: "low",
        tip: {
          title: "Data brokers collect and sell your info",
          body: "People-search sites like Spokeo, BeenVerified, and WhitePages publish your address, phone number, and more. You can opt out, though it's time-consuming.",
          action: "Use a service like DeleteMe or manually opt out at major data broker sites. Google yourself to see what's out there.",
        },
      },
    ],
  },
  {
    id: "backups",
    title: "Data Backups",
    icon: "💾",
    description:
      "Backups are your safety net against ransomware, hardware failure, and accidents.",
    items: [
      {
        id: "b1",
        text: "I regularly back up important data",
        severity: "critical",
        tip: {
          title: "When, not if — hardware fails",
          body: "Hard drives fail, phones get lost, ransomware encrypts files. Without backups, this data is gone permanently. Regular backups are non-negotiable.",
          action: "Follow the 3-2-1 rule: 3 copies of data, on 2 different media types, with 1 offsite/cloud copy.",
        },
      },
      {
        id: "b2",
        text: "I have at least one offline or off-site backup",
        severity: "high",
        tip: {
          title: "Ransomware targets connected backups",
          body: "If your backup drive is always connected, ransomware can encrypt it too. An offline or cloud backup that isn't directly accessible from your PC is essential.",
          action: "External drives kept disconnected, or cloud services like Backblaze, iCloud, or Google One, provide offsite protection.",
        },
      },
      {
        id: "b3",
        text: "I have tested that my backups can actually be restored",
        severity: "high",
        tip: {
          title: "Untested backups often fail when needed",
          body: "Many people discover their backup is corrupted or incomplete only when disaster strikes. Periodically test restoring a file or folder to confirm your backup works.",
          action: "Schedule a quarterly restore test. Try recovering one or two important files from your backup.",
        },
      },
      {
        id: "b4",
        text: "I back up my phone data regularly",
        severity: "medium",
        tip: {
          title: "Phones hold irreplaceable data",
          body: "Photos, contacts, messages, and app data on your phone can disappear if your device is lost, stolen, or broken. Cloud backups ensure continuity.",
          action: "iOS: Enable iCloud Backup in Settings → [Your Name] → iCloud → iCloud Backup. Android: Settings → System → Backup.",
        },
      },
    ],
  },
  {
    id: "browsing",
    title: "Safe Browsing",
    icon: "🌐",
    description:
      "Stay protected while using the internet.",
    items: [
      {
        id: "br1",
        text: "I use a modern, up-to-date browser (Chrome, Firefox, Edge, Safari)",
        severity: "high",
        tip: {
          title: "Old browsers have known vulnerabilities",
          body: "Outdated browsers like Internet Explorer lack modern security features and receive no security patches. Use a current, mainstream browser and keep it updated.",
          action: "Download the latest version of Firefox, Chrome, Edge, or Safari and set it as your default.",
        },
      },
      {
        id: "br2",
        text: "I check for HTTPS on sites before entering sensitive info",
        severity: "high",
        tip: {
          title: "HTTPS encrypts data in transit",
          body: "HTTPS ensures the connection between your browser and the website is encrypted. On non-HTTPS sites, anyone on the same network can see what you submit.",
          action: "Look for the lock icon in the browser address bar. Avoid entering passwords or payment info on HTTP sites.",
        },
      },
      {
        id: "br3",
        text: "I use an ad/tracker blocker extension",
        severity: "medium",
        tip: {
          title: "Ads can carry malware (malvertising)",
          body: "Legitimate ad networks have served malicious ads that automatically install malware. Ad blockers also stop trackers that follow you across the web.",
          action: "Install uBlock Origin (Chrome, Firefox, Edge) — it's free, lightweight, and highly effective.",
        },
      },
      {
        id: "br4",
        text: "I avoid downloading software from unofficial sources",
        severity: "high",
        tip: {
          title: "Unofficial software is a malware hotspot",
          body: "Pirated software, cracked apps, and downloads from random websites frequently contain malware hidden alongside the software you wanted.",
          action: "Only download software from the official developer website or your OS's official app store.",
        },
      },
      {
        id: "br5",
        text: "I use a privacy-respecting search engine or browser",
        severity: "low",
        tip: {
          title: "Your searches reveal a lot",
          body: "Search engines build detailed profiles from your searches and browsing history. Privacy-focused alternatives don't track you.",
          action: "Try DuckDuckGo, Brave Search, or Startpage as your default search engine.",
        },
      },
    ],
  },
];

export const totalItems = categories.reduce(
  (sum, cat) => sum + cat.items.length,
  0
);

export const severityWeight = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function calculateScore(checkedIds) {
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

export function getScoreLabel(score) {
  if (score >= 90) return { label: "Excellent", color: "#22c55e" };
  if (score >= 70) return { label: "Good", color: "#84cc16" };
  if (score >= 50) return { label: "Fair", color: "#f59e0b" };
  if (score >= 30) return { label: "Needs Work", color: "#f97316" };
  return { label: "At Risk", color: "#ef4444" };
}
