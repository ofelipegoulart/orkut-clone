export function getSexyIcons(sexyPercentage: number) {
  const icons: string[] = [];
  const filled = Math.floor(sexyPercentage / (1/6));
  const hasHalf = sexyPercentage % (1/6) >= 1/12;

  const onCount = Math.floor(filled / 2);
  const halfCount = filled % 2 + (hasHalf ? 1 : 0);
  const offCount = 3 - onCount - halfCount;

  for (let i = 0; i < onCount; i++) {
    icons.push("/icons/icn_cute_on.png");
  }
  for (let i = 0; i < halfCount; i++) {
    icons.push("/icons/icn_cute_half.png");
  }
  for (let i = 0; i < offCount; i++) {
    icons.push("/icons/icn_cute_off.png");
  }

  return icons;
}

export function SexyIndicator({ sexyPercentage }: { sexyPercentage: number }) {
  const icons = getSexyIcons(sexyPercentage);

  return (
    <span className="inline-flex items-center gap-px align-middle">
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon}
          alt=""
          width={16}
          height={16}
          className="inline-block align-middle"
        />
      ))}
    </span>
  );
}
