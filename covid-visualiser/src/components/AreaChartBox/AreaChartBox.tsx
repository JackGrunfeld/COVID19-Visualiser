import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AreaChartBox.module.css";
import { CovidContext } from "../../Context/CovidContext";
import ReactLoading from "react-loading";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { NumberFormat, titleCaseToCamelCase, toDate } from "../../utils";
import { ChartBoxProps } from "../ChartBox/ChartBox";
import { visualisationsKey } from "../../Pages/Constants";


const AreaChartBox = (props: ChartBoxProps) => {
  const { covidTimelineData } = useContext(CovidContext);
  const [dateData, setDateData] = useState<any[]>([]);

  useEffect(() => {
    let placeholderData: any[] = [];
    for (const date in covidTimelineData) {
      const currDateData = placeholderData;
      const filteredData = covidTimelineData[date]?.filter((country: any) =>
        props.countries?.includes(country.countryName)
      );

      const newData: any = {
        date: toDate(date).toLocaleDateString("en-US", {
          day: undefined,
          month: "2-digit",
          year: "numeric",
        }),
      };

      filteredData?.forEach((country: any) => {
        newData[country.countryName] = Number(
          country[titleCaseToCamelCase(props.selectedMetric)]
        );
      });

      placeholderData = [...currDateData, newData];
    }
    setDateData(placeholderData);
  }, [props.countries, props.selectedMetric, covidTimelineData]);

  const handleChartClick = (event: any) => {
    const data = {
      countries: props.countries,
      colors: props.colors,
      selectedMetric: props.selectedMetric,
    };
    props.setIsModalOpen(data);
  };

  const selectedVisualisation = visualisationsKey.find(
    (vis) =>
      vis.formatName === props.selectedMetric &&
      vis.thresholds[vis.thresholds.length - 1] < 10
  );
  
  return (
    <div
      className={styles.container}
      style={{
        width: props.width ?? 370,
        height: props.height ?? 240,
        boxShadow: props.disableDropShadow ? "none" : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" 
      }}
      onClick={props.setIsModalOpen ? handleChartClick : ()=>{}}
    >
      <div
        className={styles.comparison}
        style={{ width: props.width?? 350, height: props.height ?? 190}}
      >
        <span className={styles.title}>{props.selectedMetric}</span>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ marginTop: 15 }}
        >
          <AreaChart
            data={dateData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} fontSize={"0.5rem"} height={20} />
            <Tooltip itemStyle={{ fontSize: "0.9rem" }} />
            {selectedVisualisation?.thresholdNames && (
              <Legend
                payload={selectedVisualisation?.thresholdNames?.map(
                  (name, index) => ({
                    value: (
                      <span className={styles.legendText}>
                        {index + " " + name}
                      </span>
                    ),
                    legendIcon:(
                      <div
                      style={{
                        height: 0,
                        width: 0,
                        margin:0,
                        padding:0,
                      }}></div>
                    ),
                    color: "#333",
                  })
                )}
                width={props.width ? props.width : 370}
              />
            )}
            <YAxis
              fontSize={".5rem"}
              tickFormatter={(value) => NumberFormat(value, 1)}
              width={40}
            />
            {props.countries.map((country, index) => {
              return (
                <Area
                  key={country}
                  type="monotone"
                  dataKey={country}
                  stroke={props.colors?.[country]}
                  fill={props.colors?.[country]}
                  dot={false}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartBox;
