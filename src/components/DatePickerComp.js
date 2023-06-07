import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DatePickerComp = ({ task, setTask }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    date: "",
    activity: "",
    status: "",
    error: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDate = moment(formData.date);
    const { date, activity } = formData;

    if (!date || !activity) {
      setFormData({
        ...formData,
        error: "Add the activity",
      });
      return;
    }

    if (task.some((value) => moment(value.date).isSame(newDate))) {
      setFormData({
        ...formData,
        error: "Date is already exists",
      });
    } else {
      const newItem = {
        date,
        activity,
        status: "",
      };
      setTask((prevData) => {
        const newData = [...prevData, newItem];
        newData.sort((a, b) => moment(a.date) - moment(b.date));
        return newData;
      });
      setFormData({
        date: "",
        activity: "",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          p: 2,
          border: "1px solid black",
          borderRadius: "0.5rem",
          height: "50vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="DateTime picker"
                value={formData.date ? formData.date : null}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    date: moment(e).utc().format(),
                  });
                }}
                error={formData.error}
                format="DD-MM-YYYY hh:mm A"
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="Activity"
            name="activity"
            // error={formData.error}
            value={formData.activity}
            onChange={(e) =>
              setFormData({ ...formData, activity: e.target.value })
            }
            fullWidth
            sx={{ marginTop: 5 }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 5 }}
            fullWidth
          >
            {t("Add Button")}
          </Button>
          <Typography variant="h6" component="h2" sx={{ mt: 2, color: "red" }}>
            {formData.error}
          </Typography>
        </form>
      </Box>
    </>
  );
};

export default DatePickerComp;
