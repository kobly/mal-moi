"use client"

export function BojagiLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bojagi wrapping cloth - layered diamond shape */}
      {/* Outer cloth shape */}
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="5"
        transform="rotate(5 20 20)"
        fill="#FFE0B2"
      />
      {/* Inner cloth - rotated to look like a traditional wrapping */}
      <rect
        x="10"
        y="10"
        width="20"
        height="20"
        rx="4"
        transform="rotate(-4 20 20)"
        fill="#FFCC80"
      />
      {/* Center patchwork panels - traditional bojagi pattern */}
      <rect x="12" y="12" width="8" height="8" rx="2" fill="#E8722A" opacity="0.85" />
      <rect x="21" y="12" width="8" height="8" rx="2" fill="#A7D7F7" opacity="0.85" />
      <rect x="12" y="21" width="8" height="8" rx="2" fill="#C5E1A5" opacity="0.85" />
      <rect x="21" y="21" width="8" height="8" rx="2" fill="#F8BBD0" opacity="0.75" />
      {/* Top knot - the characteristic tied ribbon */}
      <path
        d="M17 8 C15 4, 18 2, 20 5"
        stroke="#E8722A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M23 8 C25 4, 22 2, 20 5"
        stroke="#E8722A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tiny knot circle */}
      <circle cx="20" cy="5" r="1.5" fill="#E8722A" />
      {/* Small speech bubble to represent communication */}
      <ellipse cx="33" cy="10" rx="5" ry="4" fill="#FFFFFF" stroke="#E5E0D8" strokeWidth="0.8" />
      <path d="M30 13 L31 16 L33 13" fill="#FFFFFF" stroke="#E5E0D8" strokeWidth="0.8" strokeLinejoin="round" />
      {/* Heart inside bubble */}
      <path
        d="M33 9 C33 8, 34.5 8, 34.5 9 C34.5 10, 33 11, 33 11 C33 11, 31.5 10, 31.5 9 C31.5 8, 33 8, 33 9Z"
        fill="#FF8A80"
      />
    </svg>
  )
}

export function BojagiLogoSmall({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Simplified bojagi for bottom nav */}
      <rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(3 12 12)" fill="#FFCC80" />
      <rect x="6" y="6" width="5.5" height="5.5" rx="1.5" fill="#E8722A" opacity="0.85" />
      <rect x="12.5" y="6" width="5.5" height="5.5" rx="1.5" fill="#A7D7F7" opacity="0.85" />
      <rect x="6" y="12.5" width="5.5" height="5.5" rx="1.5" fill="#C5E1A5" opacity="0.85" />
      <rect x="12.5" y="12.5" width="5.5" height="5.5" rx="1.5" fill="#F8BBD0" opacity="0.75" />
      {/* Knot */}
      <circle cx="12" cy="3.5" r="1" fill="#E8722A" />
      <path d="M10 5 C9 3, 11 2, 12 3.5" stroke="#E8722A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M14 5 C15 3, 13 2, 12 3.5" stroke="#E8722A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function BearIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ears */}
      <circle cx="22" cy="20" r="12" fill="#F5C78A" />
      <circle cx="22" cy="20" r="7" fill="#E8A54B" />
      <circle cx="58" cy="20" r="12" fill="#F5C78A" />
      <circle cx="58" cy="20" r="7" fill="#E8A54B" />
      {/* Head */}
      <circle cx="40" cy="40" r="26" fill="#F5C78A" />
      {/* Face area */}
      <ellipse cx="40" cy="46" rx="14" ry="10" fill="#FFF3E0" />
      {/* Eyes */}
      <circle cx="31" cy="37" r="3.5" fill="#3D2C1E" />
      <circle cx="49" cy="37" r="3.5" fill="#3D2C1E" />
      {/* Eye shine */}
      <circle cx="32.5" cy="35.5" r="1.2" fill="#FFFFFF" />
      <circle cx="50.5" cy="35.5" r="1.2" fill="#FFFFFF" />
      {/* Nose */}
      <ellipse cx="40" cy="44" rx="3.5" ry="2.5" fill="#3D2C1E" />
      {/* Mouth */}
      <path
        d="M36 48 C38 51 42 51 44 48"
        stroke="#3D2C1E"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blush */}
      <circle cx="25" cy="44" r="4" fill="#FFB7B7" opacity="0.5" />
      <circle cx="55" cy="44" r="4" fill="#FFB7B7" opacity="0.5" />
      {/* Small heart */}
      <path
        d="M60 14 C60 11, 64 11, 64 14 C64 17, 60 19, 60 19 C60 19, 56 17, 56 14 C56 11, 60 11, 60 14Z"
        fill="#FF8A80"
        opacity="0.8"
      />
    </svg>
  )
}

export function CoffeeIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steam */}
      <path
        d="M30 18 C30 14, 34 14, 34 18 C34 22, 30 22, 30 18Z"
        fill="none"
        stroke="#C4B5A0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M40 14 C40 10, 44 10, 44 14 C44 18, 40 18, 40 14Z"
        fill="none"
        stroke="#C4B5A0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M50 18 C50 14, 54 14, 54 18 C54 22, 50 22, 50 18Z"
        fill="none"
        stroke="#C4B5A0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Cup body */}
      <rect x="18" y="28" width="44" height="34" rx="6" fill="#A7D7F7" />
      {/* Cup highlight */}
      <rect x="18" y="28" width="44" height="8" rx="4" fill="#BDE4FA" />
      {/* Handle */}
      <path
        d="M62 36 C70 36, 70 52, 62 52"
        stroke="#A7D7F7"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Face on cup */}
      <circle cx="33" cy="46" r="2.5" fill="#3D5A80" />
      <circle cx="47" cy="46" r="2.5" fill="#3D5A80" />
      <circle cx="34" cy="44.5" r="0.8" fill="#FFFFFF" />
      <circle cx="48" cy="44.5" r="0.8" fill="#FFFFFF" />
      {/* Smile */}
      <path
        d="M35 52 C37 55 43 55 45 52"
        stroke="#3D5A80"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blush */}
      <circle cx="27" cy="50" r="3" fill="#FFB7B7" opacity="0.4" />
      <circle cx="53" cy="50" r="3" fill="#FFB7B7" opacity="0.4" />
      {/* Saucer */}
      <ellipse cx="40" cy="65" rx="28" ry="5" fill="#E8DED0" />
      {/* Small heart on cup */}
      <path
        d="M40 38 C40 36, 43 36, 43 38 C43 40, 40 42, 40 42 C40 42, 37 40, 37 38 C37 36, 40 36, 40 38Z"
        fill="#FF8A80"
        opacity="0.7"
      />
    </svg>
  )
}
