import React from 'react'
import { Bar, Line, } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler, TimeScale } from 'chart.js';
Chart.register(CategoryScale);
Chart.register(LinearScale)
Chart.register(BarElement)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(Filler)
Chart.register(TimeScale)


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



function BarChart({ heights, points, handleCurrentPosition }) {
  //console.log(heights.length)
  const hs = heights.map((h) => {
    return h.points.map(a => parseFloat(a[1]))
  })
  console.log("Chart heights")
  console.log(heights)
  return (
    <div>
      <Line
        data={{
          labels: hs[0],
          datasets: heights.map(h => {
            return {
              label: h.label,
              data: h.points.map((he) => {
                return { x: parseFloat(he[1]), y: parseFloat(he[0]) }
              }),
              backgroundColor: h.color,
              fill: false
            }
          })
        }}

        options={
          {
            interaction: {
              mode: "point"
            },
            /*onClick: (event, elements) => {
                
                handleCurrentPosition(elements)
            },*/
            onHover: (event, element) => {
              if (element.length != 0) {
                handleCurrentPosition(element[0])
              }
            }

          }
        }
        height={100}
        width={600}

      />
    </div>

  )
}

export default BarChart