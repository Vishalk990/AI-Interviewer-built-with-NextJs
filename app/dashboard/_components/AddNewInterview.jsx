"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (jobPosition && jobDesc && jobExperience) {
      console.log(jobPosition, jobDesc, jobExperience);
      setOpenDialog(false);

      const InputPrompt =
        `Job Position : ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on this Job Position,Job Description & Years of Experience give us ` +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
        ` interview question along with answer in JSON format, Give us Question and Answered field in JSON`;

      const result = await chatSession.sendMessage(InputPrompt);
      const mockJsonResponse = await result.json();
      console.log(mockJsonResponse);

      setJobPosition("");
      setJobDesc("");
      setJobExperience("");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-lg cursor-pointer
      transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your Job position/role, Job Description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack(In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, NextJs"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      required
                      max="50"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Start Interview</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
