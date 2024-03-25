import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import "./Text-To-Speach.css";
import { GoCopy } from "react-icons/go";

const TextToSpeach = () => {
  const [textToCopy, setTextToCopy] = useState("");

  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopyPaste = () => {
    setTextToCopy(transcript);
    setCopied(setCopied);
  };

  return (
    <div>
      <>
        <Stack sx={{}} className="container">
          <Stack>
            <Stack
              sx={{
                fontSize: "2rem",
                fontFamily: "sans-serif",
                textAlign: "center",
              }}
            >
              Speech to Text Converter
            </Stack>
          </Stack>

          <Stack
            sx={{
              width: { xs: "90%", lg: "50%" },
              margin: "auto",
              height: "20rem",
              boxShadow:
                "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
            }}
            className="text-content"
            onChange={handleCopyPaste}
          >
            {transcript}
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2rem",
            }}
            className="btn-style"
          >
            <Stack>
              <Tooltip
                title={isCopied ? "Copied!" : "Copy to clipboard"}
                placement="top"
              >
                <Button
                  class="button"
                  type="button"
                  sx={{ textAlign: "center" }}
                  onClick={handleCopyPaste}
                >
                  <span class="button__text">
                    {isCopied ? "Copied!" : "Copy to clipboard"}
                  </span>
                  <span class="button__icon">
                    <GoCopy />
                  </span>
                </Button>
              </Tooltip>
            </Stack>
            <Stack>
              <Button sx={{ textAlign: "center" }} onClick={startListening}>
                Start Listening
              </Button>
            </Stack>
            <Stack>
              <Button
                sx={{ textAlign: "center" }}
                onClick={SpeechRecognition.stopListening}
              >
                Stop Listening
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </>
    </div>
  );
};

export default TextToSpeach;
