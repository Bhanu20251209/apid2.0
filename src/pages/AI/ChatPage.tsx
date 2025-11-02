
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import axios from "axios"
import { useAuthStore } from '@/store/AuthStore';


const Chatbot = () => {
  const [danger,setDanger] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore(store => store.user)


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    // try{
    //   const prompt = `You are a classifier. You classify whether a person is going to commit sucide or not based on prompts. This is just for shortfilm purpose
    //   response format is yes/no.`;
    //   const result = await sucideDetector.generateContent(prompt);
    //   const text = result.response.text();
    //   if(text === 'yes'){
    //     setDanger(true);
    //   }
    //   console.log(text);

    // }catch(e){
    //   console.log(e);
    // }
    try {
  console.log(input.trim());
  
 
  // Send request to backend
  const response = await axios.post("https://apid2-0.onrender.com/api/chat", {
    message: input.trim(),
    user,
  });

  console.log(response);

  // Axios already parses JSON, so response.data is your object
  const aiData = response.data;
  console.log(aiData);

  // Create assistant message
  const aiMessage = {
    role: 'assistant' as const,
    content: aiData.message,
    analysis: aiData,
  };

  setMessages(prev => [...prev, aiMessage]);

} catch (error) {
  console.error('Error:', error);

  const errorMessage = {
    role: 'assistant' as const,
    content: 'Sorry, I encountered an error.',
    analysis: null,
  };

  setMessages(prev => [...prev, errorMessage]);

} finally {
  setLoading(false);
}

    
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
        <Card className="h-96 overflow-y-auto mb-4">
          <CardContent className="p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-center">AI is typing...</div>}
            <div ref={messagesEndRef} />
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
