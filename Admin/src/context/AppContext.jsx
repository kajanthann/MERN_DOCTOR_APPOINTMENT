import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";

  // Accurate age calculation
  const calculateAge = (dob) => {
    if (!dob) return "-";
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Handles both DD_MM_YYYY and timestamps
  const convertDate = (dateValue) => {
    if (!dateValue) return "Invalid Date";

    // Case 1: timestamp
    if (!isNaN(dateValue)) {
      const d = new Date(Number(dateValue));
      return `${d.getDate()} - ${months[d.getMonth()]} - ${d.getFullYear()}`;
    }

    // Case 2: DD_MM_YYYY string
    const parts = dateValue.split("_");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const monthIndex = parseInt(month, 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${day} - ${months[monthIndex]} - ${year}`;
      }
    }

    return "Invalid Date";
  };

  const value = {
    calculateAge,
    convertDate,
    currency,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
