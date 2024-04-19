/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { JSTextArea } from "../../components/ui/JSTextArea";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSocket } from "../../hooks/useSocket";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { testSolution } from "../../utils/code.utils";
import { CustomModal } from "../../components/common/CustomModal";
import useModal from "../../hooks/useModal";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { CodeBlockType } from "../../types/blocks.types";
import useFetch from "../../hooks/useFetch";
import { appConfig } from "../../configs/appConfig";

const BlockPage: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.trim().split("/").pop() || "";
  const role = useSelector((state: RootState) => state.user.role);
  const [code, setCode] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [isSolved, setIsSolved] = useState<boolean>(false);

  //custom hook to handle modal
  const modal = useModal();

  //custom hook to fetch data onload
  const { data } = useFetch<{ block: CodeBlockType }>(
    `${appConfig.baseUrl}/api/block/get-block/${id}`
  );

  //set data to state
  useEffect(() => {
    if (data) {
      setCode(data.block.code || "");
      setSolution(data.block.solution || "");
    }
  }, [data, solution]);

  //custom hook for connection to the socket server
  const { emit, on } = useSocket(appConfig.baseUrl, {
    id,
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 500,
  });

  // Listen for code request
  useEffect(() => {
    const unsubscribe = on("requestCode", (data) => {
      console.log("Request for data received", data);
      setCode(data.newCode);
    });

    return () => {
      unsubscribe();
    };
  }, [on]);

  // debounce the code socket update for better optimization 0.5sec
  const debouncedSendCode = debounce((newCode: string) => {
    emit("updateCode", { newCode });
    setIsSolved(testSolution(newCode, solution));
  }, 500);

  // debounce the code db update for better optimization 5sec
  const debounceSaveCodeToDb = debounce((newCode: string) => {
    axios
      .post(`${appConfig.baseUrl}/api/block/update-block/${id}`, {
        code: `${newCode}`,
      })
      .then(() => {
        console.log("Data saved");
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
      });
  }, 5000);

  // Send code to the server
  const sendCode = (newCode: string) => {
    debouncedSendCode(newCode);
    debounceSaveCodeToDb(newCode);
  };

  //set modal to open when block is solved
  useEffect(() => {
    isSolved && modal.openModal();
  }, [isSolved]);

  return (
    <Box>
      <Box>
        <Typography variant="body1" gutterBottom>
          {data?.block.title} Block Page
        </Typography>
        <Typography variant="body2" gutterBottom>
          {data?.block.description}
        </Typography>
      </Box>

      <JSTextArea
        disabled={role !== "USER"}
        typeHandler={(code) => sendCode(code)}
        observerHandler={() => code}
      />
      <CustomModal
        open={modal.isOpen}
        title={"Congratulations!"}
        handleClose={modal.closeModal}
        children={
          <Box display={"flex"}>
            <Typography variant="body1">You have solved the block!</Typography>
            <InsertEmoticonIcon sx={{ height: 50, width: "auto", ml: 10 }} />
          </Box>
        }
      />
    </Box>
  );
};

export default BlockPage;
