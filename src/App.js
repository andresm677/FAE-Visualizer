import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import { useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import BarChart from './components/chart';
import ChartTest from './components/chartTest';
import BarChart1 from './components/charHour';





function App() {
  const [fileContent, setFileContent] = useState()
  //const [polyline, setPolyline] = useState()
  //console.log(fileContent)


  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(4);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const [polyline, setPolyline] = useState([

  ])
  const [refRoute, setRefRoute] = useState(null)


  const [heights, setHeights] = useState([])
  const [current, setCurrent] = useState(polyline[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hours, setHours] = useState([])

  const handleCurrentPosition = ({ datasetIndex, index }) => {
    console.log(polyline[datasetIndex])
    setCurrent(polyline[datasetIndex].points[index])
    /*setCurrent(polyline[position])
    setCurrentIndex(position)*/
    setCurrentIndex(index)
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const colors = ["red", "blue", "orange", "yellow", "rgb(255, 0, 191)", "rgb(191, 0, 255)", "rgb(0, 255, 255)", "rgb(0, 255, 0)"]
    reader.readAsText(file)
    reader.onload = () => {
      const data = reader.result.split('\n')

      const test = []
      const test1 = []
      const test2 = []
      data.splice(0, 1)
      data.forEach(row => {
        const rowData = row.split(" ")
        test2.push([parseFloat(rowData[8]), rowData[6]])
        test1.push([parseFloat(rowData[8]), getDistanceFromLatLonInKm(parseFloat(data[0].split(" ")[2]), parseFloat(data[0].split(" ")[3]), rowData[2], rowData[3])])
        test.push([parseFloat(rowData[2]), parseFloat(rowData[3])])
      });
      test.splice(200, 1)
      test1.splice(200, 1)
      const color = heights.length == 0 ? "green" : colors[Math.floor(Math.random() * 4)]
      if (heights.length > 0) {
        const idx = color.indexOf(color)
        colors.splice(idx, 1)
        console.log(colors)
      }
      const dataLabel = heights.length == 0 ? "Reference" : "Pilot" + (heights.length)
      console.log(dataLabel)
      setHeights([...heights, { points: test1, color: color, label: dataLabel }])
      setFileContent(reader.result.split('\n'))
      setPolyline([...polyline, { points: test, color: color, label: dataLabel }])
      console.log("Test2")
      setHours([...hours, { points: test2, color: color, labe: dataLabel }])
      console.log(test2)

    }
    reader.error = () => {
      console.log('file error', reader.error)
    }
  }
  const handleRefRouteChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      const data = reader.result.split('\n')
      const test = []
      const test1 = []
      data.splice(0, 1)
      data.forEach(row => {
        const rowData = row.split(" ")

        test1.push(parseFloat(rowData[8]))
        test.push([parseFloat(rowData[2]), parseFloat(rowData[3])])
      });
      test.splice(200, 1)
      test1.splice(200, 1)
      //setHeights(test1)
      setFileContent(reader.result.split('\n'))
      setRefRoute(test)
    }
  }
  console.log(polyline)
  console.log(polyline)

  const limeOptions = { color: 'blue', weight: 4 }
  return (
    <>
      <MapContainer center={[-0.314409, -78.440183]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polyline.length > 0 && polyline.map((p) => <Polyline positions={[p.points]} pathOptions={{ color: p.color, weight: 4 }} />)}
        {current && <Marker position={current}>

        </Marker>}
        {current && <Popup position={current}>
          Lat: {current[0]}
          <br />
          Lng: {current[1]}
        </Popup>}

      </MapContainer>
      <input type="file" onChange={handleFileChange}></input>
      <input type="file" onChange={handleFileChange} disabled={heights.length > 0 ? true : false}></input>
      <BarChart1 heights={hours} handleCurrentPosition={handleCurrentPosition} />
    </>
  );
}

export default App;


