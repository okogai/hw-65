import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axiosAPI from "../../axiosAPI.ts";
import { PagesFromDB } from "../../types";
import Loader from "../Loader/Loader.tsx";

const PageForm = () => {
  const [pages, setPages] = useState<PagesFromDB[]>([]);
  const [selectedPage, setSelectedPage] = useState<PagesFromDB | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getPageInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosAPI("pages.json");
      const loadedPages = Object.keys(response.data).map((pageKey) => {
        return {
          ...response.data[pageKey],
          id: pageKey,
        };
      });
      setPages(loadedPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (selectedPage) {
      setSelectedPage({ ...selectedPage, [e.target.name]: e.target.value });
    }
  };

  const getPageByName = (event: SelectChangeEvent<string>) => {
    const selectedTitle = event.target.value;
    const chosenPage = pages.find((page) => page.title === selectedTitle);

    if (chosenPage) {
      setSelectedPage(chosenPage);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedPage) {
      try {
        setLoading(true);
        await axiosAPI.put(`pages/${selectedPage.id}.json`, selectedPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    void getPageInfo();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2, maxWidth: 600, mx: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Edit Page
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                variant="outlined"
                labelId="select-label"
                displayEmpty
                onChange={getPageByName}
                value={selectedPage ? selectedPage.title : ""}
              >
                <MenuItem value="" disabled>
                  Choose a page
                </MenuItem>
                {pages.map((p) => (
                  <MenuItem key={p.id} value={p.title}>
                    {p.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedPage && (
              <>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={selectedPage.title}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="text"
                  value={selectedPage.text}
                  onChange={handleChange}
                  required
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default PageForm;
