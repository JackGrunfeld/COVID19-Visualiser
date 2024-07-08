import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./DashboardPage.module.css";
import AreaChartBox from "../Components/AreaChartBox/AreaChartBox";
import ChartBox from "../Components/ChartBox/ChartBox";
import BarChartBox from "../Components/BarChartBox/BarChartBox";
import { CovidContext } from "../Context/CovidContext";
import { visualisationsKey } from "./Constants";
import MultiSelect from "../Components/MultiSelect/Multiselect";
import Legend from "../Components/Legend/Legend";
import { ChartProps } from "../Components/Modal/GraphModal";
import GraphModal from "../Components/Modal/GraphModal";
import ChartDropdown from "../Components/ChartDropdown/ChartDropdown";
import randomColor from "randomcolor";

type ChartType = 'Chart' | 'AreaChart' | 'BarChart';

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<ChartProps | undefined>();
  const [chartType, setChartType] = useState<ChartType>('Chart');
  const handleSelectChart = (value: any) => {
            setChartType(value);
      };

  const { covidTimelineData, setCovidTimelineData, selectedDate} =
    useContext(CovidContext);
    const [dashboardCountries, setDashboardCountries] = useState<string[]>(() => {
      const savedCountries = localStorage.getItem('dashboardCountries');
      return savedCountries ? JSON.parse(savedCountries) : ['New Zealand'];
    });
  
    const [dashboardMetrics, setDashboardMetrics] = useState<string[]>(() => {
      const savedMetrics = localStorage.getItem('dashboardMetrics');
      return savedMetrics ? JSON.parse(savedMetrics) : visualisationsKey.map((key) => key.formatName);
    });
  
    const [dashboardCountriesColors, setDashboardCountriesColors] = useState<any>(() => {
      const savedColors = localStorage.getItem('dashboardCountriesColors');
      return savedColors ? JSON.parse(savedColors) : {};
    });


  const countryNames = useMemo(() => {
    return covidTimelineData[selectedDate]?.map(
      (data: any) => data?.countryName
    );
  }, [covidTimelineData]);

  const setDashBoardMetricsHandler = (metrics: string[]) => {
    setDashboardMetrics(metrics);
    localStorage.setItem('dashboardMetrics', JSON.stringify(metrics));
  }
  const setDashBoardCountriesHandler = (countries: string[]) => {
    setDashboardCountries(countries);
    localStorage.setItem('dashboardCountries', JSON.stringify(countries));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGitTimeline = await fetch(
          "./groupedByDate.json"
        ).then((res) => res.json()); 

        if (!responseGitTimeline) {
          throw new Error("Failed to fetch data");
        }
        setCovidTimelineData(responseGitTimeline);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newColors = dashboardCountries.filter((country:any) => !dashboardCountriesColors[country]).reduce((acc:any, country, index) => {
      acc[country] = randomColor();
      return acc;
    }, {});

    const newDashboardColors = {...dashboardCountriesColors,...newColors};
    // if there is a country property in newDashboardColors that is not in dashboardCountries, remove it
    for (const country in newDashboardColors) {
      if (!dashboardCountries.includes(country)) {
        delete newDashboardColors[country];
      }
    }
    setDashboardCountriesColors(newDashboardColors);
    localStorage.setItem('dashboardCountriesColors', JSON.stringify(newDashboardColors));

  },[dashboardCountries])

  return (
    <div className={styles.container}>
      <GraphModal open={isModalOpen} setIsOpen={setIsModalOpen}/>
      <div className={styles.left}>
      <div className={styles.leftContent}>

        <Legend colors={dashboardCountriesColors} />
        <MultiSelect
          names={countryNames}
          title="Countries"
          selectedNames={dashboardCountries}
          setSelectedNames={setDashBoardCountriesHandler}
        />
        <MultiSelect
          names={visualisationsKey?.map((key) => key?.formatName)}
          title="Metrics"
          selectedNames={dashboardMetrics}
          setSelectedNames={setDashBoardMetricsHandler}
        />
        <ChartDropdown onSelect={handleSelectChart} currSelectedChartName={chartType} />
      </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightContent}>
          {
            dashboardMetrics.map((metric) => {
              let ChartComponent;
              if (chartType === 'AreaChart') {
                ChartComponent = AreaChartBox;
              } else if (chartType === 'Chart') {
                ChartComponent = ChartBox;
              } else {
                ChartComponent = BarChartBox;
              }

              return (
                <ChartComponent
                  countries={dashboardCountries}
                  selectedMetric={metric}
                  key={metric}
                  colors={dashboardCountriesColors}
                  setIsModalOpen={(chartProps: ChartProps) => setIsModalOpen({ ...chartProps, chartType })}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
