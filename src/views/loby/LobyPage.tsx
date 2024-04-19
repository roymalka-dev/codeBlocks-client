import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { CodeBlockCard } from "../../components/ui/CodeBlockCard";
import { CodeBlockType } from "../../types/blocks.types";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../../configs/appConfig";
import useFetch from "../../hooks/useFetch";

const LobyPage = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<CodeBlockType[]>([]);

  // custom hook to fetch data onload
  const { data, loading, error } = useFetch<{ blocks: CodeBlockType[] }>(
    `${appConfig.baseUrl}/api/block/get-all-blocks`
  );

  //set loaded data to state
  useEffect(() => {
    if (data) {
      setBlocks(data.blocks);
    }
  }, [data]);

  // view button handler
  const viewHandler = (_id: string) => {
    navigate(`/block/${_id}`);
  };

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6">{error.message}</Typography>
      ) : (
        <Grid container spacing={2} sx={{ p: 2 }}>
          {blocks?.map((codeBlock, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CodeBlockCard codeBlock={codeBlock} viewHandler={viewHandler} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LobyPage;
