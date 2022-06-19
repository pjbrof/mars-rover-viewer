import React, { useContext } from "react";
import { Context } from "./store";
import ReactTooltip from "react-tooltip";

const DisplayPanel = () => {
  const { store } = useContext(Context);

  return (
    <div className="display-panel">
      <h1>{store.name}</h1>
      <div className="centered">
        <h2>Sol &nbsp;{store.sol}</h2>
        <div className={`status ${store.status}`} />
      </div>
      <p>Earth Date: {store.weather?.terrestrial_date}</p>
      <br />
      {store.weather && (
        <>
          {store.weather.abs_humidity !== "--" && (
            <>
              <h3>
                HUMIDITY
                <span
                  className="tooltip-icon"
                  data-tip={store.descriptions.abs_humidity_desc_en}
                >
                  &#9432;
                </span>
              </h3>
              <p>abs_humidity: {store.weather.abs_humidity}</p>
            </>
          )}

          <h3>
            ATMOSPHERE
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.atmo_opacity_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>{store.weather.atmo_opacity}</p>

          <h3>
            UV IRRADIANCE INDEX
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.local_uv_irradiance_index_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>{store.weather.local_uv_irradiance_index}</p>

          <h3>
            SOLAR LATITUDE
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.ls_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>{store.weather.ls}</p>

          <h3>
            Temperature
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.temp_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>
            {store.weather.min_temp}&deg;F - {store.weather.max_temp}
            &deg;F
          </p>

          <h3>
            GROUND TEMPERATURE
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.gts_temp_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>
            {store.weather.min_gts_temp}&deg;F - {store.weather.max_gts_temp}
            &deg;F
          </p>

          <h3>
            PRESSURE ({store.weather.pressure_string})
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.pressure_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>{store.weather.pressure} Pascals</p>

          <h3>
            SUN RISE / SET{" "}
            <span
              className="tooltip-icon"
              data-tip={store.descriptions.sunrise_sunset_desc_en}
            >
              &#9432;
            </span>
          </h3>
          <p>
            {store.weather.sunrise} - {store.weather.sunset}
          </p>

          {store.weather.wind_speed !== "--" && (
            <h3>
              WIND
              <span
                className="tooltip-icon"
                data-tip={store.descriptions.wind_desc_en}
              >
                &#9432;
              </span>
            </h3>
          )}
          {store.weather.wind_direction !== "--" && (
            <p>wind_direction: {store.weather.wind_direction}</p>
          )}
          {store.weather.wind_speed !== "--" && (
            <p>wind_speed: {store.weather.wind_speed}</p>
          )}
          <ReactTooltip className="tooltip" />
        </>
      )}
    </div>
  );
};

export default DisplayPanel;
