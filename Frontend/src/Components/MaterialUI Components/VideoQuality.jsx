import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function QualityToggle({qualities, currQuality, setCurrQuality, setIsQualityModalOpened}) {

  const handleChange = (event, quality) => {
    setIsQualityModalOpened((prev)=>prev ? null : true)
    if(!quality) return;
    setCurrQuality(quality);
    localStorage.setItem('defaultVideoQuality', quality.qualityLabel);
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={currQuality}
      exclusive
      onChange={handleChange}
    >
        {
         qualities.map((quality, index) => (
            <ToggleButton value={quality} aria-label="list" color='secondary' size='large' sx={{ color:'white',}}>
                {quality.qualityLabel}
            </ToggleButton>
        ))
        }
    </ToggleButtonGroup>
  );
}

export const QualityLabel = ({isQualityModalOpened, setIsQualityModalOpened, qualityLabel}) => {
  const handleChange = (event) => {
    setIsQualityModalOpened((prev)=>prev ? null : true)
  };

  return(
    <ToggleButtonGroup
      value={[isQualityModalOpened]}
      orientation='vertical'
      onChange={handleChange}
      >
        <ToggleButton value={true} aria-label={qualityLabel} color='secondary' size='large' fullWidth sx={{ color:'white',}}>{qualityLabel}</ToggleButton>
      </ToggleButtonGroup>
  )
}