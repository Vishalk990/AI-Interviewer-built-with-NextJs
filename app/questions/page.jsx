"use client"
import React from "react";
import Header from "../dashboard/_components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQPage() {
  const faqs = [
    {
      question: "What is AI Interview Mocker?",
      answer: "AI Interview Mocker is an innovative platform that uses artificial intelligence to simulate job interviews, helping users practice and improve their interviewing skills in a realistic, low-pressure environment."
    },
    {
      question: "How does the AI interviewer work?",
      answer: "Our AI interviewer uses advanced natural language processing to understand your responses and provide relevant follow-up questions. It adapts to your answers, creating a dynamic and realistic interview experience."
    },
    {
      question: "Can I practice for specific job roles or industries?",
      answer: "Yes! AI Interview Mocker offers customizable interview sessions tailored to various job roles and industries. You can select your desired position or sector to receive relevant questions and feedback."
    },
    {
      question: "How do I receive feedback on my performance?",
      answer: "After each interview session, you'll receive a comprehensive report analyzing your responses, language use, and overall performance. This includes suggestions for improvement and areas where you excelled."
    },
    {
      question: "Is my data kept confidential?",
      answer: "Absolutely. We take data privacy very seriously. All your interview responses and personal information are encrypted and stored securely. We never share your data with third parties without your explicit consent."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}

export default FAQPage;