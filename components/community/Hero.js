import orbitData from '../../config/orbitData.json';
import Header from './Header';

export default function Hero({ className = '' }) {
  return (
    <>
      <div className="overflow-hidden orbits">
        <div className="orbit-container" data-testid="orbit-div">
          <div id="first-orbit" className="orbit" data-testid="first">
            {orbitData[0].map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} className="orbit-img" data-testid="firstimg" />
              </div>
            ))}
            <div className="w-full absolute h-full flex justify-center z-40">
              <Header />
            </div>
          </div>
          <div id="second-orbit" className="orbit" data-testid="second">
            {orbitData[1].map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} data-testid="secondimg" />
              </div>
            ))}
          </div>
          <div id="third-orbit" className="orbit" data-testid="third">
            {orbitData[2].map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} data-testid="thirdimg"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
