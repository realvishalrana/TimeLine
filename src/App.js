import { useMemo, useState } from "react";
import "./App.css";
import CustomizedTimeline from "./components/TimeComp";
import "./components/i18n";
import i18n from "./components/i18n";
import { ThemeProvider } from "@emotion/react";
import { Grid, IconButton, createTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const languages = [
    { name: "Hindi", code: "hin" },
    { name: "Gujarati", code: "guj" },
    { name: "English", code: "en" },
    {name:'Select Language',code:'',defaultValue: true, disabled: true, hidden: true}
  ];
  const [language, setLanguage] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const handleChangeLocale = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "light" : "dark",
        },
      }),
    [darkMode]
  );


  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Grid container justify="center">
      <Grid item>
      <IconButton onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </Grid>
      <Grid item sx={{ display: 'flex',alignItems:'center' }}>
      <select onChange={handleChangeLocale} value={language}>
      {languages.map((option, index) => (
                <option
                  key={index}
                  value={option.code}
                  disabled={option.disabled}
                  hidden={option.hidden}
                >
                  {option.name}
                </option>
              ))}
      </select>
      </Grid>
    </Grid>
    
      <CustomizedTimeline />
    </div>
    </ThemeProvider>
  );
}

export default App;
