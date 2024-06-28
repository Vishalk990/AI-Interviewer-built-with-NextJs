"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Mic, Video, FileText, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentYear = new Date().getFullYear();


  const handleStartClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-grow">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Interview Mocker</h1>
          <p className="text-xl text-gray-600 mb-8">Practice interviews with AI and boost your confidence</p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading}
            onClick={handleStartClick}>
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Start Practicing Now"
            )}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={<Mic className="h-8 w-8 text-blue-500" />}
            title="Voice Interaction"
            description="Practice speaking with our AI interviewer using advanced speech recognition."
          />
          {/* <FeatureCard
            icon={<Video className="h-8 w-8 text-blue-500" />}
            title="Video Analysis"
            description="Get feedback on your body language and facial expressions during the interview."
          /> */}
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-blue-500" />}
            title="Personalized Feedback"
            description="Receive detailed analysis and tips to improve your interview performance."
          />
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Ready to ace your next interview?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of job seekers who have improved their interview skills with our AI-powered platform.</p>
          <Button size="lg" variant="outline" className="mr-4">
            Learn More
          </Button>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Sign Up Free
          </Button>
        </section>
      </div>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {currentYear} Made by Vishal Kalita. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}