import React from 'react'

interface IntialAvatarProps {
  name: string;
  width: number;
}
const IntialAvatar = ({ name, width }: IntialAvatarProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-full"
      style={{ width: width, height: width }}
    >
      <h5 className="text-white text-sm font-bold">{name.charAt(0)}</h5>
    </div>
  );
};

export default IntialAvatar;