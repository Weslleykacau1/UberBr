import Image from 'next/image'

export function Map() {
  return (
    <div className="absolute inset-0">
      <Image
        src="https://placehold.co/800x800.png"
        layout="fill"
        objectFit="cover"
        alt="Map placeholder"
        className="opacity-20"
        data-ai-hint="dark map grid"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
    </div>
  )
}
