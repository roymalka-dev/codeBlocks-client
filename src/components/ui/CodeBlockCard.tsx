import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { CodeBlockType } from "../../types/blocks.types";

interface CodeBlockCardProps {
  codeBlock: CodeBlockType;
  viewHandler: (_id: string) => void;
}

export const CodeBlockCard: React.FC<CodeBlockCardProps> = ({
  codeBlock,
  viewHandler,
}) => {
  return (
    <Card sx={{ maxWidth: 345, height: 150, m: 1 }}>
      <CardContent>
        <Typography variant="body1" component="div">
          {codeBlock.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => viewHandler(codeBlock._id)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};
