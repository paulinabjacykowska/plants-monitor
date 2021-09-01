import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import * as api from '../api';

const dateToString = date => {
  return `${new Date(date).getHours()}:${new Date(
    date
  ).getMinutes()}:${new Date(date).getSeconds()}`;
};

export default function ChartSimpleBar({ sensorId }) {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    api.getReadings(sensorId).then(res => setReadings(res.data));
  }, []);

  const mappedReadings = useMemo(
    () =>
      readings.slice(0, 25).map(reading => ({
        ...reading,
        createdAt: dateToString(reading.createdAt),
      })),
    [readings]
  );

  if (!readings.length) {
    return null;
  }

  return (
    <Paper>
      <Chart data={mappedReadings}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="airHumidity" argumentField="createdAt" />
        <Title text="Wilgotność powietrza (ostatnie 25 odczytów)" />
        <Animation />
      </Chart>
    </Paper>
  );
}
