import type { AvatarProps } from './Avatar.type';

const HUES = [257, 155, 19, 70, 300, 200];

const Avatar = ({ name = '', size = '4rem' }: AvatarProps) => {
  const initials = (name || '?').trim().slice(-2);
  const hue = HUES[(name.charCodeAt(0) || 0) % HUES.length];

  return (
    <span
      className="grid shrink-0 place-items-center rounded-[1.08rem] font-bold"
      style={{
        width: size,
        height: size,
        fontSize: `calc(${size} * 0.36)`,
        background: `oklch(0.95 0.04 ${hue})`,
        color: `oklch(0.5 0.15 ${hue})`,
      }}
    >
      {initials}
    </span>
  );
};

export default Avatar;
