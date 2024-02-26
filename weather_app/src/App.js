import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function App() {
  const [city, setCity] = useState("Ho Chi Minh");
  //const [data, setData] = useState([]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=4&appid=1ddbb67ac01f70e185ad78b63ed7a329`
      )
      .then((res) => {
        console.log(res);
      })

      .catch((e) => console.log(e));
  }, [city]);

  return (
    <div className={styles.container}>
      <di>
        <h2>From :</h2>
        <select className={styles.select} onChange={handleChange}>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Athens">Athens</option>
        </select>
      </di>
      <div className={styles.heading}>
        <h2>Current Weather:</h2>
        <h2>Next 3 days:</h2>
      </div>
    </div>
  );
}

export default App;
