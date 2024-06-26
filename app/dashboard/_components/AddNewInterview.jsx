"use client";
import { v4 as uuidv4 } from "uuid";
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
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");

  const [jsonResponse, setJsonResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (jobPosition && jobDesc && jobExperience) {
      setLoading(true);

      const InputPrompt =
        `Job Position : ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on this Job Position,Job Description & Years of Experience give us ` +
        process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
        ` interview question along with answer in JSON format, Give us Question and Answered field in JSON. Dont Give Explanation of Questions and Answers seperately. Just Give Questions and answers in JSON format`;

      try {
        const result = await chatSession.sendMessage(InputPrompt);
        console.log(result.response.text());
        const mockJsonResponse = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        console.log(JSON.parse(mockJsonResponse));
        setJsonResponse(mockJsonResponse);

        if (mockJsonResponse) {
          const resp = await db
            .insert(MockInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResponse: mockJsonResponse,
              jobPosition: jobPosition,
              jobDesc: jobDesc,
              jobExperience: jobExperience,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format("DD-MM-YYYY"),
            })
            .returning({ mockId: MockInterview.mockId });

          console.log("Inserted ID : ", resp);

          setJobPosition("");
          setJobDesc("");
          setJobExperience("");
          setOpenDialog(false);

          router.push(`dashboard/interview/${resp[0]?.mockId}`)
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      } finally {
        setLoading(false);
      }
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
                      className="my-2"
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack(In Short)</label>
                    <Textarea
                      className="my-2"
                      placeholder="Ex. React, Angular, NodeJs, NextJs"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      className="my-2"
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
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
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
