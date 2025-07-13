import Image from 'next/image'

export function Map() {
  return (
    <div className="absolute inset-0 bg-accent">
      <Image
        src="https://placehold.co/800x800.png"
        layout="fill"
        objectFit="cover"
        alt="Map placeholder"
        className="opacity-10"
        data-ai-hint="light map grid"
      />
    </div>
  )
}
