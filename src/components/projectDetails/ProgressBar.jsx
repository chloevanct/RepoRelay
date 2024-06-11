import { Box } from '@chakra-ui/react'

// Progress bar graphic from:
//    https://codepen.io/alvaromontoro/pen/poWgdVV
export default function ProgressBar({ value }) {
    return (
        <>
        <style>
          {`
          @keyframes progress {
            0% { --percentage: 0; }
            100% { --percentage: var(--value); }
          }
    
          @property --percentage {
            syntax: '<number>';
            inherits: true;
            initial-value: 0;
          }
    
          [role="progressbar"] {
            --percentage: var(--value);
            --primary: #369;
            --secondary: #adf;
            --size: 300px;
            animation: progress 2s 0.5s forwards;
            width: var(--size);
            aspect-ratio: 1;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            display: grid;
            place-items: center;
          }
    
          [role="progressbar"]::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: conic-gradient(var(--primary) calc(var(--percentage) * 1%), var(--secondary) 0);
            mask: radial-gradient(white 55%, transparent 0);
            mask-mode: alpha;
            -webkit-mask: radial-gradient(#0000 55%, #000 0);
            -webkit-mask-mode: alpha;
          }
    
          [role="progressbar"]::after {
            counter-reset: percentage var(--value);
            content: counter(percentage) '% \\A Complete';
            font-family: Helvetica, Arial, sans-serif;
            font-size: calc(var(--size) / 8);
            color: var(--primary);
            white-space: pre-wrap;
            text-align: center;
            display: block;
          }
    
          body {
            margin: 0;
            display: grid;
            place-items: center;
            height: 100vh;
            background: #f0f8ff;
          }
          `}
        </style>
        <Box
          as="div"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ '--value': value }}
        ></Box>
      </>
    )
}

