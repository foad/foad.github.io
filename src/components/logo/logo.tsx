import styles from "./logo.module.css";

type LogoProps = {
  width?: number;
  height?: number;
};

export const Logo = ({ width, height }: LogoProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 665.4 218.6"
      enableBackground="new 0 0 665.4 218.6"
      xmlSpace="preserve"
      className={styles.logo}
      width={width}
      height={height}
    >
      <style type="text/css">
        {`
          .st0 { fill: #31343a; }
          .st1 { fill: #ed6a5a; }
        `}
      </style>
      <g>
        <g>
          <path
            className="st0"
            d="M207.7,40c-9.1,6.7-16.8,15.1-22.7,24.7h-84.3c-7,0-12.7,5.8-12.7,12.7v12.8h86.6c-1.4,6.1-2.1,12.5-2.1,19
              c0,1.9,0.1,3.8,0.2,5.7H87.9v63.5H63.3v-101C63.3,56.8,80,40,100.7,40H207.7z"
          />
          <path
            className="st0"
            d="M258.4,40c-38.2,0-69.2,31-69.2,69.2c0,38.2,31,69.2,69.2,69.2s69.2-31,69.2-69.2C327.6,71,296.6,40,258.4,40
              z M258.4,153.8c-24.6,0-44.6-20-44.6-44.6c0-24.6,20-44.6,44.6-44.6c24.5,0,44.5,20,44.5,44.6
              C302.9,133.8,282.9,153.8,258.4,153.8z"
          />
          <polygon
            className="st1"
            points="383.8,40 325.8,153.8 313.2,178.6 341,178.6 353.6,153.8 383.8,94.5 414,153.8 426.7,178.6 
              454.4,178.6 441.8,153.8"
          />
          <path
            className="st0"
            d="M532.8,40.1h-69.3v24.7h62.1v0h7.1c24.5,0,44.5,20,44.5,44.5c0,24.6-20,44.6-44.5,44.6h-44.6V93.5h-24.7v85
              h69.3c19.1,0,36.4-7.7,48.9-20.3c1.4-1.4,2.7-2.9,4-4.3c10.3-12,16.4-27.7,16.4-44.6C602,71,571,40.1,532.8,40.1z"
          />
        </g>
      </g>
    </svg>
  );
};

export const ShortLogo = ({ width, height }: LogoProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="300 0 170 218.6"
      enableBackground="new 0 0 665.4 218.6"
      xmlSpace="preserve"
      className={styles.shortLogo}
      width={width}
      height={height}
    >
      <style type="text/css">
        {`
          .st1 { fill: #ed6a5a; }
        `}
      </style>
      <g>
        <g>
          <polygon
            className="st1"
            points="383.8,40 325.8,153.8 313.2,178.6 341,178.6 353.6,153.8 383.8,94.5 414,153.8 426.7,178.6 
              454.4,178.6 441.8,153.8"
          />
        </g>
      </g>
    </svg>
  );
};
