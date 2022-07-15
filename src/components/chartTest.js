import React from 'react'

import {Bar, Line } from "react-chartjs-2"
import {Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler, TimeScale, Legend} from 'chart.js'; 


Chart.register(CategoryScale);
Chart.register(LinearScale)
Chart.register(BarElement)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(Filler)
Chart.register(TimeScale)
Chart.register(Legend)

function ChartTest({refRoute, pilotRoute}) {
  
    return (
      <div>
          <Line
              data={{
                  
                  labels: refRoute.map((point) => point[0]),
                  datasets: [{
                      
                      label: 'Reference',
                      data: refRoute.map((point) => {
                          return {x: point[0], y: point[1]}
                      }),
                      fill: true,
                      tension: 0.2,
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: "rgb(75, 192, 192, 0.6)",
                      tension:0.3
                  },
                  {
                      
                    label: 'Pilot',
                    data: pilotRoute.map((point) => {
                        return {x: point[0], y: point[1]}
                    }),
                    fill: true,
                    tension: 0.2,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: "rgb(255, 125, 0, 0.5)",
                    tension:0.3
                },
                  
                
              ]
              }}
              options={
                {
                    scales: {}
                }
              }
              height={100}
              width={600}
              
          />
      </div>
      
    )
  }
  
  export default ChartTest