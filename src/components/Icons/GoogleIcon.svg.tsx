import React from 'react';

interface GoogleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({
  height = 18,
  width = 18,
  size = 18,
}) => {
  if (size) {
    height = size;
    width = size;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90 92"
      fill="none"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <path
        d="M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z"
        fill="#4280ef"
      ></path>
      <path
        d="M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z"
        fill="#34a353"
      ></path>
      <path
        d="M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z"
        fill="#f6b704"
      ></path>
      <path
        d="M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z"
        fill="#e54335"
      ></path>
    </svg>
  );
};

export default GoogleIcon;
