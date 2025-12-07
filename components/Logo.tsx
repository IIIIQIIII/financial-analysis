export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Document Shape */}
      <path
        d="M120 40C97.9086 40 80 57.9086 80 80V432C80 454.091 97.9086 472 120 472H392C414.091 472 432 454.091 432 432V160L312 40H120Z"
        fill="#1E293B"
        stroke="#4ADE80"
        strokeWidth="24"
      />

      {/* Folded Corner */}
      <path
        d="M312 40V160H432"
        stroke="#4ADE80"
        strokeWidth="24"
        strokeLinejoin="round"
      />

      {/* Chart Inside Document */}
      <path
        d="M160 360V320"
        stroke="#94A3B8"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M220 360V250"
        stroke="#94A3B8"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M280 360V280"
        stroke="#94A3B8"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M340 360V200"
        stroke="#4ADE80"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
}
