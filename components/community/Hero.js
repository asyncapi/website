import orbitData from '../../config/orbitData.json';
import Header from './Header';

export default function Hero({ className = '' }) {
  return (
    <>
      <div className="overflow-hidden orbits">
        <div className="orbit-container">
          <div id="first-orbit" className="orbit">
            {orbitData[0].map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} className="orbit-img" />
              </div>
            ))}
            <div className="w-full absolute h-full flex justify-center z-40">
              <Header />
            </div>
          </div>
          <div id="second-orbit" className="orbit">
            {orbitData[1].map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
          <div id="third-orbit" className="orbit">
            {orbitData[2].map((orbit) => (
              <div key={orbit.id} className={orbit.id}>
                <img src={orbit.img} alt={orbit.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
