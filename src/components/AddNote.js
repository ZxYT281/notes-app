import React from "react";
import Modal from "@mui/material/Modal";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function AddNote(props) {
  const { setmodalOpen, modalOpen, get_notes } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("todos");
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/notes/note/",
        {
          title,
          content,
          category,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      await setmodalOpen(false);
      get_notes();
    } catch (e) {}
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setmodalOpen(false)}
      aria-labelledby="Add Note Modal"
      aria-describedby="ADD notes"
    >
      <Paper>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Container>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h2"
              gutterBottom
            >
              Create a new note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                label="Note Title"
                variant="outlined"
                fullWidth
                required
              />

              <TextField
                onChange={(e) => setContent(e.target.value)}
                label="Details"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                required
              />

              <FormControl>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="money"
                    control={<Radio />}
                    label="Money"
                  />
                  <FormControlLabel
                    value="todos"
                    control={<Radio />}
                    label="Todos"
                  />
                  <FormControlLabel
                    value="reminders"
                    control={<Radio />}
                    label="Reminders"
                  />
                  <FormControlLabel
                    value="work"
                    control={<Radio />}
                    label="Work"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
              >
                Submit
              </Button>
            </form>
          </Container>
        </Box>
      </Paper>
    </Modal>
  );
}
