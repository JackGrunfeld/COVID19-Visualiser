import { createContext } from "react";

interface CovidContextType {
  selectedCountry: any;
  hoveredCountry: any;
  covidTimelineData: any;
  selectedDate: any;
  loading: any;
  searchedCountry: any;
  setSelectedCountry: (country: any) => void;
  setHoveredCountry: (country: any) => void;
  setCovidTimelineData: (data: any) => void;
  setSelectedDate: (date: any) => void;
  setLoading: (loading: any) => void;
  setSearchedCountry: (country : any) => void;
}

export const CovidContext = createContext<CovidContextType>({
  selectedCountry: {},
  hoveredCountry: {},
  covidTimelineData: [],
  selectedDate: '20200101',
  loading: false,
  searchedCountry:{},
  setSelectedCountry: () => {},
  setHoveredCountry: () => {},
  setCovidTimelineData: () => {},
  setSelectedDate: () => {},
  setLoading: () => {},
  setSearchedCountry: () => {},
});


