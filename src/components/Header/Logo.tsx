import './Logo.scss';

interface LogoProps {
  width?: number | string;
  height?: number | string;
}

export default function Logo({ width = 120, height = 'auto' }: LogoProps) {
  return <a href="/" className="logo-container flex justify-center">
    <img src="/images/logo.svg" alt="Weather App Logo" width={width} height={height}/>
  </a>;
}
