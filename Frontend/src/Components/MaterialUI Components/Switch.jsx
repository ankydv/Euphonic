import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { renderToString } from 'react-dom/server';
import { FaMusic, FaVideo } from "react-icons/fa6";

const svgToDataUri = (svgComponent, color = 'white') => {
  // Render SVG component to string
  const svgString = renderToString(svgComponent());

  // Parse SVG string into DOM
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  // Change the color of all <path> elements
  const paths = svgElement.querySelectorAll('path');
  paths.forEach(path => {
    path.setAttribute('fill', color);
  });

  // Serialize modified SVG back to string
  const serializer = new XMLSerializer();
  const modifiedSvgString = serializer.serializeToString(svgElement);

  // Return data URI
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSvgString)}`;
};

const StyledFaVideo = styled(FaVideo)`
  color: white;
`;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url("${svgToDataUri(FaVideo)}")`,
          color: 'white !important',
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      color: 'white',
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("${svgToDataUri(FaMusic)}")`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  export default MaterialUISwitch;