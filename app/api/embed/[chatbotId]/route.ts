import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { chatbotId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")

    // Generate embed script
    const embedScript = `
(function() {
  // SmartBotly Embed Script
  const chatbotId = '${params.chatbotId}';
  const apiUrl = '${process.env.NEXT_PUBLIC_API_URL || "https://api.smartbotly.com"}';
  
  // Create chatbot container
  const container = document.createElement('div');
  container.id = 'smartbotly-widget';
  container.style.cssText = \`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #8B5CF6, #3B82F6);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  \`;
  
  // Add bot icon
  container.innerHTML = \`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H1V9H3V15C3 16.1 3.9 17 5 17H8.5C8.5 18.4 9.6 19.5 11 19.5S13.5 18.4 13.5 17H19C20.1 17 21 16.1 21 15V9H21ZM5 15V9H19V15H5Z" fill="white"/>
    </svg>
  \`;
  
  // Create chat window
  const chatWindow = document.createElement('div');
  chatWindow.id = 'smartbotly-chat';
  chatWindow.style.cssText = \`
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    z-index: 10001;
    display: none;
    flex-direction: column;
    overflow: hidden;
  \`;
  
  chatWindow.innerHTML = \`
    <div style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h3 style="margin: 0; font-size: 16px;">SmartBot</h3>
        <p style="margin: 0; font-size: 12px; opacity: 0.8;">Online</p>
      </div>
      <button id="close-chat" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">&times;</button>
    </div>
    <div id="chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; background: #f9fafb;">
      <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        Hi! I'm your AI assistant. How can I help you today?
      </div>
    </div>
    <div style="padding: 16px; border-top: 1px solid #e5e7eb;">
      <div style="display: flex; gap: 8px;">
        <input id="chat-input" type="text" placeholder="Type your message..." style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; outline: none;">
        <button id="send-message" style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Send</button>
      </div>
    </div>
  \`;
  
  // Add to page
  document.body.appendChild(container);
  document.body.appendChild(chatWindow);
  
  // Toggle chat
  let isOpen = false;
  container.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWindow.style.display = isOpen ? 'flex' : 'none';
  });
  
  // Close chat
  document.getElementById('close-chat').addEventListener('click', () => {
    isOpen = false;
    chatWindow.style.display = 'none';
  });
  
  // Send message functionality
  const sendMessage = async (message) => {
    if (!message.trim()) return;
    
    const messagesContainer = document.getElementById('chat-messages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'background: #8B5CF6; color: white; padding: 12px; border-radius: 8px; margin-bottom: 12px; margin-left: 40px; text-align: right;';
    userMsg.textContent = message;
    messagesContainer.appendChild(userMsg);
    
    // Add loading indicator
    const loadingMsg = document.createElement('div');
    loadingMsg.style.cssText = 'background: white; padding: 12px; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);';
    loadingMsg.innerHTML = 'Typing...';
    messagesContainer.appendChild(loadingMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
      // Simulate API call
      setTimeout(() => {
        loadingMsg.innerHTML = "Thanks for your message! I'm here to help with any questions about our services, business hours, or to help you schedule an appointment.";
      }, 1000);
    } catch (error) {
      loadingMsg.innerHTML = 'Sorry, I encountered an error. Please try again.';
    }
  };
  
  // Send button click
  document.getElementById('send-message').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    sendMessage(input.value);
    input.value = '';
  });
  
  // Enter key
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(e.target.value);
      e.target.value = '';
    }
  });
})();
`

    return new NextResponse(embedScript, {
      headers: {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": domain || "*",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Embed script error:", error)
    return new NextResponse("Error generating embed script", { status: 500 })
  }
}
