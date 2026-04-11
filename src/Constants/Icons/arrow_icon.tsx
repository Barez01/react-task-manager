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
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
      strokeWidth={1.5}
      style={{ transform: `rotate(${rotationMap[direction]})` }}
    >
      <path
        fillRule="evenodd"
        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
