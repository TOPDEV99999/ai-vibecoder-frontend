export default function Logo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="vf-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#7C5CFC" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#vf-grad)" />
      <path d="M9 10L15 22L21 10" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M23 10L20 16" stroke="white" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
