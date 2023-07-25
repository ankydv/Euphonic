import React from "react";
import "../styles/musicRecommendation.css"; // Import the CSS file for styling
// import "../styles/musicCard.css"

import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from '../state/index';

  // Sample music recommendations data
  const musicRecommendations = [
    {"type":"SONG","videoId":"kkEc8LyD8pM","name":"Lollypop Lageli","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_y8loxzTZLut","name":"Pawan Singh Is King"},"duration":338,"thumbnails":[{"url":"https://lh3.googleusercontent.com/WEm5pC0wRLskuJyBvgS5FMNcE_ot2_041tqLsAUeelsgv65vB0EYTjj4jdO3JEV7TD0voHkdvNW0PBbodQ=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/WEm5pC0wRLskuJyBvgS5FMNcE_ot2_041tqLsAUeelsgv65vB0EYTjj4jdO3JEV7TD0voHkdvNW0PBbodQ=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"kkEc8LyD8pM","name":"Lollypop Lageli","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_y8loxzTZLut","name":"Pawan Singh Is King"},"duration":338,"thumbnails":[{"url":"https://lh3.googleusercontent.com/WEm5pC0wRLskuJyBvgS5FMNcE_ot2_041tqLsAUeelsgv65vB0EYTjj4jdO3JEV7TD0voHkdvNW0PBbodQ=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/WEm5pC0wRLskuJyBvgS5FMNcE_ot2_041tqLsAUeelsgv65vB0EYTjj4jdO3JEV7TD0voHkdvNW0PBbodQ=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"91Q1fGu7N7k","name":"Lollypop Lageli","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_8GkMmliZuaI","name":"Lollypop Lageli"},"duration":363,"thumbnails":[{"url":"https://lh3.googleusercontent.com/16l5nd5eCPOu6K44Z93UvT3xWnbCex-vn8ogwSOOiMnYVY7zGvSzgwlDIawIN3iejIAOdcyS_QjDTCH3=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/16l5nd5eCPOu6K44Z93UvT3xWnbCex-vn8ogwSOOiMnYVY7zGvSzgwlDIawIN3iejIAOdcyS_QjDTCH3=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"CVmQzaN0ysM","name":"Kamariya Kare Lapalap","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_jIVSHInoZn9","name":"Ara Jila Hila Dela Kila"},"duration":397,"thumbnails":[{"url":"https://lh3.googleusercontent.com/LqLT6AbRIZPp6bTLf5j6u_KPhdO1y-wrwG6MLjNgvDa9bprc0j1I13o4zn7CEU7Zo9xsKcBKrHiPyDA=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/LqLT6AbRIZPp6bTLf5j6u_KPhdO1y-wrwG6MLjNgvDa9bprc0j1I13o4zn7CEU7Zo9xsKcBKrHiPyDA=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"0VbhxglCKxE","name":"Lollipop Lagelu Bhojpuri [Revisited Version] (feat. Kimberly M.C. Donough)","artists":[{"artistId":"UC7WA1ECDoTl3F8lKl46cvYw","name":"Siddharth Slathia"}],"album":{"albumId":"MPREb_MOq0HxDCkvZ","name":"Lollipop Lagelu Bhojpuri [Revisited Version]"},"duration":207,"thumbnails":[{"url":"https://lh3.googleusercontent.com/9irC5moH4zb3rj_CMNSmv7LxCFQrcPq_NVEli4FgXYvMUXTgDwWoHSg0aPQCOYF8S9jsBoEzAXHf7jsY=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/9irC5moH4zb3rj_CMNSmv7LxCFQrcPq_NVEli4FgXYvMUXTgDwWoHSg0aPQCOYF8S9jsBoEzAXHf7jsY=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"WOVt49tksec","name":"Lolly Pop Lageli","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_OM8Ph6ma3ZA","name":"Lolly Pop Lageli"},"duration":364,"thumbnails":[{"url":"https://lh3.googleusercontent.com/EOsy8svV4ViD_5GShfWRbulaTQvczRxR84vqJ_GOZElpnnyBz88uAnQi-v-3gPGGgkhEAP338WJ2gEA_=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/EOsy8svV4ViD_5GShfWRbulaTQvczRxR84vqJ_GOZElpnnyBz88uAnQi-v-3gPGGgkhEAP338WJ2gEA_=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"JV-DTq0NRzw","name":"Lollypop","artists":[{"artistId":"UC6eBb9YPtJBlg7MZ-ILmXEg","name":"Humane Sagar"}],"album":{"albumId":"MPREb_o8wc4dqwEz0","name":"Lollypop"},"duration":203,"thumbnails":[{"url":"https://lh3.googleusercontent.com/YuMzprObLdxeR4EdgUMdOEgsKqMIm9sdDsuMKj_OlR4DCThiDzAGSXweGO3WtnD_kd_cSrGie0Racrlk=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/YuMzprObLdxeR4EdgUMdOEgsKqMIm9sdDsuMKj_OlR4DCThiDzAGSXweGO3WtnD_kd_cSrGie0Racrlk=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"kw5RaeZV7LA","name":"Lolly Pop Ke Puaa Lage Lu","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_4c1DOzPNyty","name":"Baazigar"},"duration":219,"thumbnails":[{"url":"https://lh3.googleusercontent.com/EKS7sGZ0xUOsos5cPlM-l0Zx9j2NqUUEq6pNRus6Cnc__kOyT7g6CHdaujIGGED5cVAPsEpAsu35kiPS8A=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/EKS7sGZ0xUOsos5cPlM-l0Zx9j2NqUUEq6pNRus6Cnc__kOyT7g6CHdaujIGGED5cVAPsEpAsu35kiPS8A=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"yW-8IYteZ2I","name":"Lollipop Lagelu 2","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"},{"artistId":"UCzKUKdgJUIkN3IZSiyVsnqQ","name":"Priyanka Singh"}],"album":{"albumId":"MPREb_Ay6acecDI2a","name":"Lollipop Lagelu 2"},"duration":179,"thumbnails":[{"url":"https://lh3.googleusercontent.com/QlwrSKE7QZMhgyz7-VegUSbVZAkkzq5jq61db6V5MawvHf0F9xznsphMU_WZhsV9AXgVQFhWKqwIcTU=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/QlwrSKE7QZMhgyz7-VegUSbVZAkkzq5jq61db6V5MawvHf0F9xznsphMU_WZhsV9AXgVQFhWKqwIcTU=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"L87b9O2fsTI","name":"Kahe Lollypop Lagelu","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"},{"artistId":"UCCQ3lsuIvggWzZO6TZzCTpg","name":"Chetna"}],"album":{"albumId":"MPREb_jRjqwbOhgeu","name":"Jawani Ka da Humre Hawale"},"duration":334,"thumbnails":[{"url":"https://lh3.googleusercontent.com/fqv9I5UCgHuIa-NQ6-JlbJTj5p8rfhG4G_TyaMBLA2N7Hs7fGjEGI2g1LDdB9ldixkuTEZN1rici9vU=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/fqv9I5UCgHuIa-NQ6-JlbJTj5p8rfhG4G_TyaMBLA2N7Hs7fGjEGI2g1LDdB9ldixkuTEZN1rici9vU=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"-Z2maZISLPM","name":"Gadbad Ghotala","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_OM8Ph6ma3ZA","name":"Lolly Pop Lageli"},"duration":377,"thumbnails":[{"url":"https://lh3.googleusercontent.com/EOsy8svV4ViD_5GShfWRbulaTQvczRxR84vqJ_GOZElpnnyBz88uAnQi-v-3gPGGgkhEAP338WJ2gEA_=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/EOsy8svV4ViD_5GShfWRbulaTQvczRxR84vqJ_GOZElpnnyBz88uAnQi-v-3gPGGgkhEAP338WJ2gEA_=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"1tPX4bTQKlg","name":"Lollypop Lagelu 2.0 (Bhojpuri)","artists":[{"artistId":"UC2iaoPAJNzvD83M7gqkdVjA","name":"Shivansh Singh Sonal"}],"album":{"albumId":"MPREb_h3SZ6s6ZiVv","name":"Lollypop Lagelu 2.0"},"duration":228,"thumbnails":[{"url":"https://lh3.googleusercontent.com/OzmY2nWLPGVs98UbT1tqLfkU7z26xDavZOOgPHMF_xvFGL_lx7KJX44FKj-9fO6eXJPfFLr9Q3slaaia=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/OzmY2nWLPGVs98UbT1tqLfkU7z26xDavZOOgPHMF_xvFGL_lx7KJX44FKj-9fO6eXJPfFLr9Q3slaaia=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"ghl8URD1ELU","name":"Lollypop Lagelu","artists":[],"album":{"albumId":"MPREb_btcouCuRYDD","name":"Maal Top Lagelu"},"duration":303,"thumbnails":[{"url":"https://lh3.googleusercontent.com/57Q0XS3myj9TCs6YWVdIkBK2yXpBsZjcMtxVx0Lmkb1xywn6SRBqMnZBU8EDa5BQu7_mh_D4ePT9x5T3=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/57Q0XS3myj9TCs6YWVdIkBK2yXpBsZjcMtxVx0Lmkb1xywn6SRBqMnZBU8EDa5BQu7_mh_D4ePT9x5T3=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"xnjZ1PtMgqo","name":"Sab Kahela Lagelu Lollipop","artists":[{"artistId":"UCvYR4Ozi94w7jCfPeVgtcLw","name":"Piyush baba"}],"album":{"albumId":"MPREb_yI1M759077D","name":"Sab Kahela Lagelu Lollipop"},"duration":183,"thumbnails":[{"url":"https://lh3.googleusercontent.com/ZfkDAVUp634vN7quTLu10OE6znE-o19XlS-6tL-3VNXnVU2_fNy7B9_4HDgEJC3OviDTml1J0e306TeF=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/ZfkDAVUp634vN7quTLu10OE6znE-o19XlS-6tL-3VNXnVU2_fNy7B9_4HDgEJC3OviDTml1J0e306TeF=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"9OhA16kuRoQ","name":"Lollypop Lagelu 2","artists":[],"album":{"albumId":"MPREb_uGh1Ydgreb0","name":"Lollypop Lagelu 2"},"duration":155,"thumbnails":[{"url":"https://lh3.googleusercontent.com/x-TrbIz4Tax7zZJCilPmrAfIsQiJ6aHse3DT-EXcIdGnzEwKaAS62YFEbjLJlOV4aExVOfIZZPA4mLPAhA=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/x-TrbIz4Tax7zZJCilPmrAfIsQiJ6aHse3DT-EXcIdGnzEwKaAS62YFEbjLJlOV4aExVOfIZZPA4mLPAhA=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"ghl8URD1ELU","name":"Lollypop Lagelu","artists":[],"album":{"albumId":"MPREb_btcouCuRYDD","name":"Maal Top Lagelu"},"duration":303,"thumbnails":[{"url":"https://lh3.googleusercontent.com/57Q0XS3myj9TCs6YWVdIkBK2yXpBsZjcMtxVx0Lmkb1xywn6SRBqMnZBU8EDa5BQu7_mh_D4ePT9x5T3=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/57Q0XS3myj9TCs6YWVdIkBK2yXpBsZjcMtxVx0Lmkb1xywn6SRBqMnZBU8EDa5BQu7_mh_D4ePT9x5T3=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"9tJP0vVxWwI","name":"Lollipop Lagelu (Recreated)","artists":[{"artistId":"UCOi0fauZhssYcNGfJiHAePw","name":"Diptarka Bose"}],"album":{"albumId":"MPREb_mDCWO9EPI6d","name":"Lollipop Lagelu (Recreated)"},"duration":133,"thumbnails":[{"url":"https://lh3.googleusercontent.com/rn7-3aoDFc5kd4LGoCv9BmSxL9RevlTpFTTfM80Mr41H6Ch46jdRJ7x4asJqFHBmNVub8CqWk2rLUx2s=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/rn7-3aoDFc5kd4LGoCv9BmSxL9RevlTpFTTfM80Mr41H6Ch46jdRJ7x4asJqFHBmNVub8CqWk2rLUx2s=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"-1Hi1kDiU_g","name":"Luliya Ka Mangele","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"}],"album":{"albumId":"MPREb_qrBAOCRTiK2","name":"Satya (Original Motion Picture Soundtrack)"},"duration":225,"thumbnails":[{"url":"https://lh3.googleusercontent.com/FUBFSQk4q3W14HzPqEH0OIbrV8Jz8YtwSS-ewdnbYbi2qOoACF90d8yxIqBYQp9CA8XyEqg7uBb7mu9CLA=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/FUBFSQk4q3W14HzPqEH0OIbrV8Jz8YtwSS-ewdnbYbi2qOoACF90d8yxIqBYQp9CA8XyEqg7uBb7mu9CLA=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"WVmNqsYm8aA","name":"Tu Lagawelu Jab Lipastic","artists":[{"artistId":"UCN9zAwrHTeVTYYbkS2wniAg","name":"Pawan Singh"},{"artistId":"UCvgX4AlIUJxIxo4IofSrw3g","name":"Indu Sonali"}],"album":{"albumId":"MPREb_apqkmXtCMp2","name":"Pratigya (Original Motion Picture Soundtrack)"},"duration":244,"thumbnails":[{"url":"https://lh3.googleusercontent.com/bR_6IuOpsX1AEqdm8vhzjOqzfYTngO83Uskg1Ik85j5yCq5FqHCsCYrpK16SW_UuvdKcTTgzrbLA6aE=w60-h60-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/bR_6IuOpsX1AEqdm8vhzjOqzfYTngO83Uskg1Ik85j5yCq5FqHCsCYrpK16SW_UuvdKcTTgzrbLA6aE=w120-h120-l90-rj","width":120,"height":120}]},{"type":"SONG","videoId":"7sSw29wkbaU","name":"Lollipop (feat. Static Major)","artists":[{"artistId":"UC4IAZ3dowcXyvVYBx4hucSQ","name":"Lil Wayne"}],"album":{"albumId":"MPREb_0RRFVX1eVao","name":"Tha Carter III"},"duration":248,"thumbnails":[{"url":"https://lh3.googleusercontent.com/xRZd5D6oJVzRZTTpDkADC8ptmTkVTRhS1JFYXSHTu_xVzYIpimwZzMI4BXvZOXqHTr90oSAMaL5_BDwQRA=w60-h60-s-l90-rj","width":60,"height":60},{"url":"https://lh3.googleusercontent.com/xRZd5D6oJVzRZTTpDkADC8ptmTkVTRhS1JFYXSHTu_xVzYIpimwZzMI4BXvZOXqHTr90oSAMaL5_BDwQRA=w120-h120-s-l90-rj","width":120,"height":120}]}
  ];

const MusicRecommendation = () => {

  return (
    <div className="music-recommendation">
        <MusicCards title="Ankit" dataSet={musicRecommendations}/>
        <MusicCards title="Ankit" dataSet={musicRecommendations}/>
        <MusicCards title="Ankit" dataSet={musicRecommendations}/>
        <MusicCards title="Ankit" dataSet={musicRecommendations}/>
        <MusicCards title="Ankit" dataSet={musicRecommendations}/>
    </div>
  );
};

export default MusicRecommendation;

const MusicCardItem = ({ music }) => {
  const dispatch = useDispatch();
  const { sendMusic } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="music-card-item">
      <div className="img-container">
        <img src={
          (music.thumbnails[1])?
            music.thumbnails[1].url
          :                               // Ternary operator to check if high quality thumbnail is available and set.
            music.thumbnails[0].url
        } alt={music.title} />
      </div>
      <div className="music-details">
        <p>{music.title}</p>
        {music.artists && (
          <p>
            {music.artists.map((artist, index) => (
              <span key={index}>{artist.name}{index!==music.artists.length-1 && <span>, </span>}</span>
            ))}
          </p>
        )}
      </div>
      <div className="onCardButton" onClick={(e) => {sendMusic(music); e.preventDefault()}}>
        <ul className="list list--buttons">
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="list__link">
              <i className="fa fa-play"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MusicCards = ({ title, dataSet }) => {
  return (
    <div className="music-cards-container">
      <h2>{title}</h2>
      <div className="music-cards">
        {dataSet.map((music, index) => (
          <MusicCardItem
            key={index}
            music={music}
            // handlePlay={handlePlay} // Pass the handlePlay function from parent component
          />
        ))}
      </div>
    </div>
  );
};

export {MusicCards};