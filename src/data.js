import heroPatient from './assets/hero-patient.png'
import relaxedPatient from './assets/relaxed-patient.png'
import scan3d from './assets/3d-scan.png'
import drChen from './assets/dr-michael-chen.png'
import drJennings from './assets/dr-sarah-jennings.png'

export const images = { heroPatient, relaxedPatient, scan3d, drChen, drJennings }

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#treatments' },
  { label: 'About Us', href: '#about' },
  { label: 'Doctors', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export const heroSlides = [
  {
    image: heroPatient,
    alt: 'Smiling female patient receiving a gentle dental exam at Dentora Clinic',
    eyebrow: 'Modern Cosmetic & Gentle Family Dentistry',
    title: ['Family-Friendly', 'Dental Care'],
    text: 'Permanent natural-looking solutions to replace missing teeth and restore confident, radiant, healthy smiles with painless digital precision.',
  },
  {
    image: relaxedPatient,
    alt: 'Relaxed woman smiling in a modern high-end dental chair',
    eyebrow: 'Spa-Like Comfort, Zero Anxiety',
    title: ['Calm Visits,', 'Confident Smiles'],
    text: 'Private treatment suites, weighted blankets and gentle sedation options make every appointment feel unhurried and stress-free.',
  },
  {
    image: scan3d,
    alt: 'Dentist examining a 3D digital dental scan on a high-tech monitor',
    eyebrow: '3D Digital Diagnostics',
    title: ['Precision You', 'Can See'],
    text: 'Sub-millimeter 3D scans let you preview your treatment plan before it begins — no guesswork, no surprises.',
  },
]

export const heroChips = [
  'Dental Checkup',
  'Teeth Cleaning',
  'Tooth Filling',
  'Gum Treatment',
  'Retainers',
  'Root Canal Therapy',
  'Porcelain Veneers',
]

export const processSteps = [
  { label: 'Smile Assessment', dot: 'bg-brand-teal' },
  { label: 'Care Planning', dot: 'bg-brand-sage' },
  { label: 'Treatment Process', dot: 'bg-brand-charcoal' },
  { label: 'Dental Maintenance', dot: 'bg-brand-teal' },
]

export const stats = [
  { value: '98%', count: '98', suffix: '%', label: 'Satisfaction Rate' },
  { value: '2k+', count: '2', suffix: 'k+', label: 'Smiles Transformed' },
  { value: '4.9★', count: '4.9', suffix: '★', label: 'Customer Rating' },
]

export const journey = [
  {
    n: '01',
    kicker: 'Smile Assessment',
    title: 'It starts with a conversation.',
    text: 'Before any instrument touches a tooth, we listen. Your history, your worries and your goals are mapped in a relaxed first consult.',
    stat: ['30 min', 'unhurried first consult'],
  },
  {
    n: '02',
    kicker: 'Care Planning',
    title: 'We see what others guess.',
    text: 'A sub-millimetre 3D scan of your jaw becomes a visual treatment plan you review and approve before anything begins.',
    stat: ['0.1 mm', 'scan precision'],
  },
  {
    n: '03',
    kicker: 'Treatment Process',
    title: 'Gentle, guided, unhurried.',
    text: 'Robotically guided placement, same-day ceramic crowns and sedation on request, in a private suite designed around calm.',
    stat: ['1 visit', 'same-day crowns'],
  },
  {
    n: '04',
    kicker: 'Dental Maintenance',
    title: 'A smile built to last.',
    text: 'Preventive-care rewards, quiet reminders and a lifetime guarantee on implants keep your results exactly where we left them.',
    stat: ['Lifetime', 'implant guarantee'],
  },
]

export const services = [
  {
    icon: '✨',
    tag: 'Preventative',
    title: 'Ultrasonic Cleaning & Exam',
    text: 'Gentle plaque and calculus removal with air-polishing minerals, high-def intraoral cameras, and personalized enamel protection.',
    meta: 'Typical Visit: 45 Mins',
    booking: 'Ultrasonic Cleaning & Exam',
  },
  {
    icon: '💎',
    tag: 'Cosmetic',
    title: 'Porcelain Veneers & Bonding',
    text: 'Custom hand-crafted ceramic shells engineered to redesign shape, shade, and symmetry while preserving maximum natural enamel.',
    meta: 'Digital Smile Design',
    booking: 'Porcelain Veneers',
  },
  {
    icon: '🦷',
    tag: 'Implantology',
    title: 'Guided Dental Implants',
    text: 'Titanium or zirconia roots seamlessly inserted with robotically assisted navigational templates for lifetime durability.',
    meta: 'Lifetime Guarantee',
    booking: 'Dental Implants',
  },
  {
    icon: '🪐',
    tag: 'Orthodontics',
    title: 'Clear Aligners & Retainers',
    text: 'Discreet, removable clear aligners that gently shift teeth into harmonious alignment without metal brackets or food restrictions.',
    meta: 'Avg. Time: 6-12 Months',
    booking: 'Clear Aligners',
  },
  {
    icon: '🧸',
    tag: 'Pediatric',
    title: 'Gentle Pediatric Dentistry',
    text: 'Warm, playful environment that instills dental confidence in young children. Fluoride treatments, sealants, and positive reinforcement.',
    meta: 'Ages 1 to 17',
    booking: 'Pediatric Dentistry',
  },
  {
    icon: '⚡',
    tag: 'Emergency',
    title: 'Same-Day Pain Relief & Crown',
    text: 'Immediate triage for toothaches, chipped molars, or missing crowns. In-office 3D milling for precision permanent restoration in 1 hour.',
    meta: 'Emergency Slots Open Today',
    metaHighlight: true,
    booking: 'Emergency Dental Care',
  },
]

export const doctors = [
  {
    name: 'Dr. Michael Chen, DDS, FICOI',
    short: 'Dr. Chen',
    role: 'Lead Implantologist',
    school: 'Columbia University School of Dental Medicine',
    bio: 'Over 14 years performing minimally invasive dental restorations and full mouth rehabilitations with computerized navigation.',
    highlight: '1,800+ Implants Placed',
    image: drChen,
  },
  {
    name: 'Dr. Sarah Jennings, DMD',
    short: 'Dr. Jennings',
    role: 'Cosmetic Specialist',
    school: 'Harvard School of Dental Medicine',
    bio: 'Specializing in porcelain veneers, biomimetic dentistry, and needle-free anxious patient care for adult and adolescent patients.',
    highlight: 'AACD Accredited Member',
    image: drJennings,
  },
  {
    name: 'Dr. Arya Sharma, DDS, MS',
    short: 'Dr. Sharma',
    role: 'Orthodontics & Aligners',
    school: 'UCSF Division of Orthodontics',
    bio: 'Pioneering accelerated clear aligner therapy, airway-centered dentistry, and adolescent jaw development protocols.',
    highlight: 'Diamond Invisalign Provider',
    image: null,
    initials: 'AS',
  },
]

export const testimonials = [
  {
    quote:
      'I avoided the dentist for nearly seven years due to severe dental phobia. Dr. Jennings and her team never once judged me. With their gentle twilight sedation and soothing environment, I experienced zero pain.',
    name: 'Emily Morrison',
    initials: 'EM',
    meta: 'Veneers & Whitening • 2 Weeks ago',
  },
  {
    quote:
      'Dr. Michael Chen reconstructed two broken molars with 3D guided implants. From the digital scan to the final crown delivery, everything felt exceptionally organized and painless. I can chew normally again!',
    name: 'Robert K. Larson',
    initials: 'RK',
    meta: 'Implant Patient • 1 Month ago',
  },
  {
    quote:
      'My 8-year-old daughter used to cry at the mention of a dental visit. The team at Dentora turned the cleaning into a fun adventure. She walked out smiling with a dental superhero badge!',
    name: 'Claire Simmons',
    initials: 'CS',
    meta: 'Pediatric Parent • 3 Weeks ago',
  },
]

export const bookingServices = [
  { label: 'Checkup & Cleaning', value: 'Dental Checkup & Cleaning' },
  { label: 'Cosmetic Veneers', value: 'Cosmetic Veneers' },
  { label: 'Dental Implants', value: 'Dental Implants' },
  { label: 'Clear Aligners', value: 'Clear Aligners' },
  { label: 'Pediatric Care', value: 'Pediatric Dentistry' },
  { label: 'Emergency Relief', value: 'Emergency Toothache' },
]

export const faqs = [
  {
    q: 'What insurances does Dentora accept?',
    a: 'We are in-network with Delta Dental, MetLife, Cigna, Aetna, Guardian, and most major PPO insurances. Our front desk team will happily run a complimentary benefits breakdown prior to your first appointment.',
  },
  {
    q: 'I have high dental anxiety. What comfort options do you offer?',
    a: 'We offer multiple tiers of relaxation: warm weighted blankets, noise-canceling headphones with streaming television, gentle nitrous oxide ("laughing gas"), and conscious oral sedation for complete peace of mind.',
  },
  {
    q: 'How long do porcelain veneers last?',
    a: 'When maintained with routine checkups and good oral hygiene, our custom layered porcelain veneers routinely last 15 to 20+ years. We back our cosmetic casework with a comprehensive craftsmanship warranty.',
  },
  {
    q: 'Can I get a same-day crown or emergency extraction?',
    a: 'Yes. We reserve dedicated emergency triage blocks every day. With our on-site CEREC 3D ceramic milling machine, we can sculpt and seat permanent porcelain crowns in a single 90-minute appointment.',
  },
]
