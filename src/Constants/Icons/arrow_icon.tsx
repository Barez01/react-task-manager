type Props = {
  color?: string;
  size?: number;
  direction?: "right" | "left" | "up" | "down";
};

export const ArrowIcon = ({
  color = "currentColor",
  size = 24,
  direction = "right",
}: Props) => {
  const rotationMap = {
    right: "0deg",
    down: "90deg",
    left: "180deg",
    up: "270deg",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      width={size}
      height={size}
      style={{ transform: `rotate(${rotationMap[direction]})` }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
