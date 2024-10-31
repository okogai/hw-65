import { useParams } from "react-router-dom";
import axiosAPI from "../../axiosAPI.ts";
import React, { useEffect, useState } from "react";
import { IPage } from "../../types";
import Loader from "../../components/Loader/Loader.tsx";
import { Container, Typography } from "@mui/material";

interface ShowPageProps {
  pageNameByDefault?: string;
}

const ShowPage: React.FC<ShowPageProps> = ({ pageNameByDefault }) => {
  const { pageName } = useParams();
  const [page, setPage] = useState<IPage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPageInfo = async (name: string) => {
    setLoading(true);
    try {
      const response = await axiosAPI(`pages/${name}.json`);
      if (response.data) {
        setPage({ ...response.data });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageName) {
      void fetchPageInfo(pageName);
    } else if (pageNameByDefault) {
      void fetchPageInfo(pageNameByDefault);
    }
  }, [pageName, pageNameByDefault]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Loader />
      ) : page ? (
        <>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "600" }}
          >
            {page.title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{ textIndent: "2em", fontSize: "1.25em", fontWeight: "400" }}
          >
            {page.text}
          </Typography>
        </>
      ) : (
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "600" }}
        >
          Page Not Found
        </Typography>
      )}
    </Container>
  );
};

export default ShowPage;
