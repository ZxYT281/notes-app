import {
  Grid,
  TextField,
  Container,
  Box,
  Fab,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import React from "react";
import NoteCard from "./Card";
import NavBar from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import AddNote from "./AddNote";

export default function Home() {
  const [modalOpen, setmodalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [displayNotes, setDisplayNotes] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const get_notes = async () => {
    setLoading(true);
    try {
      let resp = await axios.get("/api/notes/notes/", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
      // console.log(resp.data);
      setNotes(resp.data);
    } catch (e) {}
    setLoading(false);
  };
  useEffect(() => {
    if (loading) {
      get_notes();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!notes) return;
    if (!(search && search.replace(" ", ""))) {
      setDisplayNotes([]);
      return;
    }
    let disp = [];
    for (let i = 0; i < notes.length; i++) {
      const value = notes[i];

      if (
        value?.title.toLowerCase().includes(search.toLowerCase()) ||
        value?.content.toLowerCase().includes(search.toLowerCase())
      )
        disp.push(value);
    }
    setDisplayNotes(disp);
    console.log(displayNotes);
    // eslint-disable-next-line
  }, [search]);
  return (
    <>
      <NavBar />
      <Container>
        <Box paddingTop={2} paddingBottom={2}>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            label="Search Notes"
            fullWidth
          />
          {
            // TODO: Make the filter button
          }
          {/* <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                onChange={(e) => setSearch(e.target.value)}
                label="Search Notes"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button>Hello</Button>
            </Grid>
          </Grid> */}
        </Box>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
        <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
          {displayNotes.length >= 1 ? (
            displayNotes.map((value, index) => (
              <Grid item xs={1} sm={4} md={4} key={index}>
                <NoteCard get_notes={get_notes} note={value}></NoteCard>
              </Grid>
            ))
          ) : notes.length >= 1 ? (
            notes.map((value, index) => (
              <Grid item xs={1} sm={4} md={4} key={index}>
                <NoteCard get_notes={get_notes} note={value}></NoteCard>
              </Grid>
            ))
          ) : !loading ? (
            <Grid item>
              <Typography>No notes present</Typography>
            </Grid>
          ) : null}
        </Grid>
        <Fab
          sx={{
            margin: 0,
            top: "auto",
            right: "2rem",
            bottom: "2rem",
            left: "auto",
            position: "fixed",
          }}
          variant="extended"
          onClick={(e) => setmodalOpen(true)}
        >
          <NoteAltIcon sx={{ mr: 1 }} />
          Note
        </Fab>
      </Container>
      <AddNote
        setmodalOpen={setmodalOpen}
        modalOpen={modalOpen}
        get_notes={get_notes}
      />
    </>
  );
}
