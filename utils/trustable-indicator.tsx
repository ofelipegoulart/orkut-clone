export function getTrustableIcons(trustablePercentage: number) {
  const icons: string[] = [];
  const filled = Math.floor(trustablePercentage / (1/6));
  const hasHalf = trustablePercentage % (1/6) >= 1/12;

  const onCount = Math.floor(filled / 2);
  const halfCount = filled % 2 + (hasHalf ? 1 : 0);
  const offCount = 3 - onCount - halfCount;

  for (let i = 0; i < onCount; i++) {
    icons.push("/icons/icn_trusty_on.png");
  }
  for (let i = 0; i < halfCount; i++) {
    icons.push("/icons/icn_trusty_half.png");
  }
  for (let i = 0; i < offCount; i++) {
    icons.push("/icons/icn_trusty_off.png");
  }

  return icons;
}

export function TrustableIndicator({ trustablePercentage }: { trustablePercentage: number }) {
  const icons = getTrustableIcons(trustablePercentage);

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
