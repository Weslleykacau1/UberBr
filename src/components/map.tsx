import Image from 'next/image'

export function Map() {
  return (
    <div className="absolute inset-0">
      <Image
        src="https://placehold.co/1200x800.png"
        layout="fill"
        objectFit="cover"
        alt="Map placeholder"
        className="opacity-40 dark:opacity-20"
        data-ai-hint="city map aerial"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  )
}
